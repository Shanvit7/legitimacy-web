import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// TYPES
import type { GeolocationState } from '@/types/location';

const useGeolocationStore = create(
  subscribeWithSelector<GeolocationState & { fetchGeolocation: () => void }>((set) => {
    const fetchGeolocation = () => {
      if (!navigator.geolocation) {
        set({
          isLoading: false,
          error: {
            code: 0,
            message: "Geolocation not supported",
            PERMISSION_DENIED: 1,
            POSITION_UNAVAILABLE: 2,
            TIMEOUT: 3,
          },
        });
        return;
      }

      const onSuccess = (pos: GeolocationPosition) => {
        const { coords, timestamp } = pos;
        set({
          isLoading: false,
          isSuccess: true,
          accuracy: coords.accuracy,
          altitude: coords.altitude,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          latitude: coords.latitude,
          longitude: coords.longitude,
          speed: coords.speed,
          timestamp,
          error: undefined,
        });
      };

      const onError = (err: GeolocationPositionError) => {
        set({
          isLoading: false,
          error: err,
        });
      };

      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    };

    // Initialize geolocation data when the store is accessed
    fetchGeolocation();

    return {
      isLoading: true,
      isSuccess: false,
      error: undefined,
      accuracy: undefined,
      altitude: undefined,
      altitudeAccuracy: undefined,
      heading: undefined,
      latitude: undefined,
      longitude: undefined,
      speed: undefined,
      timestamp: undefined,
      fetchGeolocation,
    };
  })
);

export default useGeolocationStore; 