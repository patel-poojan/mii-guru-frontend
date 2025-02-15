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

type LoginResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    _id: string;
    email: string;
    joinedAt: number;
    authentication: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  };
};

type LoginRequest = {
  email: string;
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

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: LoginResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<LoginResponse, LoginRequest>(
    ['auth', 'login'],
    (data: LoginRequest) => axiosInstance.post('/auth/login', data),
    onSuccess,
    onError
  );
export const useLogout = ({
  onSuccess,
}: {
  onSuccess: (data: DefaultResponse) => void;
}) => {
  return useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: () => {
      Cookies.remove('authToken');
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
type SignupRequest = {
  email: string;
  password: string;
  confirmPassword: string;
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
      axiosInstance.post('/auth/resend-email', data),
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
      axiosInstance.post(`/auth/resend-verify-email`, data),
    onSuccess,
    onError
  );
type ResetPasswordRequest = {
  token: string;
  details: {
    newPassword: string;
    confirmPassword: string;
  };
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
      axiosInstance.post(`/auth/reset-password/${data.token}`, data.details),
    onSuccess,
    onError
  );

export const useVerifyToken = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: VerifySignupEmailResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<VerifySignupEmailResponse, string>(
    ['auth', 'verifytoken'],
    (token: string) => axiosInstance.post(`/auth/verify-token/${token}`, {}),
    onSuccess,
    onError
  );

type VerifySignupEmailResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    _id: string;
    email: string;
    joinedAt: number;
    authentication: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  };
};

export const useVerifyEmail = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: VerifySignupEmailResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<VerifySignupEmailResponse, string>(
    ['auth', 'verify-email'],
    (token: string) => axiosInstance.post(`/auth/verify-email/${token}`, {}),
    onSuccess,
    onError
  );
