// ICONS
import {  MapPin } from 'lucide-react';

const LocationNotGot = () => (
  <div className="flex flex-col items-center justify-center text-center px-6 py-20">
    {/* Background gradients */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>
    </div>

    <div className="flex flex-col items-center gap-4">
      <div className="rounded-full bg-slate-500/10 p-4">
        <MapPin className="h-10 w-10 text-slate-400" />
      </div>
      <h2 className="text-2xl font-semibold text-slate-200">
        We are having trouble getting your location.
      </h2>
      <p className="max-w-md text-slate-400">
        Please ensure you have allowed location access and have stable internet connection.
      </p>
    </div>
  </div>
);

export default LocationNotGot;