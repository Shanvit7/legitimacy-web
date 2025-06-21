// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { uploadPdf } from '@/services/pdf';
// TYPES
import type { UploadMetadata } from '@/types/upload';
// LOGGER
import logger from '@/utils/logger';

const useUploadPdf = () => {
  return useMutation({
    mutationFn: ({ pdf, metadata }: { pdf: File, metadata: UploadMetadata }) => uploadPdf(pdf, metadata),
    onError: (error) => {
      logger.error(error.message);
    },
  });
};

export default useUploadPdf;