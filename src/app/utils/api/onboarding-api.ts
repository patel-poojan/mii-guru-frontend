import { axiosError } from '@/app/types/axiosTypes';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../axiosInstance';

type DefaultResponse = {
  success: boolean;
  status: number;
  message: string;
};
type UserDetailsUpdate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  photo: string | null;
  parents_details: {
    fatherName: string;
    motherName: string;
    currentAddress: string;
    city: string;
    country: string;
  };
  educational_details: {
    schoolName: string;
    board: string;
    mediumOfStudy: string;
    classGrade: string;
    major: string | null;
  };
  course_selection: {
    subjects: string[];
    otherSubjects: string;
    otherActivities: string;
  };
  availability: {
    selectedDays: string[];
    timeAvailable: string;
    timeToFinish: string;
  };
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

export const useUpdateProfile = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['update', 'user', 'info'],
    mutationFn: (data: UserDetailsUpdate): Promise<DefaultResponse> => {
      return axiosInstance.put(`/edit_user`, data);
    },
    onError,
    onSuccess,
  });
