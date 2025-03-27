'use client';
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { toast } from 'sonner';
import AvatarVoiceMaintenance from './Components/AvatarVoicePopup';
import {
  useAddAvatar,
  useAddVoice,
  useAvatarVoiceMaintenance,
  useGetAvatar,
  useGetClasses,
  useGetSubjects,
  useGetVoice,
  useUploadIndexOfSyllabus,
  useUploadSyllabusPdf,
  useUploadSyllabusZip,
} from '@/app/utils/api/admin-api';
import { axiosError } from '../../types/axiosTypes';
import { MdModeEdit } from 'react-icons/md';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Types
interface SelectOption {
  value: string;
  label: string;
}

interface FileUpload {
  file: File | null;
  previewUrl?: string;
}

interface FormState {
  avatar: {
    name: string;
    file: FileUpload;
  };
  voice: {
    description: string;
    file: FileUpload;
  };
  content: {
    class: string;
    subject: string;
    file: FileUpload;
  };
  maintenance: {
    class: string;
    subject: string;
    avatar: string;
    voice: string;
  };
  user: {
    userId: string;
  };
  payment: {
    userId: string;
  };
}

// Common CSS Classes
const COMMON_STYLES = {
  GRID_LAYOUT: 'grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6',
  FLEX_CENTER: 'flex items-center justify-center',
  BG_DEFAULT: 'bg-white',
  TITLE: 'text-lg lg:text-xl text-black font-medium mb-3 md:mb-4',
  LABEL: 'text-sm lg:text-base text-black font-medium mb-2 lg:mb-3',
  CARD: 'rounded-lg space-y-4 px-4  lg:px-6 mt-4 lg:mt-6',
  ICON_WRAPPER:
    'w-full sm:w-40 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 h-[128px]',
  INPUT:
    'w-full bg-[#FCFCFD] border-[#F1F1F3] p-3 !text-[#656567] !placeholder:text-[#ACACAC] !text-sm sm:!text-base placeholder:!text-sm !focus:outline-none !focus:ring-0 rounded-md',
  BUTTON:
    'bg-[#FFD74B] hover:bg-[#FFD74B]/90 text-black px-4 lg:px-6 text-sm lg:text-base',
  BUTTON_ICON: 'p-2 border-gray-200',
  ERROR_TEXT: 'text-red-500 text-sm mt-1',
} as const;

