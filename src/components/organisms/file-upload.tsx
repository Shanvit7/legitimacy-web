// TYPES
import type { FC } from 'react';
// HOOKS
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// ICONS
import { Upload, File, X, CheckCircle } from 'lucide-react';
// UTILS
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  value?: File | null;
  className?: string;
}

const FileUpload: FC<FileUploadProps> = ({ onFileSelect, value, className }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
    setDragActive(false);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300",
        dragActive || isDragActive
          ? "border-blue-400 bg-blue-500/10 scale-[1.02]"
          : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/50",
        value ? "border-green-500 bg-green-500/10" : "",
        className
      )}
    >
      <input {...getInputProps()} />
      
      {!value ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className={cn(
            "mb-4 rounded-full p-4 transition-colors",
            dragActive || isDragActive ? "bg-blue-500/20" : "bg-slate-700/50"
          )}>
            <Upload className={cn(
              "h-8 w-8 transition-colors",
              dragActive || isDragActive ? "text-blue-400" : "text-slate-400"
            )} />
          </div>
          
          <h3 className="mb-2 text-lg font-semibold text-slate-200">
            {dragActive || isDragActive ? "Drop your PDF here" : "Upload PDF File"}
          </h3>
          
          <p className="mb-4 text-sm text-slate-400">
            Drag and drop your PDF file here, or click to browse
          </p>
          
          <div className="text-xs text-slate-500">
            Supported format: PDF (Max 10MB)
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-green-500/20 p-2">
              <File className="h-6 w-6 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">
                {value.name}
              </p>
              <p className="text-xs text-slate-400">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <CheckCircle className="h-5 w-5 text-green-400" />
          </div>
          
          <button
            type="button"
            onClick={removeFile}
            className="ml-4 rounded-full p-1 text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;