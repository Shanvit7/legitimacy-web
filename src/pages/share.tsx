"use client";
// HOOKS
import { useForm } from "react-hook-form";
// COMPONENTS
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { Separator } from "@/components/atoms/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/atoms/tooltip";
import FileUpload from "@/components/organisms/file-upload";
import TimePicker from "@/components/organisms/time-picker";
import GeoPicker from "@/components/organisms/geo-picker";
import Topbar from "@/components/molecules/topbar";
import Footer from "@/components/molecules/footer";
import QRDisplay from "@/components/molecules/qr-display";
import { toast } from "sonner";
// ICONS
import { Clock, Download, Mail, Monitor, Shield, Zap, QrCode, MapPin, MapPinCheck } from "lucide-react";
// CONSTANTS
import { DEVICE_TYPES } from "@/utils/constants";
// SCHEMAS
import { sharePDFFormSchema, type SharePDFData } from "@/schemas/share";
// TYPES
import type { UploadMetadata, UploadResponse } from "@/types/upload";
// UTILS
import { zodResolver } from "@hookform/resolvers/zod";
// HOOKS
import useUploadPdf from "@/hooks/use-upload-pdf";
// STYLES
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';


const SharePage = () => {
  const {
     mutate: uploadPdf, 
     data: uploadData,
     isSuccess = false,
     isPending: isUploading = true,
  } = useUploadPdf<UploadResponse>() ?? { data: undefined, mutate: () => {}, isPending: true, isSuccess: false };
  const form = useForm<SharePDFData>({
    resolver: zodResolver(sharePDFFormSchema),
    defaultValues: {
      pdf: undefined,
      recipientEmail: "",
      deviceType: "",
      expiryTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
      downloadLimit: 1,
      geoLimit: null,
    },
  });
  const { data: { qrUrl = '' } = {} } = uploadData ?? {};
  const onSubmit = async (values: SharePDFData) => {
    const { pdf, ...metadata } = values ?? {};
    const { expiryTime, geoLimit = {}, ...rest } = metadata ?? {};
    uploadPdf({ 
      pdf, 
      metadata: {
        ...rest,
        expiryTime: expiryTime.toISOString(),
        geoLimit,
      } as UploadMetadata 
    },{
      onError: ({ message = "Something went wrong while uploading the PDF. Please try again later." }: { message: string }) => {
        toast.error(message);
      }
    });
  };

  return (
    <main className="relative min-h-screen min-w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl animate-pulse delay-500"></div>
      </div>

      <Topbar />

      <section className="relative z-10 mx-auto max-w-2xl px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full bg-blue-500/10 px-4 py-2 mb-6">
            <Shield className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Secure & Encrypted</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6">
            {isSuccess ? 'PDF Secured' : 'Share your PDF'}
          </h1>
          <p className="text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
            {isSuccess 
              ? 'Your PDF has been secured and is ready to be shared'
              : 'Securely share your documents with advanced controls, we got your back.'
            }
          </p>
        </div>

        {isSuccess && qrUrl ? (
          <QRDisplay 
            qrUrl={qrUrl ?? ""}
          />
        ) : (
          <Card className="bg-slate-900/70 border-slate-700/50 backdrop-blur-sm shadow-2xl">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-slate-100">Share Settings</CardTitle>
                <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                  <Zap className="h-3 w-3 mr-1" />
                  New Features
                </Badge>
              </div>
              <CardDescription className="text-slate-400">
                Configure sharing permissions and security settings for your PDF
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="pdf"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200 text-lg font-semibold flex items-center">
                          <Monitor className="h-5 w-5 mr-2 text-blue-400" />
                          PDF Upload
                        </FormLabel>
                        <FormControl>
                          <FileUpload
                            onFileSelect={onChange}
                            value={value}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="bg-slate-700/50" />

                  <FormField
                    control={form.control}
                    name="recipientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200 font-semibold flex items-center">
                          <Mail className="size-4 mr-2 text-green-400" />
                          Recipient Email 
                          <Tooltip>
                            <TooltipTrigger className="p-0" asChild>
                              <div className="ml-1.5 inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800/30 size-4">
                                <span className="text-[10px] text-slate-400">?</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This email address will receive an OTP verification code when attempting to download the PDF</p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="recipient@example.com"
                            className="bg-slate-800/50 border-slate-600 text-slate-100 placeholder:text-slate-500 h-12 text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="deviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200 font-semibold flex items-center">
                            <Monitor className="size-4 mr-2 text-purple-400" />
                            Device Access
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-100 h-12 capitalize">
                                <SelectValue className="capitalize" placeholder="Select device type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              {DEVICE_TYPES.map((type) => (
                                <SelectItem key={type} value={type} className="text-slate-100 focus:bg-slate-700 capitalize">
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="downloadLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-200 font-semibold flex items-center">
                            <Download className="h-4 w-4 mr-2 text-orange-400" />
                            Download Limit
                          </FormLabel>
                          <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={String(field.value)}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-100 h-12 capitalize">
                                <SelectValue placeholder="Select download limit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-800 border-slate-600">
                              {[1, 2, 3, 4, 5].map((limit) => (
                                <SelectItem 
                                  key={limit} 
                                  value={String(limit)} 
                                  className="text-slate-100 focus:bg-slate-700"
                                >
                                  {`${limit} ${limit === 1 ? 'download' : 'downloads'}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="expiryTime"
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <div className="flex items-center gap-4">
                          <FormLabel className="text-slate-200 font-semibold flex items-center min-w-32">
                            <Clock className="size-4 mr-2 text-red-400" />
                            Expires In
                          </FormLabel>
                          <FormControl>
                            <TimePicker setDate={field.onChange} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="geoLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200 font-semibold flex items-center">
                          <MapPin className="size-4 mr-2 text-yellow-400" />
                          Geographic Access Limit
                        </FormLabel>
                        <FormControl>
                          <div className="bg-slate-800/50 border border-slate-600 rounded-md overflow-hidden">
                            <GeoPicker onChange={field.onChange} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="bg-slate-700/50" />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isUploading || isSuccess}
                    className="w-full h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                  >
                    {isUploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Securing PDF...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <QrCode className="size-5" />
                        <span>Generate QR Code</span>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        <div className="pt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: MapPinCheck, title: "Geo Fencing", desc: "Limit access to specific locations" },
            { icon: Clock, title: "Auto Expiry", desc: "Time-based access control" },
            { icon: Shield, title: "OTP Verification", desc: "OTP verification will be done for each download" },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-slate-800/30 border border-slate-700/30">
              <feature.icon className="h-8 w-8 mx-auto mb-3 text-blue-400" />
              <h3 className="font-semibold text-slate-200 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SharePage;
