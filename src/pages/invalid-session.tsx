// ICONS
import { ShieldOff } from "lucide-react";

const InvalidSessionPage = () => (
        <main className="relative min-h-screen min-w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>

      <div className="flex min-h-screen items-center justify-center text-white">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <ShieldOff size={64} className="text-pink-500" />
          </div>
          <h2 className="text-4xl font-bold text-pink-400">Invalid Session</h2>
          <p className="text-base text-slate-300">
            Your session is no longer valid. Please ensure your are scanning the correct QR code.
          </p>
        </div>
      </div>
    </main>
);

export default InvalidSessionPage;
