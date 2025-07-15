// COMPONENTS
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
// ICONS
import { Shield, Download } from "lucide-react";
// TYPES
import type { QRDisplayProps } from "@/types/qr";
import { cn } from "@/lib/utils";

const QRDisplay = ({ qrUrl }: QRDisplayProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `legitimacy-qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-slate-700/50 backdrop-blur-sm shadow-2xl overflow-hidden">
        <CardHeader className="space-y-4 text-center animate-in fade-in zoom-in-50 duration-700 delay-300">
          <div className="inline-flex items-center space-x-2 rounded-full bg-green-500/10 px-4 py-2 mx-auto animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-300">PDF Secured Successfully</span>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
            Your QR Code is Ready
          </CardTitle>
          <CardDescription className="text-slate-400">
            Download this QR code and <b>Only</b> share it with your recipient to provide secure access to your PDF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center animate-in fade-in zoom-in-75 duration-700 delay-700">
            <div className="p-6 bg-white rounded-2xl shadow-xl">
              <img 
                src={qrUrl} 
                alt="QR Code for PDF access" 
                className="size-48"
              />
            </div>
          </div>
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-1000">
            <Button
              variant="default"
              size="lg"
              className={cn(
                "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:from-blue-400 hover:to-purple-500",
                "text-white font-semibold"
              )}
              onClick={handleDownload}
            >
              <Download className="size-4" />
              Download 
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRDisplay; 