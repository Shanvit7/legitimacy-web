import { StrictMode } from 'react';
// ROUTERS
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
// REACT
import ReactDOM from 'react-dom/client';
// QUERY CLIENT
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/query-client';
// COMPONENTS
import { Toaster } from "@/components/atoms/sonner";
import NotFoundPage from '@/pages/not-found';

const router = createRouter({ 
  routeTree,
  scrollRestoration: true,
  defaultNotFoundComponent: NotFoundPage,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </StrictMode>
  );
}
