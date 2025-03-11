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
        const token = data?.data?.access_token;
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
        loginVerify({ code: tokenResponse?.code });
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

// import { useGoogleLoginVerify, useLoginGoogle } from '@/app/utils/api/auth-api';
// import { Button } from '@/components/ui/button';
// import React, { useEffect } from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import { toast } from 'sonner';
// import Cookies from 'js-cookie';
// import { axiosError } from '../../types/axiosTypes';
// import { useRouter } from 'next/navigation';

// const GoogleButton = () => {
//   const router = useRouter();

//   const { mutate: loginVerify, isPending: isPendingVerify } =
//     useGoogleLoginVerify({
//       onSuccess(data) {
//         const token = data?.data?.access_token;
//         if (token) {
//           Cookies.set('authToken', token, {
//             path: '/',
//             sameSite: 'Lax',
//             secure: true,
//           });
//           const userInfo = data?.data?.user?.tracking;
//           Cookies.set('userInfo', JSON.stringify(userInfo), {
//             path: '/',
//             sameSite: 'Lax',
//             secure: true,
//           });
//           router.push('/onboarding');
//           toast.success(data?.message);
//         } else {
//           router.push('/login');
//           toast.error('Authentication failed');
//         }
//       },
//       onError(error: axiosError) {
//         const errorMessage =
//           error?.response?.data?.errors?.message ||
//           error?.response?.data?.message ||
//           'Google login verification failed';
//         toast.error(errorMessage);
//       },
//     });

//   const { mutate: getGoogleAuthUrl, isPending } = useLoginGoogle({
//     onSuccess(data) {
//       if (data?.url) {
//         window.location.href = data?.url;
//       } else {
//         toast.error('Failed to get Google authentication URL');
//       }
//     },
//     onError(error: axiosError) {
//       const errorMessage =
//         error?.response?.data?.errors?.message ||
//         error?.response?.data?.message ||
//         'Google login failed';
//       toast.error(errorMessage);
//     },
//   });

//   // Handle OAuth callback
//   useEffect(() => {
//     // Check if this is a callback from Google OAuth
//     if (
//       window.location.hash &&
//       window.location.hash.includes('access_token=')
//     ) {
//       const hashParams = new URLSearchParams(window.location.hash.substring(1));
//       const accessToken = hashParams.get('access_token');

//       if (accessToken) {
//         // Send the token to your backend for verification
//         loginVerify({ access_token: accessToken });
//       }
//     }
//   }, [loginVerify]);

//   return (
//     <Button
//       variant='outline'
//       className='flex mt-6 items-center w-full justify-center space-x-1 border-[#F1F1F3]'
//       onClick={() => getGoogleAuthUrl('')}
//       type='button'
//       disabled={isPending || isPendingVerify}
//     >
//       {isPendingVerify || isPending ? (
//         <span>Loading...</span>
//       ) : (
//         <>
//           <FcGoogle className='w-6 h-6' />
//           <span>Google</span>
//         </>
//       )}
//     </Button>
//   );
// };

// export default GoogleButton;
