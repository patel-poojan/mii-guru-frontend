import { axiosError } from '@/app/types/axiosTypes';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

type SupportRequest = {
  name: string;
  email: string;
  message: string;
};
type SupportResponse = { message: string };

export const useSupport = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: SupportResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['customer', 'support'],
    mutationFn: (data: SupportRequest): Promise<SupportResponse> => {
      return axiosInstance.post(`/other/contact-us`, data);
    },
    onError,
    onSuccess,
  });
