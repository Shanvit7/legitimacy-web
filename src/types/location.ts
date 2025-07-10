export interface GeolocationState {
    isLoading: boolean;
    isSuccess: boolean;
    accuracy?: number;
    altitude?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    latitude?: number | null;
    longitude?: number | null;
    speed?: number | null;
    timestamp?: number;
    error?: GeolocationPositionError;
    fetchGeolocation: () => void;
};

export interface Coords {
    latitude: number;
    longitude: number;
    altitude: number;
};