// COMPONENTS
import InvalidQR from '@/components/molecules/invalid-qr';
import Spinner from '@/components/atoms/spinner';

const VerificationStatus = ({ token }: { token: string }) => {
    if (!token) {
        return <InvalidQR />;
    };
    return (
        <div className="relative z-10 flex h-screen items-center justify-center">
        <div className="bg-slate-800/70 border border-slate-700/50 backdrop-blur-sm rounded-lg p-8 max-w-sm w-full text-center">
          <Spinner />
          <h2 className="pt-4 text-2xl font-bold text-white">Verifying…</h2>
          <p className="pt-2 text-slate-400">Please wait, this may take a few seconds.</p>
        </div>
      </div>
    );
};

export default VerificationStatus;