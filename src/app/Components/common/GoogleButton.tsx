import { useGoogleLoginVerify } from '@/app/utils/api/auth-api';
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { axiosError } from '../../types/axiosTypes';
import { useRouter } from 'next/navigation';

const GoogleButton = () => {
  const router = useRouter();
  const { mutate: loginVerify, isPending: isPendingVerify } =
    useGoogleLoginVerify({
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
          'Google login failed';
        toast.error(errorMessage);
      },
    });
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      if (tokenResponse?.code) {
        loginVerify(tokenResponse.code);
      } else {
        toast.error('Google login failed');
      }
    },
    onError: () => {
      console.log('Login Failed');
      toast.error('Google login failed');
    },
    flow: 'auth-code',
    ux_mode: 'popup',
  });
  return (
    <Button
      variant='outline'
      className='flex mt-6 items-center w-full justify-center space-x-1 border-[#F1F1F3]'
      onClick={() => googleLogin()}
      type='button'
    >
      {isPendingVerify ? (
        <span>Loading...</span>
      ) : (
        <>
          <FcGoogle className='w-6 h-6' />
          <span>Google</span>
        </>
      )}
    </Button>
  );
};

export default GoogleButton;
