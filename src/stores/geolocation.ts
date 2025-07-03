import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// TYPES
import type { GeolocationState } from '@/types/location';

const useGeolocationStore = create(
  subscribeWithSelector<GeolocationState & { fetchGeolocation: () => void; _retried?: boolean }>((set, get) => {
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
        if (get().isSuccess) return; // avoid overwriting if already successful
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
        if (err.code === err.POSITION_UNAVAILABLE && !get()._retried) {
          set({ _retried: true });
          setTimeout(fetchGeolocation, 2000); // retry once after short delay
          return;
        }

        set({
          isLoading: false,
          error: err,
        });
      };

      set({ isLoading: true });
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });
    };

    // Call immediately
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
      _retried: false,
      fetchGeolocation,
    };
  })
);

export default useGeolocationStore;
