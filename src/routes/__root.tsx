/// <reference types="vite/client" />
import { 
  createRootRoute,
  HeadContent,
  Scripts,
  Outlet,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
// QUERY CLIENT
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// TYPES
import type { ReactNode } from 'react';
// COMPONENTS
import { Toaster } from "@/components/atoms/sonner";
// STYLES
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

const RootComponent = () => (
  <RootDocument>
    <QueryClientProvider client={queryClient}>
      <Outlet />
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
        title: 'Legitimacy - Secure PDF Sharing (Beta)',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  shellComponent: RootComponent,
});
