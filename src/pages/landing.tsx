// COMPONENTS
import { Button } from '@/components/atoms/button';
import FeatureCard from '@/components/molecules/feature-card';
import Footer from '@/components/molecules/footer';
import Topbar from '@/components/molecules/topbar';
import { Link } from '@tanstack/react-router';
// ICONS
import { ArrowRight, Shield, Zap, SmilePlus } from 'lucide-react';

const LandingPage = () => (
  <main className="relative min-h-screen min-w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-indigo-500/5 blur-3xl"></div>
    </div>

    <Topbar />

    <section className="relative z-10 mx-auto max-w-5xl px-6 py-12 text-center">
      <div>
        <h1 className="pb-6 text-6xl leading-tight font-bold md:text-8xl inline-flex gap-2 items-center">
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Drop.
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Share.
          </span>
          <br />
          <span className="bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">
            Relax
          </span>
        </h1>
      </div>
      <div>
        <p className="mx-auto py-6 max-w-3xl text-xl leading-relaxed text-slate-400">
          <span className="text-slate-300">Sharing PDF securely has never been easier.</span>
        </p>
      </div>
      <div></div>
    </section>

    <section className="relative z-10 mx-auto max-w-6xl px-6 py-12">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Why choose Lyk?</h2>
        <p className="text-lg text-slate-400">Features that just work</p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <FeatureCard icon={<Zap />} title="Instant Upload" description="Drag, drop, done. Your PDF is secure and ready to share" />
        <FeatureCard icon={<Shield />} title="Secure Share" description="You set the rules, we handle the rest" />
        <FeatureCard icon={<SmilePlus />} title="Easy to use" description="Leave the heavy lifting to us" />
      </div>
    </section>


    <section className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl"></div>
        <div className="relative rounded-3xl border border-slate-700/50 bg-gradient-to-r from-slate-900/90 to-slate-800/90 p-12 backdrop-blur-sm">
          <h2 className="pb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-4xl font-bold text-transparent md:text-3xl">
           Your data deserves protection—keep it safe from threats.
          </h2>
          <p className="mb-8 text-lg text-slate-300">Join the privacy-first generation</p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-lg text-white shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:from-blue-400 hover:to-purple-500"
            asChild
          >
            <Link to="/share">
              Got something to share? <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

export default LandingPage;