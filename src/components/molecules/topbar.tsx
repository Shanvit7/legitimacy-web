// COMPONENTS
import { Button } from '@/components/atoms/button';
import { Link } from '@tanstack/react-router';
// ICONS
import { ArrowRight, FileCheck, Sparkles } from 'lucide-react';

const Topbar = () => (
  <header className="relative z-10 mx-auto flex flex-col gap-8 lg:flex-row max-w-6xl items-center justify-between p-6">
    <div className="group flex cursor-pointer items-center space-x-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg shadow-blue-500/25">
        <FileCheck className="size-6 text-white" />
      </div>
      <div>
        <Link to="/" className="py-4">
        <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-2xl font-bold text-transparent">
          Lyk <span className="text-xs text-slate-200">(beta)</span>
        </span>
        </Link>
        <div className="flex items-center space-x-1 text-xs text-slate-500">
          <Sparkles className="size-3" />
          <span>Secure • Fast • Simple</span>
        </div>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <Button
        size="sm"
        className="p-5 text-slate-400 transition-all duration-300 hover:bg-slate-800/50 hover:text-white"
        asChild
      >
        <Link to="/404">
          How it works
        </Link>
      </Button>
      <Button
        size="sm"
        className="bg-gradient-to-r text-white from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-400 hover:to-purple-500"
        asChild
      >
        <Link to="/share" className="flex items-center text-white">
          Start sharing <ArrowRight className="ml-1 size-4" />
        </Link>
      </Button>
    </div>
  </header>
);

export default Topbar;
