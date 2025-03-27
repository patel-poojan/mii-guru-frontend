'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import ExpiredLinkCard from '../Components/common/ExpiredLinkCard';
import EmailSucessCard from '../Components/common/EmailSucessCard';
import { Loader } from '../Components/common/Loader';
import { useResendEmailForSignup, useVerifyEmail } from '../utils/api/auth-api';
import { axiosError } from '../types/axiosTypes';
import { storeProfileImage } from '../utils/storeProfileImage';

const Verify = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const emailId = searchParams.get('email') || '';
  const router = useRouter();
  // Add a state to track if verification has completed
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);

  const { mutate: verify, isPending: isPendingVerifyEmail } = useVerifyEmail({
    onSuccess(data) {
      setVerificationComplete(true);
      const token = data?.data?.access_token;
      if (token) {
        Cookies.set('authToken', token, {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        const role = data?.data?.user?.roles;
        Cookies.set('role', JSON.stringify(role), {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        const userInfo = data?.data?.user?.tracking;
        Cookies.set('userInfo', JSON.stringify(userInfo), {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        const photo = data?.data?.user?.photo;
        storeProfileImage(photo);
        setTimeout(() => {
          router.push('/termsandconditon');
        }, 200);
      } else {
        router.push('/login');
      }
      toast.success(data?.message);
    },
    onError(error: axiosError) {
      setVerificationComplete(true);
      setVerificationFailed(true);
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
    } else {
      // If no token, mark verification as complete but failed
      setVerificationComplete(true);
      setVerificationFailed(true);
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

  // Show loader while verification is in progress
  if (isPendingVerifyEmail || isResendPending) {
    return (
      <div className='min-h-dvh flex items-center justify-center p-4'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='min-h-dvh flex items-center justify-center p-4'>
      {verificationComplete && token && verificationFailed ? (
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
