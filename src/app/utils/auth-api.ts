import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { axiosError } from '../types/axiosTypes';

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
}) =>
  useAuthMutation<DefaultResponse, void>(
    ['auth', 'logout'],
    () => axiosInstance.delete('/auth/logout'),
    (data) => {
      Cookies.remove('authToken');
      onSuccess(data);
    }
  );
type SignupResponse = {
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

type SignupRequest = {
  email: string;
  password: string;
  confirmPassword: string;
};
export const useSignup = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: SignupResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<SignupResponse, SignupRequest>(
    ['auth', 'signup'],
    (data: SignupRequest) => axiosInstance.post('/auth/register', data),
    onSuccess,
    onError
  );

type forgetPasswordRequest = {
  email: string;
};
export const useForgetPassword = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, forgetPasswordRequest>(
    ['auth', 'forgetpassword'],
    (data: forgetPasswordRequest) =>
      axiosInstance.post('/auth/forgot-password', data),
    onSuccess,
    onError
  );

type resendEmailRequest = {
  email: string;
};
export const useResendEmail = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, resendEmailRequest>(
    ['auth', 'resend', 'email'],
    (data: resendEmailRequest) =>
      axiosInstance.post('/auth/resend-email', data),
    onSuccess,
    onError
  );

type resetPasswordRequest = {
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
  useAuthMutation<DefaultResponse, resetPasswordRequest>(
    ['auth', 'resetpassword'],
    (data: resetPasswordRequest) =>
      axiosInstance.post(`/auth/reset-password/${data.token}`, data.details),
    onSuccess,
    onError
  );

type verifyTokenRequest = {
  token: string;
};
export const useVerifyToken = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: DefaultResponse) => void;
  onError?: (error: axiosError) => void;
}) =>
  useAuthMutation<DefaultResponse, verifyTokenRequest>(
    ['auth', 'verifytoken'],
    (data: verifyTokenRequest) =>
      axiosInstance.post(`/auth/verify-token/${data.token}`),
    onSuccess,
    onError
  );
