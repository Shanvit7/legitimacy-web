export const generateSessionKey = async (): Promise<CryptoKey> => {
    return crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true, // extractable
      ['encrypt', 'decrypt']
    );
}
  