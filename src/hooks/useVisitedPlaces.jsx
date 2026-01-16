// Custom hook for managing visited places log

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export function useVisitedPlaces() {
  const { user } = useAuth();
  const [visitedPlaces, setVisitedPlaces] = useState([]);

  const getStorageKey = () => {
    return user ? `visited_${user.id}` : 'visited_guest';
  };

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey());
    if (stored) {
      setVisitedPlaces(JSON.parse(stored));
    } else {
      setVisitedPlaces([]);
    }
  }, [user]);

  const markAsVisited = (place) => {
    if (!isVisited(place.id)) {
      const newVisited = [...visitedPlaces, { 
        ...place, 
        visitedAt: new Date().toISOString() 
      }];
      setVisitedPlaces(newVisited);
      localStorage.setItem(getStorageKey(), JSON.stringify(newVisited));
    }
  };

  const removeFromVisited = (placeId) => {
    const newVisited = visitedPlaces.filter(item => item.id !== placeId);
    setVisitedPlaces(newVisited);
    localStorage.setItem(getStorageKey(), JSON.stringify(newVisited));
  };

  const isVisited = (placeId) => {
    return visitedPlaces.some(item => item.id === placeId);
  };

  const getVisitedCount = () => {
    return visitedPlaces.length;
  };

  const getVisitedByCity = (cityId) => {
    return visitedPlaces.filter(place => place.cityId === cityId);
  };

  return {
    visitedPlaces,
    markAsVisited,
    removeFromVisited,
    isVisited,
    getVisitedCount,
    getVisitedByCity,
  };
}
