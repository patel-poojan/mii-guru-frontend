import { useGoogleLoginVerify } from '@/app/utils/api/auth-api';
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { axiosError } from '../../types/axiosTypes';
import { useRouter } from 'next/navigation';
import { storeProfileImage } from '@/app/utils/storeProfileImage';

const GoogleButton = () => {
  const router = useRouter();
  const { mutate: loginVerify, isPending: isPendingVerify } =
    useGoogleLoginVerify({
      onSuccess(data) {
        const token = data?.data?.access_token;
        if (token) {
          Cookies.set('authToken', token, {
            path: '/',
            sameSite: 'Lax',
            secure: true,
          });
          const userInfo = data?.data?.user?.tracking;
          const role = data?.data?.user?.roles;
          const photo = data?.data?.user?.photo;
          // Cookies.set('photo', JSON.stringify(photo), {
          //   path: '/',
          //   sameSite: 'Lax',
          //   secure: true,
          // });
          storeProfileImage(photo);
          Cookies.set('role', JSON.stringify(role), {
            path: '/',
            sameSite: 'Lax',
            secure: true,
          });
          Cookies.set('userInfo', JSON.stringify(userInfo), {
            path: '/',
            sameSite: 'Lax',
            secure: true,
          });
          setTimeout(() => {
            router.push('/onboarding');
          }, 500);
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
        loginVerify({ code: tokenResponse?.code });
      } else {
        toast.error('Google login failed');
      }
    },
    onError: () => {
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
