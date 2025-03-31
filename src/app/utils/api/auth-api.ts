import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { axiosError } from '../../types/axiosTypes';

type DefaultResponse = {
  statusCode: number;
  data: null;
  success: boolean;
  message: string;
};
// User tracking information interface
type UserTracking = {
  user_id: string;
  username: string;
  email: string;
  termsAccepted: boolean;
  onboardingCompleted: boolean;
  introductionViewed: boolean;
  created_at: string;
  updated_at: string;
};

// User information interface
type User = {
  id: string;
  email: string;
  is_verified: boolean;
  created_at: string;
  provider: string;
  roles: string;
  last_login: string;
  tracking: UserTracking;
  photo: string;
  is_subscription: boolean;
};

// Main authentication response interface
type AuthResponse = {
  access_token: string;
  token_type: string;
  expires_at: number;
  user: User;
};
type LoginResponse = {
  success: boolean;
  status: number;
  message: string;
  data: AuthResponse;
};

type LoginRequest = {
  username: string;
  password: string;
};
const handleError = (error: axiosError) => {
  toast.error(error.response?.data?.message || 'An error occurred');
};
// Generic hook factory for auth mutations

const useAuthMutation = <TData, TVariables>(
  mutationKey: string[],
  mutationFn: (variables: TVariables) => Promise<TData>,
  onSuccess?: (data: TData) => void,
  onError?: (error: axiosError) => void
) => {
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess,
    onError: onError || handleError,
  });
};

//login
export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: LoginResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<LoginResponse, LoginRequest>(
    ['auth', 'login'],
    (data: LoginRequest) =>
      axiosInstance.post('/auth/login', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    onSuccess,
    onError
  );

//logout
export const useLogout = ({
  onSuccess,
}: {
  onSuccess: (data: DefaultResponse) => void;
}) => {
  return useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: () => {
      Cookies.remove('authToken');
      Cookies.remove('userInfo');
      Cookies.remove('role');
      Cookies.remove('photo');
      Cookies.remove('isSubscription');
      localStorage.clear();
      const response: DefaultResponse = {
        statusCode: 200,
        data: null,
        success: true,
        message: 'Logged out successfully',
      };
      return Promise.resolve(response);
    },
    onSuccess,
  });
};

//signup
type SignupRequest = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};
export const useSignup = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, SignupRequest>(
    ['auth', 'signup'],
    (data: SignupRequest) => axiosInstance.post('/auth/register', data),
    onSuccess,
    onError
  );

export const useVerifyEmail = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: LoginResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<LoginResponse, string>(
    ['auth', 'verify-email'],
    (token: string) => axiosInstance.get(`/auth/verify?token=${token}`, {}),
    onSuccess,
    onError
  );

export const useResendEmailForSignup = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, ResendEmailRequest>(
    ['auth', 'resend-email'],
    (data: ResendEmailRequest) =>
      axiosInstance.post(`/auth/resend-verification`, data),
    onSuccess,
    onError
  );
export interface GoogleAuthResponse {
  url?: string;
  access_token?: string;
}
export const useLoginGoogle = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: GoogleAuthResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<GoogleAuthResponse, string>(
    ['auth', 'google-signup'],
    () => axiosInstance.get(`/auth/google/url`, {}),
    onSuccess,
    onError
  );
type GoogleLoginVerify = {
  code: string;
};
export const useGoogleLoginVerify = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: LoginResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<LoginResponse, GoogleLoginVerify>(
    ['auth', 'google-signup-verify'],
    (data: GoogleLoginVerify) => axiosInstance.post(`/auth/google`, data),
    onSuccess,
    onError
  );

//forgot password
type ForgetPasswordRequest = {
  email: string;
};
export const useForgetPassword = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, ForgetPasswordRequest>(
    ['auth', 'forgetpassword'],
    (data: ForgetPasswordRequest) =>
      axiosInstance.post('/auth/forgot-password', data),
    onSuccess,
    onError
  );
export const useVerifyToken = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, string>(
    ['auth', 'verifytoken'],
    (token: string) => axiosInstance.get(`/docs?token=${token}`, {}),
    onSuccess,
    onError
  );

type ResendEmailRequest = {
  email: string;
};
export const useResendEmail = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, ResendEmailRequest>(
    ['auth', 'resend', 'email'],
    (data: ResendEmailRequest) =>
      axiosInstance.post('/auth/forgot-password', data),
    onSuccess,
    onError
  );

type ResetPasswordRequest = {
  token: string;
  new_password: string;
  confirm_password: string;
};
export const useResetPassword = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, ResetPasswordRequest>(
    ['auth', 'resetpassword'],
    (data: ResetPasswordRequest) =>
      axiosInstance.post(`/auth/reset-password`, data),
    onSuccess,
    onError
  );
