# Legitimacy Web

This is a Proof of Concept (POC) project that allows users to upload PDFs and securely share them with others using QR code. Geolocation, OTP verification, and Ephemeral Session Key (ESK) implementation are used as security constraints. The project is built using TanStack Start for modern web application development.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that provides a fast development environment.
- **TanStack Start**: A framework for building modern web applications.
- **TanStack Router**: A powerful routing library for React applications.
- **Leaflet**: An open-source JavaScript library for mobile-friendly interactive maps.
- **Zod**: A TypeScript-first schema declaration and validation library.

## Workflow and Features

1. **PDF Upload**:
   - Users can upload PDF files to the platform.

2. **Geo Fencing**:
   - The platform uses geofencing to restrict access to the PDF based on the recipients location.

3. **OTP Verification**:
   - An OTP is sent to the recipient's email to verify their identity before accessing the PDF.

4. **ESK (Ephemeral Session Key) Implementation**:
   - Ephemeral Session Keys are used to ensure secure sessions during the PDF sharing process.

5. **QR Code Sharing**:
   - A QR code is generated for the uploaded PDF, which can be shared with others to provide access.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shanvit7/legitimacy-web
   cd legitimacy-web
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   pnpm dev
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
