import { db } from '../config/firebase';
import { doc, getDoc, updateDoc, increment, setDoc, onSnapshot } from 'firebase/firestore';

export interface StartupLikeData {
  likes: number;
  lastUpdated: Date;
}

export class StartupLikeService {
  private static LIKED_STARTUPS_KEY = 'likedStartups';

  // Get liked startups from localStorage
  private static getLikedStartups(): string[] {
    const liked = localStorage.getItem(this.LIKED_STARTUPS_KEY);
    return liked ? JSON.parse(liked) : [];
  }

  // Save liked startups to localStorage
  private static saveLikedStartups(likedStartups: string[]): void {
    localStorage.setItem(this.LIKED_STARTUPS_KEY, JSON.stringify(likedStartups));
  }

  // Check if current startup is liked by this device
  static isStartupLiked(startupSlug: string): boolean {
    const likedStartups = this.getLikedStartups();
    return likedStartups.includes(startupSlug);
  }

  // Get current like count from Firestore
  static async getLikeCount(startupSlug: string): Promise<number> {
    try {
      const startupRef = doc(db, 'startupLikes', startupSlug);
      const startupDoc = await getDoc(startupRef);
      
      if (startupDoc.exists()) {
        return startupDoc.data().likes || 0;
      } else {
        // Initialize startup document if it doesn't exist
        await setDoc(startupRef, { likes: 0, lastUpdated: new Date() });
        return 0;
      }
    } catch (error) {
      console.error('Error getting like count:', error);
      return 0;
    }
  }

  // Like the startup
  static async likeStartup(startupSlug: string): Promise<number> {
    try {
      const startupRef = doc(db, 'startupLikes', startupSlug);
      const likedStartups = this.getLikedStartups();
      
      // Check if already liked
      if (likedStartups.includes(startupSlug)) {
        throw new Error('Startup already liked by this device');
      }

      // Update Firestore
      await updateDoc(startupRef, {
        likes: increment(1),
        lastUpdated: new Date()
      });

      // Update localStorage
      likedStartups.push(startupSlug);
      this.saveLikedStartups(likedStartups);

      // Get updated count
      const updatedDoc = await getDoc(startupRef);
      return updatedDoc.data()?.likes || 0;
    } catch (error) {
      console.error('Error liking startup:', error);
      throw error;
    }
  }

  // Unlike the startup
  static async unlikeStartup(startupSlug: string): Promise<number> {
    try {
      const startupRef = doc(db, 'startupLikes', startupSlug);
      const likedStartups = this.getLikedStartups();
      
      // Check if not liked
      if (!likedStartups.includes(startupSlug)) {
        throw new Error('Startup not liked by this device');
      }

      // Update Firestore
      await updateDoc(startupRef, {
        likes: increment(-1),
        lastUpdated: new Date()
      });

      // Update localStorage
      const updatedLikedStartups = likedStartups.filter(slug => slug !== startupSlug);
      this.saveLikedStartups(updatedLikedStartups);

      // Get updated count
      const updatedDoc = await getDoc(startupRef);
      return updatedDoc.data()?.likes || 0;
    } catch (error) {
      console.error('Error unliking startup:', error);
      throw error;
    }
  }

  // Like the startup (no unlike functionality)
  static async likeStartupOnly(startupSlug: string): Promise<{ count: number; isLiked: boolean }> {
    const isCurrentlyLiked = this.isStartupLiked(startupSlug);
    
    if (isCurrentlyLiked) {
      // If already liked, just return current state without changing anything
      const count = await this.getLikeCount(startupSlug);
      return { count, isLiked: true };
    } else {
      // If not liked, like it
      const count = await this.likeStartup(startupSlug);
      return { count, isLiked: true };
    }
  }

  // Subscribe to real-time like count updates
  static subscribeToLikeCount(startupSlug: string, callback: (count: number) => void): () => void {
    const startupRef = doc(db, 'startupLikes', startupSlug);
    
    return onSnapshot(startupRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        callback(data.likes || 0);
      } else {
        callback(0);
      }
    }, (error) => {
      console.error('Error listening to like count:', error);
      callback(0);
    });
  }
} 