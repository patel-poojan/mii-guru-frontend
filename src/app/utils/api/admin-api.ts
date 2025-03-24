import { axiosError } from '@/app/types/axiosTypes';
import { useMutation } from '@tanstack/react-query';
import { adminAxiosInstance } from '../adminAxiosInstance';

type DefaultResponse = {
  success: boolean;
  status: number;
  message: string;
};

export const useAddAvatar = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['add', 'avatar'],
    mutationFn: (data: FormData): Promise<DefaultResponse> => {
      return adminAxiosInstance.post(`/upload/avatar`, data);
    },
    onError,
    onSuccess,
  });
export const useAddVoice = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['add', 'voice'],
    mutationFn: (data: FormData): Promise<DefaultResponse> => {
      return adminAxiosInstance.post(`/upload/voice`, data);
    },
    onError,
    onSuccess,
  });

export const useUploadIndexOfSyllabus = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['add', 'index', 'syllabus'],
    mutationFn: (data: FormData): Promise<DefaultResponse> => {
      return adminAxiosInstance.post(`/upload/syllabus`, data);
    },
    onError,
    onSuccess,
  });
export const useUploadSyllabusPdf = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['add', 'pdf', 'syllabus'],
    mutationFn: (data: FormData): Promise<DefaultResponse> => {
      return adminAxiosInstance.post(`/process-pdf`, data);
    },
    onError,
    onSuccess,
  });
export const useUploadSyllabusZip = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['add', 'zip', 'syllabus'],
    mutationFn: (data: FormData): Promise<DefaultResponse> => {
      return adminAxiosInstance.post(`/process-zip`, data);
    },
    onError,
    onSuccess,
  });
type AvatarVoiceMaintenanceRequest = {
  items: {
    class_name: string;
    subject_name: string;
    avatar_name: string;
    voice_name: string;
  }[];
};
export const useAvatarVoiceMaintenance = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: DefaultResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['avatar', 'voice', 'maintenance'],
    mutationFn: (
      data: AvatarVoiceMaintenanceRequest
    ): Promise<DefaultResponse> => {
      return adminAxiosInstance.post(`/avatar_voice_maintenance`, data);
    },
    onError,
    onSuccess,
  });

type GetClassesResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    classes: string[];
  };
};
export const useGetClasses = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: GetClassesResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['get', 'class'],
    mutationFn: (): Promise<GetClassesResponse> => {
      return adminAxiosInstance.get(`/classes`);
    },
    onError,
    onSuccess,
  });
type GetSubjectsResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    subjects: string[];
  };
};
export const useGetSubjects = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: GetSubjectsResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['get', 'subjects'],
    mutationFn: (): Promise<GetSubjectsResponse> => {
      return adminAxiosInstance.get(`/subjects`);
    },
    onError,
    onSuccess,
  });
type GetAvatarResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    avatars: string[];
  };
};
export const useGetAvatar = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: GetAvatarResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['get', 'avatar'],
    mutationFn: (): Promise<GetAvatarResponse> => {
      return adminAxiosInstance.get(`/avatars`);
    },
    onError,
    onSuccess,
  });
type GetVoiceResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    voices: string[];
  };
};
export const useGetVoice = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: GetVoiceResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['get', 'voice'],
    mutationFn: (): Promise<GetVoiceResponse> => {
      return adminAxiosInstance.get(`/voices`);
    },
    onError,
    onSuccess,
  });

type GetAssignmentResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    settings: {
      subject_name: string;
      class_name: string;
      avatar_name: string;
      voice_name: string;
    }[];
  };
};
export const useGetAssignment = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: GetAssignmentResponse) => void;
  onError: (error: axiosError) => void;
}) =>
  useMutation({
    mutationKey: ['get', 'assignment'],
    mutationFn: (): Promise<GetAssignmentResponse> => {
      return adminAxiosInstance.get(`/avatar_voice_maintenance`);
    },
    onError,
    onSuccess,
  });