const AdminDashboard: React.FC = () => {
  const zipCollection = useMemo(
    () => [
      'application/zip',
      'application/x-zip',
      'application/x-zip-compressed',
      'application/octet-stream',
    ],
    []
  );
  // State
  const [isUploadIndex, setIsUploadIndex] = useState(false);
  const initialFetchRef = useRef(false);
  const [formState, setFormState] = useState<FormState>({
    avatar: { name: '', file: { file: null } },
    voice: { description: '', file: { file: null } },
    content: { class: '', subject: '', file: { file: null } },
    maintenance: { class: '', subject: '', avatar: '', voice: '' },
    user: { userId: '' },
    payment: { userId: '' },
  });
  const [options, setOptions] = useState<{
    classOptions: SelectOption[];
    subjectOptions: SelectOption[];
    avatarOptions: SelectOption[];
    voiceOptions: SelectOption[];
  }>({
    classOptions: [],
    subjectOptions: [],
    avatarOptions: [],
    voiceOptions: [],
  });
  const [isOpenAvatarPopup, setIsOpenAvatarPopup] = useState(false);
  const openAvatarPopup = (): void => {
    setIsOpenAvatarPopup(true);
  };

  // Function to close the popup
  const closeAvatarPopup = (): void => {
    setIsOpenAvatarPopup(false);
  };
  // const [isOpenOnBoardingPopup, setIsOpenOnBoardingPopup] = useState(false);
  // const [userId, setUseId] = useState('');
  // const openOnBoardingPopup = (): void => {
  //   if (!formState.user.userId.trim()) {
  //     toast.warning('Please enter user ID');
  //     return;
  //   } else {
  //     setIsOpenOnBoardingPopup(true);
  //   }
  // };

  // Function to close the popup
  // const closeOnBoardingPopup = (): void => {
  //   setIsOpenOnBoardingPopup(false);
  // };

  // Handlers
  const handleInputChange = useCallback(
    (section: keyof FormState, field: string, value: string) => {
      setFormState((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    },
    []
  );

  const handleFileChange = useCallback(
    (section: keyof FormState, file: File | null) => {
      const previewUrl = file ? URL.createObjectURL(file) : undefined;
      setFormState((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          file: { file, previewUrl },
        },
      }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (
      section: keyof FormState,
      field: string,
      value: string | SelectOption | null
    ) => {
      let finalValue = '';

      // Handle different types of inputs
      if (typeof value === 'string') {
        // If string directly from shadcn Select
        finalValue = value;
      } else if (value && typeof value === 'object') {
        // If object from react-select
        finalValue = value.value;
      }

      setFormState((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: finalValue,
        },
      }));
    },
    []
  );

  const validateForm = useCallback(
    (section: keyof FormState): boolean => {
      const errors: string[] = [];

      switch (section) {
        case 'avatar':
          if (!formState.avatar.name.trim()) {
            errors.push('Please enter avatar name');
          }
          if (!formState.avatar.file.file) {
            errors.push('Please upload avatar file');
          }
          if (
            formState.avatar.file.file &&
            !['image/png', 'image/jpeg'].includes(
              formState.avatar.file.file.type
            )
          ) {
            errors.push('Avatar file must be PNG or JPEG format');
          }
          break;

        case 'voice':
          if (!formState.voice.description.trim()) {
            errors.push('Please enter voice description');
          }
          if (!formState.voice.file.file) {
            errors.push('Please upload voice file');
          }
          if (
            formState.voice.file.file &&
            !['audio/mpeg', 'audio/mp3'].includes(
              formState.voice.file.file.type
            )
          ) {
            errors.push('Voice file must be in MP3 format');
          }
          break;

        case 'content':
          if (!formState.content.class) {
            errors.push('Please select class');
          }
          if (!formState.content.subject) {
            errors.push('Please select subject');
          }
          if (!formState.content.file.file) {
            errors.push('Please upload file');
          }
          if (
            isUploadIndex &&
            formState.content.file.file &&
            !['application/pdf'].includes(formState.content.file.file.type)
          ) {
            errors.push('Content file must be in PDF format');
          }
          if (!isUploadIndex && formState.content.file.file) {
            const fileType = formState.content.file.file.type;
            const isPdf = fileType === 'application/pdf';
            const isZip = zipCollection.includes(fileType);

            if (!isPdf && !isZip) {
              errors.push('Content file must be in PDF or ZIP format');
            }
          }

          break;

        case 'maintenance':
          if (!formState.maintenance.class) {
            errors.push('Please select class');
          }
          if (!formState.maintenance.subject) {
            errors.push('Please select subject');
          }
          if (!formState.maintenance.avatar) {
            errors.push('Please select avatar');
          }
          if (!formState.maintenance.voice) {
            errors.push('Please select voice');
          }
          break;

        case 'user':
          if (!formState.user.userId.trim()) {
            errors.push('Please enter user ID');
          }
          break;

        case 'payment':
          if (!formState.payment.userId.trim()) {
            errors.push('Please enter user ID');
          }
          break;
      }

      if (errors.length > 0) {
        const errorMessage = (
          <div className='space-y-1'>
            <p className='font-medium'>Please check the following:</p>
            <ul className='list-disc pl-4 space-y-1'>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        );

        toast.warning(errorMessage, {
          duration: 5000, // Increased duration for better readability
          className: 'max-w-md', // Wider toast for better text wrapping
        });
        return false;
      }
      return true;
    },
    [formState]
  );
  //Get API Calls

  const { mutate: onGetAvatar, isPending: isPendingGetAvatar } = useGetAvatar({
    onSuccess(data) {
      if (data.data.avatars) {
        setOptions((prev) => ({
          ...prev,
          avatarOptions: data.data.avatars.map((avatar: string) => ({
            value: avatar,
            label: avatar,
          })),
        }));
      } else {
        setOptions((prev) => ({ ...prev, avatarOptions: [] }));
      }
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Failed to get avatar'
      );
    },
  });
  const { mutate: onGetVoice, isPending: isPendingGetVoice } = useGetVoice({
    onSuccess(data) {
      if (data.data.voices) {
        setOptions((prev) => ({
          ...prev,
          voiceOptions: data.data.voices.map((voice: string) => ({
            value: voice,
            label: voice,
          })),
        }));
      } else {
        setOptions((prev) => ({ ...prev, voiceOptions: [] }));
      }
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Failed to get voice'
      );
    },
  });
  const { mutate: onGetSubjects, isPending: isPendingGetSubjects } =
    useGetSubjects({
      onSuccess(data) {
        if (data.data.subjects) {
          setOptions((prev) => ({
            ...prev,
            subjectOptions: data.data.subjects.map((sub: string) => ({
              value: sub,
              label: sub,
            })),
          }));
        } else {
          setOptions((prev) => ({ ...prev, subjectOptions: [] }));
        }
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Failed to get subjects'
        );
      },
    });
  const { mutate: onGetClasses, isPending: isPendingGetClasses } =
    useGetClasses({
      onSuccess(data) {
        if (data.data.classes) {
          setOptions((prev) => ({
            ...prev,
            classOptions: data.data.classes.map((item: string) => ({
              value: item,
              label: `class ${item}`,
            })),
          }));
        } else {
          setOptions((prev) => ({ ...prev, classOptions: [] }));
        }
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Failed to get classes'
        );
      },
    });

  useEffect(() => {
    // Only fetch data on first mount, not on subsequent re-renders
    if (!initialFetchRef.current) {
      // Execute API calls
      onGetClasses();
      onGetSubjects();
      onGetAvatar();
      onGetVoice();

      // Set the ref to true so it doesn't run again
      initialFetchRef.current = true;
    }
  }, [onGetClasses, onGetSubjects, onGetAvatar, onGetVoice]);
  const { mutate: onUploadAvatar, isPending: isPendingUploadAvatar } =
    useAddAvatar({
      onSuccess(data) {
        toast.success(data?.message);
        onGetAvatar();
        setFormState((prev) => ({
          ...prev,
          avatar: { name: '', file: { file: null } },
        }));
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Failed to upload avatar'
        );
      },
    });
  const { mutate: onUploadVoice, isPending: isPendingUploadVoice } =
    useAddVoice({
      onSuccess(data) {
        toast.success(data?.message);
        onGetVoice();
        setFormState((prev) => ({
          ...prev,
          voice: { description: '', file: { file: null } },
        }));
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Failed to upload voice'
        );
      },
    });
  const {
    mutate: onUploadIndexOfSyllabus,
    isPending: isPendingUploadSyllabus,
  } = useUploadIndexOfSyllabus({
    onSuccess(data) {
      toast.success(data?.message);
      setFormState((prev) => ({
        ...prev,
        content: {
          class: '',
          subject: '',
          file: { file: null },
        },
      }));
      onGetClasses();
      onGetSubjects();
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Failed to upload index of syllabus'
      );
    },
  });
  const { mutate: onUploadSyllabusPdf, isPending: isPendingUploadSyllabusPdf } =
    useUploadSyllabusPdf({
      onSuccess(data) {
        toast.success(data?.message);
        setFormState((prev) => ({
          ...prev,
          content: {
            class: '',
            subject: '',
            file: { file: null },
          },
        }));
        onGetClasses();
        onGetSubjects();
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Failed to upload syllabus'
        );
      },
    });
  const { mutate: onUploadSyllabusZip, isPending: isPendingUploadSyllabusZip } =
    useUploadSyllabusZip({
      onSuccess(data) {
        toast.success(data?.message);
        setFormState((prev) => ({
          ...prev,
          content: {
            class: '',
            subject: '',
            file: { file: null },
          },
        }));
        onGetClasses();
        onGetSubjects();
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Failed to upload'
        );
      },
    });
  const {
    mutate: onAvatarVoiceMaintenance,
    isPending: isPendingAvatarVoiceMaintenance,
  } = useAvatarVoiceMaintenance({
    onSuccess(data) {
      toast.success(data?.message);

      setFormState((prev) => ({
        ...prev,
        maintenance: {
          class: '',
          subject: '',
          avatar: '',
          voice: '',
        },
      }));
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Failed to upload syllabus'
      );
    },
  });
  // Submit handler
  const handleSubmit = useCallback(
    async (section: keyof FormState) => {
      if (!validateForm(section)) {
        return;
      }

      try {
        if (section === 'avatar') {
          const formData = new FormData();
          formData.append('avatar_name', formState.avatar.name);
          formData.append('file', formState.avatar.file.file as Blob);
          await onUploadAvatar(formData);
        }
        if (section === 'voice') {
          const formData = new FormData();
          formData.append('voice_description', formState.voice.description);
          formData.append('file', formState.voice.file.file as Blob);
          await onUploadVoice(formData);
        }
        if (section === 'content') {
          const formData = new FormData();
          const file = formState.content.file.file;

          // Check if file exists before proceeding
          if (!file) {
            toast.warning('No file selected');
            return;
          }

          const fileType = file.type;

          // Add common form data for all uploads
          formData.append('class_name', formState.content.class);
          formData.append('subject_name', formState.content.subject);

          // Handle different file types and upload scenarios
          if (fileType === 'application/pdf') {
            // Determine which PDF upload function to use
            if (isUploadIndex) {
              // Add PDF file to form data
              formData.append('files', file as Blob);
              await onUploadIndexOfSyllabus(formData);
            } else {
              // Add PDF file to form data
              formData.append('pdf_file', file as Blob);
              await onUploadSyllabusPdf(formData);
            }
          } else if (zipCollection.includes(fileType)) {
            // Handle ZIP file upload with all possible MIME types
            formData.append('zip_file', file as Blob);
            await onUploadSyllabusZip(formData);
          } else {
            // Handle invalid file format
            toast.warning('Invalid file format');
          }
        }
        if (section === 'maintenance') {
          await onAvatarVoiceMaintenance({
            items: [
              {
                class_name: formState.maintenance.class,
                subject_name: formState.maintenance.subject,
                avatar_name: formState.maintenance.avatar,
                voice_name: formState.maintenance.voice,
              },
            ],
          });
        }
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (error) {
        console.error(`Error in ${section} submission:`, error);
      }
    },
    [
      formState.avatar.file.file,
      formState.avatar.name,
      formState.content.class,
      formState.content.file.file,
      formState.content.subject,
      formState.maintenance.avatar,
      formState.maintenance.class,
      formState.maintenance.subject,
      formState.maintenance.voice,
      formState.voice.description,
      formState.voice.file.file,
      isUploadIndex,
      onAvatarVoiceMaintenance,
      onUploadAvatar,
      onUploadIndexOfSyllabus,
      onUploadSyllabusPdf,
      onUploadSyllabusZip,
      onUploadVoice,
      validateForm,
      zipCollection,
    ]
  );

  const renderFileUpload = useCallback(
    (section: keyof FormState, acceptTypes: string, defaultImage: string) => {
      // Create a type guard to narrow down the FormState section types
      type FileSection = Extract<
        keyof FormState,
        'avatar' | 'voice' | 'content'
      >;

      // Type assertion to ensure section is a file-containing section
      const fileState = formState[section as FileSection].file;
      const file = fileState?.file;

      return (
        <div className='w-full sm:w-40 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200 h-auto min-h-[128px]'>
          <label className='cursor-pointer w-full h-full flex items-center justify-center '>
            <input
              type='file'
              accept={acceptTypes}
              className='hidden'
              onChange={(e) =>
                handleFileChange(section, e.target.files?.[0] || null)
              }
            />
            {fileState?.file ? (
              // If a file is selected, show appropriate preview based on file type
              file?.type.startsWith('image/') && fileState.previewUrl ? (
                // For images, show the preview
                <Image
                  src={fileState.previewUrl}
                  alt='Preview'
                  width={30}
                  height={20}
                  className='w-full h-full object-cover rounded-lg'
                />
              ) : file?.type.startsWith('audio/') && fileState.previewUrl ? (
                // For audio files, show player and filename
                <div className='flex flex-col items-center justify-between h-full p-2 text-center w-full gap-2'>
                  <Image
                    src={defaultImage}
                    alt='Upload'
                    width={30}
                    height={20}
                    className='w-8 h-8 sm:w-10 sm:h-10 object-contain'
                  />
                  <p className='text-xs sm:text-sm font-medium text-gray-700 line-clamp-1 max-w-full px-1'>
                    {file?.name || 'Audio file'}
                  </p>
                  <div className='w-full max-w-[150px] sm:max-w-[180px] bg-gray-100 rounded-md'>
                    <audio
                      controls
                      className='w-full h-6 sm:h-7'
                      src={fileState.previewUrl}
                      controlsList='nodownload nofullscreen noremoteplayback'
                    />
                  </div>
                </div>
              ) : (
                // For other non-images (PDF, etc.), show the filename and icon
                <div className='flex flex-col items-center justify-center p-2 sm:p-4 text-center'>
                  <Image
                    src={defaultImage}
                    alt='Upload'
                    width={20}
                    height={20}
                    className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain mb-1 sm:mb-2'
                  />
                  <p className='text-xs sm:text-sm font-medium text-gray-700 line-clamp-1 max-w-full px-1'>
                    {file?.name || 'File uploaded'}
                  </p>
                </div>
              )
            ) : (
              // No file selected, show default upload icon
              <Image
                src={defaultImage}
                alt='Upload'
                width={30}
                height={20}
                className='w-full h-24 sm:h-28 md:h-32 p-6 sm:p-8 object-contain rounded-lg'
              />
            )}
          </label>
        </div>
      );
    },
    [formState, handleFileChange]
  );
  return (
    <Card className='border border-[#F1F1F3] rounded-xl'>
      <CardContent className='p-4 lg:p-6'>
        <div className='space-y-8 lg:space-y-10'>
          <div>
            {/* Upload Sections Row */}
            <div className={COMMON_STYLES.GRID_LAYOUT}>
              {/* Upload New Avatar */}
              <div>
                <h3 className={COMMON_STYLES.TITLE}>Upload New Avatar</h3>
                <div
                  className={`${COMMON_STYLES.BG_DEFAULT} ${COMMON_STYLES.CARD}`}
                >
                  <div className='flex flex-col sm:flex-row items-start sm:items-stretch gap-4 h-full w-full'>
                    {renderFileUpload(
                      'avatar',
                      'image/*',
                      '/img/upload-pic.svg'
                    )}
                    <div className='flex-1 w-full'>
                      <p className={COMMON_STYLES.LABEL}>
                        Avatar Name<span className='text-red-500'>*</span>
                      </p>
                      <Input
                        placeholder='Enter Avatar Name'
                        className={COMMON_STYLES.INPUT}
                        value={formState.avatar.name}
                        onChange={(e) =>
                          handleInputChange('avatar', 'name', e.target.value)
                        }
                      />
                      <div className='flex justify-end mt-3'>
                        <Button
                          className={COMMON_STYLES.BUTTON}
                          onClick={() => handleSubmit('avatar')}
                          disabled={isPendingUploadAvatar}
                        >
                          {isPendingUploadAvatar ? 'Uploading...' : 'Upload'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload New Voice */}
              <div>
                <h3 className={COMMON_STYLES.TITLE}>Upload New Voice</h3>
                <div
                  className={`${COMMON_STYLES.BG_DEFAULT} ${COMMON_STYLES.CARD}`}
                >
                  <div className='flex flex-col sm:flex-row items-start sm:items-stretch gap-4 h-full w-full'>
                    {renderFileUpload('voice', 'audio/*', '/img/mic.svg')}
                    <div className='flex-1 w-full'>
                      <p className={COMMON_STYLES.LABEL}>
                        Voice Description<span className='text-red-500'>*</span>
                      </p>
                      <Input
                        placeholder='Enter Description'
                        className={COMMON_STYLES.INPUT}
                        value={formState.voice.description}
                        onChange={(e) =>
                          handleInputChange(
                            'voice',
                            'description',
                            e.target.value
                          )
                        }
                      />
                      <div className='flex justify-end mt-3'>
                        <Button
                          className={COMMON_STYLES.BUTTON}
                          onClick={() => handleSubmit('voice')}
                          disabled={isPendingUploadVoice}
                        >
                          {isPendingUploadVoice ? 'Uploading...' : 'Upload'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Content PDF */}
            <div className='mt-4 lg:mt-6'>
              <h3 className={COMMON_STYLES.TITLE}>Upload Content PDF</h3>
              <div className='flex items-center mb-4'>
                <label
                  htmlFor='index-switch'
                  className='flex items-center cursor-pointer'
                >
                  <div className='mr-3 text-sm font-medium'>
                    Upload index of syllabus
                  </div>
                  <Switch
                    id='index-switch'
                    checked={isUploadIndex}
                    onCheckedChange={() => setIsUploadIndex(!isUploadIndex)}
                    className=' data-[state=checked]:!bg-yellow data-[state=checked]:border-yellow'
                  />
                </label>
              </div>
              <div
                className={`${COMMON_STYLES.BG_DEFAULT} ${COMMON_STYLES.CARD}`}
              >
                <div className='flex flex-col sm:flex-row items-start sm:items-stretch gap-4 h-full w-full'>
                  {renderFileUpload(
                    'content',
                    isUploadIndex
                      ? 'application/pdf'
                      : 'application/pdf,application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream',
                    '/img/backup.svg'
                  )}
                  <div className='flex-1 w-full'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <p className={COMMON_STYLES.LABEL}>
                          Class<span className='text-red-500'>*</span>
                        </p>
                        <Input
                          placeholder='Enter Class'
                          className={COMMON_STYLES.INPUT}
                          value={formState.content.class ?? ''}
                          type='number'
                          onChange={(e) => {
                            if (
                              parseInt(e.target.value) < 1 ||
                              parseInt(e.target.value) > 12
                            ) {
                              toast.warning('Class should be between 1 and 12');
                            } else {
                              handleInputChange(
                                'content',
                                'class',
                                e.target.value
                              );
                            }
                          }}
                        />
                      </div>
                      <div>
                        <p className={COMMON_STYLES.LABEL}>
                          Subject<span className='text-red-500'>*</span>
                        </p>
                        <Input
                          placeholder='Enter Subject Name'
                          className={COMMON_STYLES.INPUT}
                          value={formState.content.subject}
                          onChange={(e) =>
                            handleInputChange(
                              'content',
                              'subject',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className='flex justify-end mt-3'>
                      <Button
                        className={COMMON_STYLES.BUTTON}
                        onClick={() => handleSubmit('content')}
                        disabled={
                          isPendingUploadSyllabus ||
                          isPendingUploadSyllabusPdf ||
                          isPendingUploadSyllabusZip
                        }
                      >
                        {isPendingUploadSyllabus ||
                        isPendingUploadSyllabusPdf ||
                        isPendingUploadSyllabusZip
                          ? 'Uploading...'
                          : 'Upload'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-[#F1F1F3]'></div>
          {/* Avatar & Voice Maintenance */}
          <div>
            <div className='flex justify-between items-center'>
              <h3 className={COMMON_STYLES.TITLE}>
                Avatar & Voice Maintenance
              </h3>
              <div
                className='text-[#808080] font-medium text-sm cursor-pointer mb-3 md:mb-4'
                onClick={openAvatarPopup}
              >
                View all
              </div>
            </div>
            <div
              className={`${COMMON_STYLES.BG_DEFAULT} ${COMMON_STYLES.CARD}`}
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <p className={COMMON_STYLES.LABEL}>
                    Class<span className='text-red-500'>*</span>
                  </p>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('maintenance', 'class', value)
                    }
                    value={formState.maintenance.class}
                    disabled={isPendingGetClasses}
                  >
                    <SelectTrigger className='h-9 bg-[#FCFCFD] border-[#F1F1F3] text-[#656567] text-sm'>
                      <SelectValue placeholder='Select Class' />
                    </SelectTrigger>
                    <SelectContent>
                      {isPendingGetClasses ? (
                        <div className='p-2 text-center'>
                          <span className='animate-pulse'>Loading...</span>
                        </div>
                      ) : options.classOptions &&
                        options.classOptions.length > 0 ? (
                        options.classOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      ) : (
                        <div className='p-2 text-center text-gray-500'>
                          No classes available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className={COMMON_STYLES.LABEL}>
                    Subject<span className='text-red-500'>*</span>
                  </p>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('maintenance', 'subject', value)
                    }
                    value={formState.maintenance.subject}
                    disabled={isPendingGetSubjects}
                  >
                    <SelectTrigger className='h-9 bg-[#FCFCFD] border-[#F1F1F3] text-[#656567] text-sm'>
                      <SelectValue placeholder='Select Subject' />
                    </SelectTrigger>
                    <SelectContent>
                      {isPendingGetSubjects ? (
                        <div className='p-2 text-center'>
                          <span className='animate-pulse'>Loading...</span>
                        </div>
                      ) : options.subjectOptions &&
                        options.subjectOptions.length > 0 ? (
                        options.subjectOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      ) : (
                        <div className='p-2 text-center text-gray-500'>
                          No subjects available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
                <div>
                  <p className={COMMON_STYLES.LABEL}>
                    Select Avatar<span className='text-red-500'>*</span>
                  </p>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('maintenance', 'avatar', value)
                    }
                    value={formState.maintenance.avatar}
                    disabled={isPendingGetAvatar}
                  >
                    <SelectTrigger className='h-9 bg-[#FCFCFD] border-[#F1F1F3] text-[#656567] text-sm'>
                      <SelectValue placeholder='Select Avatar' />
                    </SelectTrigger>
                    <SelectContent>
                      {isPendingGetAvatar ? (
                        <div className='p-2 text-center'>
                          <span className='animate-pulse'>Loading...</span>
                        </div>
                      ) : options.avatarOptions &&
                        options.avatarOptions.length > 0 ? (
                        options.avatarOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      ) : (
                        <div className='p-2 text-center text-gray-500'>
                          No avatars available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className={COMMON_STYLES.LABEL}>
                    Select Voice<span className='text-red-500'>*</span>
                  </p>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange('maintenance', 'voice', value)
                    }
                    value={formState.maintenance.voice}
                    disabled={isPendingGetVoice}
                  >
                    <SelectTrigger className='h-9 bg-[#FCFCFD] border-[#F1F1F3] text-[#656567] text-sm'>
                      <SelectValue placeholder='Select Voice' />
                    </SelectTrigger>
                    <SelectContent>
                      {isPendingGetVoice ? (
                        <div className='p-2 text-center'>
                          <span className='animate-pulse'>Loading...</span>
                        </div>
                      ) : options.voiceOptions &&
                        options.voiceOptions.length > 0 ? (
                        options.voiceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      ) : (
                        <div className='p-2 text-center text-gray-500'>
                          No voice options available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='flex justify-end mt-4'>
                <Button
                  className={COMMON_STYLES.BUTTON}
                  onClick={() => handleSubmit('maintenance')}
                  disabled={isPendingAvatarVoiceMaintenance}
                >
                  {isPendingAvatarVoiceMaintenance ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </div>
          </div>
          <div className='border-b border-[#F1F1F3]'></div>
          {/* User Maintenance and Payment Details Row */}
          <div className={COMMON_STYLES.GRID_LAYOUT}>
            {/* User Maintenance */}
            {/* <div>
              <h3 className={COMMON_STYLES.TITLE}>User Maintenance</h3>
              <div
                className={`${COMMON_STYLES.BG_DEFAULT} ${COMMON_STYLES.CARD}`}
              >
                <div className='space-y-2'>
                  <p className={COMMON_STYLES.LABEL}>
                    Edit User Details<span className='text-red-500'>*</span>
                  </p>
                  <div className='flex h-10 w-full border bg-[#FCFCFD] border-[#F1F1F3] rounded-md overflow-hidden'>
                    <input
                      placeholder='User Id'
                      className={`flex-grow border-none ${COMMON_STYLES.INPUT} outline-none px-3 rounded-l-md`}
                      value={formState.user.userId}
                      onChange={(e) =>
                        handleInputChange('user', 'userId', e.target.value)
                      }
                    />
                    <button
                      className='flex items-center justify-center h-full px-3 bg-[#F3F3F3] text-gray-400 hover:bg-gray-200'
                      onClick={() => {
                        openOnBoardingPopup();
                        setUseId(formState.user.userId);
                      }}
                    >
                      <MdModeEdit className='w-6 h-6 text-[#656567]' />
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Payment Details */}
            <div>
              <h3 className={COMMON_STYLES.TITLE}>Payment Details</h3>
              <div
                className={`${COMMON_STYLES.BG_DEFAULT} ${COMMON_STYLES.CARD}`}
              >
                <div className='space-y-2'>
                  <p className={COMMON_STYLES.LABEL}>
                    View Payment Details<span className='text-red-500'>*</span>
                  </p>
                  <div className='flex h-10 w-full border bg-[#FCFCFD] border-[#F1F1F3] rounded-md overflow-hidden focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-ring focus-within:ring-offset-background focus-within:outline-none'>
                    <input
                      placeholder='User Id'
                      className={`flex-grow border-none ${COMMON_STYLES.INPUT} outline-none px-3 rounded-l-md`}
                      value={formState.payment.userId}
                      onChange={(e) =>
                        handleInputChange('payment', 'userId', e.target.value)
                      }
                    />
                    <button className='flex items-center justify-center h-full px-3 bg-[#F3F3F3] text-gray-400 hover:bg-gray-200'>
                      <MdModeEdit className='w-6 h-6 text-[#656567]' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AvatarVoiceMaintenance
          open={isOpenAvatarPopup}
          onClose={closeAvatarPopup}
          options={options}
        />
        {/* <OnBoardingPopup
          open={isOpenOnBoardingPopup}
          onClose={closeOnBoardingPopup}
          userId={userId}
        /> */}
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
