'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { queryClient } from '../utils/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
      onScriptLoadError={() => {
        console.log('Script load error');
      }}
      onScriptLoadSuccess={() => {
        console.log('Script loaded successfully');
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position='bottom-right' duration={3000} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
