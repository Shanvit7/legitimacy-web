import { Link } from '@tanstack/react-router';

const NotFoundPage = () => (
  <main className="relative min-h-screen min-w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
    {/* Background orbs */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl"></div>
    </div>

    {/* Foreground content */}
    <div className="relative z-10 flex min-h-screen items-center justify-center text-white">
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-semibold text-yellow-500">404</h1>
        <p className="text-xl italic animate-in fade-in duration-1000">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 animate-in fade-in rounded-md border border-white px-4 py-2 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-transform duration-100"
        >
          ET phone Home
        </Link>
      </div>
    </div>
  </main>
);

export default NotFoundPage;
