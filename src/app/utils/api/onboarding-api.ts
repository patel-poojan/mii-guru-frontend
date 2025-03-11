import { axiosError } from '@/app/types/axiosTypes';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

type DefaultResponse = {
  success: boolean;
  status: number;
  message: string;
};

export const useRegisterUser = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['register', 'user', 'info'],
    mutationFn: (data: FormData): Promise<DefaultResponse> => {
      return axiosInstance.post(`/onboarding_register`, data);
    },
    onError,
    onSuccess,
  });
