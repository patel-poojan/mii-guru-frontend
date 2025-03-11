import { axiosError } from '@/app/types/axiosTypes';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

type UpdateRequest = {
  termsAccepted?: boolean;
  onboardingCompleted?: boolean;
  introductionViewed?: boolean;
};

type DefaultResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    tracking: {
      user_id: string;
      username: string;
      email: string;
      termsAccepted: boolean;
      onboardingCompleted: boolean;
      introductionViewed: boolean;
      created_at: string;
      updated_at: string;
    };
  };
};

export const useUpdateUserTracking = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['update', 'tracking', 'user'],
    mutationFn: (data: UpdateRequest): Promise<DefaultResponse> => {
      return axiosInstance.post(`/auth/update-tracking`, data);
    },
    onError,
    onSuccess,
  });
