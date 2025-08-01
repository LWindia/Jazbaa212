import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { StartupLikeService } from '../services/startupLikeService';

// Heart firework component
const HeartFirework: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Multiple hearts flying out */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute text-pink-500 animate-heart-firework-${i + 1}`}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s',
            animationFillMode: 'forwards'
          }}
        >
          <Heart className="w-3 h-3 fill-current" />
        </div>
      ))}
    </div>
  );
};

interface StartupLikeButtonProps {
  startupSlug: string;
  className?: string;
}

const StartupLikeButton: React.FC<StartupLikeButtonProps> = ({ startupSlug, className = '' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFirework, setShowFirework] = useState(false);
  const [isBeating, setIsBeating] = useState(false);

  // Initialize like state on component mount
  useEffect(() => {
    const initializeLikeState = async () => {
      try {
        // Check if startup is liked by this device
        const deviceLiked = StartupLikeService.isStartupLiked(startupSlug);
        setIsLiked(deviceLiked);
        
        // Get current like count from Firestore
        const count = await StartupLikeService.getLikeCount(startupSlug);
        setLikeCount(count);
      } catch (error) {
        console.error('Error initializing like state:', error);
      }
    };

    initializeLikeState();

    // Subscribe to real-time like count updates
    const unsubscribe = StartupLikeService.subscribeToLikeCount(startupSlug, (count) => {
      setLikeCount(count);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [startupSlug]);

  const handleLikeClick = async () => {
    if (isLoading || isLiked) return; // Disable if already liked

    setIsLoading(true);
    try {
      const result = await StartupLikeService.likeStartupOnly(startupSlug);
      setIsLiked(result.isLiked);
      setLikeCount(result.count);
      
      // Trigger animations
      setShowFirework(true);
      setIsBeating(true);
      
      // Hide firework after animation
      setTimeout(() => setShowFirework(false), 1000);
      
      // Stop heartbeat after a few beats
      setTimeout(() => setIsBeating(false), 2000);
    } catch (error) {
      console.error('Error liking startup:', error);
      // Show user-friendly error message
      alert('Unable to like. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleLikeClick}
        disabled={isLoading || isLiked}
        className={`
          flex flex-col items-center justify-center w-16 h-16 rounded-full
          transition-all duration-300 ease-in-out relative
          ${isLiked 
            ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg animate-glow' 
            : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${isBeating ? 'animate-heartbeat' : ''}
          ${className}
        `}
        aria-label={isLiked ? 'Liked!' : 'Like this startup'}
      >
        {isLiked ? (
          <Heart className="w-5 h-5 fill-current mb-1" />
        ) : (
          <Heart className="w-5 h-5 mb-1" />
        )}
        <span className="font-semibold text-xs">
          {likeCount.toLocaleString()}
        </span>
      </button>
      
      {/* Heart Firework Animation */}
      <HeartFirework show={showFirework} />
    </div>
  );
};

export default StartupLikeButton; 