// HOOKS
import { useMutation } from '@tanstack/react-query';
// SERVICES
import { uploadPdf } from '@/services/pdf';
// TYPES
import type { UploadMetadata } from '@/types/upload';
// LOGGER
import logger from '@/utils/logger';

const useUploadPdf = <TResponse = unknown>() => {
  return useMutation({
    mutationFn: async ({ pdf, metadata }: { pdf: File, metadata: UploadMetadata }): Promise<TResponse> => {
      const response = await uploadPdf(pdf, metadata);
      return response as TResponse;
    },
    onError: (error) => {
      logger.error(error?.message ?? "Something went wrong while uploading the PDF.");
    },
  });
};

export default useUploadPdf;