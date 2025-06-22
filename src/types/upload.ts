export interface UploadMetadata {
    recipientEmail: string;
    deviceType: string;
    downloadLimit: number;
    expiryTime: string;
    geoLimit: object;
};

export interface UploadResponse {
    success: boolean;
    message: string;
    data: {
        pdfId: string;
        qrUrl: string;
    };
};