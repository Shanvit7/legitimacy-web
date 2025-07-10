/// <reference types="vite/client" />
import { 
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
// QUERY CLIENT
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';
import type { ReactNode } from 'react';
// COMPONENTS
import { Toaster } from "@/components/atoms/sonner";
import appCss from '@/index.css?url';

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
);

const RootComponent = ({ children }: Readonly<{ children: ReactNode }>) => (
  <RootDocument>
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  </RootDocument>
);

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Lyk - Secure PDF Sharing (Beta)',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootComponent,
});
