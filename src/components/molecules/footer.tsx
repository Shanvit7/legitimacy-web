// COMPONENTS
import { Button } from '@/components/atoms/button';
import { Link } from '@tanstack/react-router';
// ICONS
import { FileCheck, Lock, Shield } from 'lucide-react';


const Footer = () => (
  <footer className="relative z-10 mt-20 border-t border-slate-800/50 py-12">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between space-y-6 px-6 md:flex-row md:space-y-0">
      <div className="flex items-center space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
          <FileCheck className="h-5 w-5 text-white" />
        </div>
        <div>
          <span className="font-medium text-slate-300">Legitimacy</span>
          <div className="text-xs text-slate-500">Secure PDF sharing for everyone</div>
        </div>
      </div>
      <div className="flex items-center space-x-8 text-sm text-slate-500">
        <Button className="flex items-center space-x-1 transition-colors duration-300 hover:text-slate-300" asChild>
          <Link to="/404">
            <Shield className="size-4" />
            <span>Security</span>
          </Link>
        </Button>
          <Button className="flex items-center space-x-1 transition-colors duration-300 hover:text-slate-300" asChild>
            <Link to="/404">
              <Lock className="size-4" />
              <span>Privacy</span>
            </Link>
          </Button>
      </div>
    </div>
  </footer>
);

export default Footer;