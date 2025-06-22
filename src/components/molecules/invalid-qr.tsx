// ICONS
import { AlertTriangle } from 'lucide-react';

const InvalidQR = () => (
  <div className="flex flex-col items-center justify-center text-center px-6 py-20">
    {/* Background gradients */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>
    </div>

    <div className="flex flex-col items-center gap-4">
      <div className="rounded-full bg-red-500/10 p-4">
        <AlertTriangle className="h-10 w-10 text-red-400" />
      </div>
      <h2 className="text-2xl font-semibold text-slate-200">
        Invalid QR Code
      </h2>
      <p className="max-w-md text-slate-400">
        This QR code is either expired, tampered with, or not recognized by our system.
        Please double-check the link or ask the sender to re-share it.
      </p>
    </div>
  </div>
);

export default InvalidQR;
