# Startup Like Functionality Implementation Guide

## Overview
This document explains the like functionality implemented for individual startup product pages in the Jazbaa platform.

## Features Implemented

### ✅ Like Button with Heart Icon
- **Empty heart** 🤍 when not liked
- **Filled heart** ❤️ when liked
- Located in the Hero section of each startup product page

### ✅ One Like Per Device/Browser
- Uses **localStorage** to track liked startup IDs
- Prevents multiple likes from the same device
- Key: `likedStartups` (array of startup slugs)

### ✅ Firebase Firestore Integration
- **Collection**: `startupLikes`
- **Document ID**: `{startupSlug}` (e.g., "my-startup-name")
- **Fields**:
  - `likes`: number (like count)
  - `lastUpdated`: timestamp

### ✅ Real-time Updates
- Like count updates in real-time across all devices
- Uses Firebase Firestore `onSnapshot` listener
- No page refresh required

### ✅ Like/Unlike Functionality
- Click to like (increases count)
- Click again to unlike (decreases count)
- Visual feedback with heart icon state

## File Structure

```
src/
├── components/
│   ├── StartupLikeButton.tsx           # Like button component
│   ├── startup/
│   │   ├── StartupProfile.tsx          # Updated with like button
│   │   └── StartupProfileTemplate.tsx  # Updated with like button
├── services/
│   └── startupLikeService.ts           # Firebase like operations
└── config/
    └── firebase.ts                     # Firebase configuration
```

## Firebase Firestore Structure

```
startupLikes/
├── startup-slug-1/
│   ├── likes: 15
│   └── lastUpdated: timestamp
├── startup-slug-2/
│   ├── likes: 8
│   └── lastUpdated: timestamp
└── startup-slug-3/
    ├── likes: 23
    └── lastUpdated: timestamp
```

## localStorage Structure

```javascript
// Key: "likedStartups"
// Value: ["startup-slug-1", "startup-slug-2", "another-startup"]
```

## Usage

The like button is automatically included in the Hero section of each startup product page and provides:

1. **Visual State**: Heart icon changes from empty to filled
2. **Count Display**: Shows current like count next to heart
3. **Real-time Updates**: Count updates automatically across devices
4. **Device Restriction**: One like per device/browser per startup
5. **Error Handling**: User-friendly error messages

## Technical Implementation

### StartupLikeService Class
- `isStartupLiked(startupSlug)`: Check if current device has liked this startup
- `getLikeCount(startupSlug)`: Get current like count from Firestore
- `likeStartup(startupSlug)`: Add like and update localStorage
- `unlikeStartup(startupSlug)`: Remove like and update localStorage
- `toggleLike(startupSlug)`: Toggle like state
- `subscribeToLikeCount(startupSlug, callback)`: Real-time listener

### StartupLikeButton Component
- Manages local state (isLiked, likeCount, isLoading)
- Handles user interactions
- Provides visual feedback
- Integrates with StartupLikeService
- Takes `startupSlug` as prop

## Components Updated

### StartupProfile.tsx
- Added import for `StartupLikeButton`
- Added like button to Hero section Call-to-Actions
- Passes `startup.slug` to the like button

### StartupProfileTemplate.tsx
- Added import for `StartupLikeButton`
- Added like button to Hero section Call-to-Actions
- Passes `startup.slug` to the like button

## Security & Performance

- **Firebase Security Rules**: Ensure proper access control
- **Error Handling**: Graceful fallbacks for network issues
- **Loading States**: Prevents double-clicks during operations
- **Cleanup**: Properly unsubscribes from real-time listeners
- **Device Isolation**: Each device can only like once per startup

## Testing

To test the functionality:

1. **Navigate** to any startup product page
2. **Scroll** to the Hero section
3. **Click** the heart icon to like
4. **Watch** the count update in real-time
5. **Try** to like again (should be prevented)
6. **Click** again to unlike
7. **Open** another browser/device to see real-time sync
8. **Check** localStorage for `likedStartups` array

## Example URLs

- `/startup/my-startup-name` - Individual startup page
- `/startup/another-startup` - Another startup page

Each page will have its own like button with independent like counts.

## Future Enhancements

- User authentication integration
- Like analytics and insights
- Social sharing features
- Like notifications
- Advanced like categories
- Like history tracking 