'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import ExpiredLinkCard from '../Components/common/ExpiredLinkCard';
import EmailSucessCard from '../Components/common/EmailSucessCard';
import { Loader } from '../Components/common/Loader';
import { useResendEmailForSignup, useVerifyEmail } from '../utils/api/auth-api';
import { axiosError } from '../types/axiosTypes';

const Verify = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const emailId = searchParams.get('email') || '';
  const router = useRouter();
  const { mutate: verify, isPending: isPendingVerifyEmail } = useVerifyEmail({
    onSuccess(data) {
      const token = data.data.authentication.accessToken;
      if (token) {
        Cookies.set('authToken', token, {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        router.push('/onboarding');
      } else {
        router.push('/login');
      }
      toast.success(data?.message);
    },
    onError(error: axiosError) {
      const errorMessage =
        error?.response?.data?.errors?.message ||
        error?.response?.data?.message ||
        'Verify email failed';
      toast.error(errorMessage);
    },
  });
  useEffect(() => {
    if (token) {
      verify(token);
    }
  }, [token, verify]);

  const { mutate: onResendEmail, isPending: isResendPending } =
    useResendEmailForSignup({
      onSuccess(data) {
        toast.success(data?.message);
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Resend email request failed'
        );
      },
    });
  const resendEmailHandler = () => {
    if (emailId) {
      onResendEmail({ email: emailId });
    } else {
      toast.error('something went wrong');
    }
  };
  // Expired Link Component

  return (
    <div className='min-h-dvh flex items-center justify-center  p-4'>
      {isResendPending || isPendingVerifyEmail ? <Loader /> : <></>}
      {token && !isPendingVerifyEmail ? (
        <ExpiredLinkCard onResend={resendEmailHandler} email={emailId} />
      ) : (
        <EmailSucessCard email={emailId} onResend={resendEmailHandler} />
      )}
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Verify />
    </Suspense>
  );
};

export default Page;
