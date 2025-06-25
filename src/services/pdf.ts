import { ApiService } from '@/services';
// CONSTANTS
import { PDF_API_URL } from '@/utils/constants';

// TYPES
import type { UploadMetadata } from '@/types/upload';

const pdfService = new ApiService(PDF_API_URL);

export const uploadPdf = async (pdf: File, metadata: UploadMetadata) => {
  const formData = new FormData();
  formData.append('pdf', pdf);
  formData.append('recipientEmail', metadata.recipientEmail);
  formData.append('deviceType', metadata.deviceType);
  formData.append('downloadLimit', metadata.downloadLimit.toString());
  formData.append('expiryTime', metadata.expiryTime);
  formData.append('geoLimit', JSON.stringify(metadata.geoLimit));
  const { data = {}, isError = false } = (await pdfService.post('/upload', formData)) ?? {};
  if (isError) {
    throw new Error('Failed to upload PDF');
  }
  return data;
};
