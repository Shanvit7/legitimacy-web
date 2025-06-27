// HOOKS
import { useForm } from 'react-hook-form';
import useVerifyOtp from '@/hooks/use-verify-otp';
import { useNavigate } from '@tanstack/react-router';
// COMPONENTS
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/molecules/input-otp';
import { Button } from '@/components/atoms/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/atoms/form';
import { toast } from 'sonner';
import { Block } from '@tanstack/react-router';
// SCHEMAS
import { otpSchema, type OtpFormSchema } from '@/schemas/otp';
// UTILS
import { sha256 } from '@/utils/crypto';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
// CONSTANTS
import { OTP_LENGTH } from '@/utils/constants';
// STORES
import useSessionStore from '@/stores/session';
// LOGGER
import logger from '@/utils/logger';

const OtpPage = () => {
  const { key, clearSession } = useSessionStore() ?? {};
  const navigate = useNavigate();
  const { mutate: verifyOtp, isPending = true, isSuccess = false } = useVerifyOtp();
  const form = useForm<OtpFormSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
    mode: 'onSubmit',
  });
  const { handleSubmit, control, watch } = form ?? {};

  const otp = watch('otp');

  const onSubmit = async ({ otp }: OtpFormSchema) => {
    const publicChallenge = await sha256(key?.toString() ?? '');
    verifyOtp({ otp, publicChallenge }, {
        onSuccess: (data) => {
            if (!(data instanceof Blob)) {
                toast.error('Failed to download PDF, there seems to be an issue with data received');
                return;
            };
            toast.success('PDF download has started, please wait for it to complete');
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            link.href = url;
            const timestamp = format(new Date(), 'yyyy-MM-dd-HH-mm-ss');
            link.download = `lyk-unlocked-${timestamp}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            clearSession();
        },
        onError: (error) => {
          logger.error(error);
          navigate({ to: '/invalid' });
        }
    });
  };

  const shouldBlock = () => {
      const shouldLeave = confirm('Are you sure you want to leave ?. Please wait for the PDF to download after you have verified the OTP else you will have to rescan the QR code.')
      return !shouldLeave
  };

  return (
    <Block shouldBlockFn={shouldBlock}>
    <main className="relative min-h-screen min-w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center text-center">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Enter OTP</h2>
              <p className="max-w-sm text-slate-400 text-sm">
                We&apos;ve sent a one-time passcode to your email. Enter the 6-digit code to continue.
              </p>
              <p className="text-slate-400 text-sm">Please don&apos;t <b>close or refresh this page</b></p>
            </div>

            <FormField
              control={control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center gap-2">
                  <FormLabel className="sr-only">OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={OTP_LENGTH}
                      type="number"
                      value={field.value}
                      onChange={field.onChange}
                      className="gap-4 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    >
                      <InputOTPGroup className="gap-4">
                        {Array.from({ length: OTP_LENGTH }, (_, i) => i).map((i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="size-14 text-xl text-white bg-slate-800 border border-slate-700 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="lg"
              type="submit"
              disabled={otp.length < OTP_LENGTH || isPending || isSuccess}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-5 text-white font-semibold shadow-md shadow-purple-500/30 transition-all duration-300 hover:from-blue-400 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify OTP
            </Button>
          </form>
        </Form>
      </div>
    </main>
    </Block>
  );
};

export default OtpPage;
