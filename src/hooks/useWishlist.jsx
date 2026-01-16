// Custom hook for managing wishlist using localStorage

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export function useWishlist() {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const getStorageKey = () => {
    return user ? `wishlist_${user.id}` : 'wishlist_guest';
  };

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      setWishlist(JSON.parse(stored));
    } else {
      setWishlist([]);
    }
  }, [user]);

  const addToWishlist = (place) => {
    const newWishlist = [...wishlist, { ...place, addedAt: new Date().toISOString() }];
    setWishlist(newWishlist);
    localStorage.setItem(getStorageKey(), JSON.stringify(newWishlist));
  };

  const removeFromWishlist = (placeId) => {
    const newWishlist = wishlist.filter(item => item.id !== placeId);
    setWishlist(newWishlist);
    localStorage.setItem(getStorageKey(), JSON.stringify(newWishlist));
  };

  const isInWishlist = (placeId) => {
    return wishlist.some(item => item.id === placeId);
  };

  const toggleWishlist = (place) => {
    if (isInWishlist(place.id)) {
      removeFromWishlist(place.id);
    } else {
      addToWishlist(place);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(getStorageKey());
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  };
}
