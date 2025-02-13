'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from '../utils/react-query';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position='bottom-right' duration={3000} />
    </QueryClientProvider>
  );
}
