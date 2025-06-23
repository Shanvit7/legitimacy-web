// COMPONENTS
import VerificationStatus from '@/components/organisms/verification-status';
// ROUTE
import { Route } from '@/routes/verify';

const VerifyPage = () => {
    const { useSearch } = Route ?? {};
    const { token } = useSearch() ?? {};
    return (
    <main className="relative min-h-screen min-w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>
     <VerificationStatus token={token} />
    </main>
    );
};

export default VerifyPage;
