'use client';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'sonner';
import {
  useAvatarVoiceMaintenance,
  useGetAssignment,
} from '@/app/utils/api/admin-api';
import { axiosError } from '../../../types/axiosTypes';
import { Loader } from '@/app/Components/common/Loader';

// TypeScript interfaces
interface Option {
  value: string;
  label: string;
}

interface Assignment {
  id: number;
  className: string;
  subjectName: string;
  avatarName: string;
  voiceName: string;
}

interface PopupProps {
  open: boolean;
  onClose: () => void;
  options: {
    classOptions: Option[];
    subjectOptions: Option[];
    avatarOptions: Option[];
    voiceOptions: Option[];
  };
}

// Type for dropdown field names
type DropdownField = 'subject' | 'avatar' | 'voice';

// Initial data that matches your example
const initialData: Assignment[] = [];

const AvatarVoiceMaintenance: React.FC<PopupProps> = ({
  open,
  onClose,
  options,
}) => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialData);

  // Handle option selection in dropdown
  const handleSelectChange = (
    rowId: number,
    field: DropdownField,
    value: string
  ): void => {
    // Find the corresponding option to get the label
    let label = '';
    if (field === 'subject') {
      label =
        options.subjectOptions.find((option) => option.value === value)
          ?.label || '';
    } else if (field === 'avatar') {
      label =
        options.avatarOptions.find((option) => option.value === value)?.label ||
        '';
    } else if (field === 'voice') {
      label =
        options.voiceOptions.find((option) => option.value === value)?.label ||
        '';
    }

    setAssignments((prev) =>
      prev.map((item) =>
        item.id === rowId
          ? {
              ...item,
              [field]: value,
              [`${field}Name`]: label,
            }
          : item
      )
    );
  };
  const { mutate: onGetAssignment, isPending: isPendingToGetAssignment } =
    useGetAssignment({
      onSuccess(data) {
        if (data.success) {
          const newAssignments = data.data.settings.map((item, index) => ({
            id: index,
            className: item.class_name,
            subjectName: item.subject_name,
            avatarName: item.avatar_name,
            voiceName: item.voice_name,
          }));
          setAssignments(newAssignments);
        }
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Failed to get data'
        );
      },
    });
  const {
    mutate: onAvatarVoiceMaintenance,
    isPending: isPendingAvatarVoiceMaintenance,
  } = useAvatarVoiceMaintenance({
    onSuccess(data) {
      onClose();
      toast.success(data?.message);
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Failed to update'
      );
    },
  });
  useEffect(() => {
    if (open) {
      onGetAssignment();
    }
  }, [onGetAssignment, open]);
  // Handle update button click
  const handleUpdate = async (): Promise<void> => {
    try {
      const apiData = assignments.map((item) => ({
        class_name: item.className,
        subject_name: item.subjectName,
        avatar_name: item.avatarName,
        voice_name: item.voiceName,
      }));
      await onAvatarVoiceMaintenance({
        items: apiData,
      });
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  // Mobile card view for each assignment
  const MobileCard = ({ item }: { item: Assignment }) => {
    return (
      <div className='p-3 sm:p-4 border border-[#F1F1F3] rounded-md mb-3 sm:mb-4'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3'>
          <span className='font-medium text-black text-sm sm:text-base mb-1 sm:mb-0'>
            Class
          </span>
          <span className='text-[#656567] text-sm sm:text-base'>
            {item.className}
          </span>
        </div>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3'>
          <span className='font-medium text-black text-sm sm:text-base mb-1 sm:mb-0'>
            Subject
          </span>
          <span className='text-[#656567] text-sm sm:text-base'>
            {item.subjectName}
          </span>
        </div>

        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3'>
          <span className='font-medium text-black text-sm sm:text-base mb-1 sm:mb-0'>
            Avatar
          </span>
          <div className='w-full sm:w-1/2'>
            <Select
              defaultValue={item.avatarName}
              value={item.avatarName}
              onValueChange={(value) =>
                handleSelectChange(item.id, 'avatar', value)
              }
            >
              <SelectTrigger className='w-full bg-[#FCFCFD] border-none shadow-none focus:ring-0 text-sm h-auto p-0'>
                <SelectValue
                  placeholder='Select avatar'
                  className='text-[#656567] font-normal'
                />
              </SelectTrigger>
              <SelectContent className='bg-white z-[9999]'>
                {options.avatarOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className='hover:bg-[#F1F1F3] text-black focus:bg-[#F1F1F3]'
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
          <span className='font-medium text-black text-sm sm:text-base mb-1 sm:mb-0'>
            Voice
          </span>
          <div className='w-full sm:w-1/2'>
            <Select
              defaultValue={item.voiceName}
              value={item.voiceName}
              onValueChange={(value) =>
                handleSelectChange(item.id, 'voice', value)
              }
            >
              <SelectTrigger className='w-full bg-[#FCFCFD] border-none shadow-none focus:ring-0 text-sm h-auto p-0'>
                <SelectValue
                  placeholder='Select voice'
                  className='text-[#656567] font-normal'
                />
              </SelectTrigger>
              <SelectContent className='bg-white z-[9999]'>
                {options.voiceOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className='hover:bg-[#F1F1F3] text-black focus:bg-[#F1F1F3]'
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-white w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl p-0 rounded-md'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Avatar & Voice Maintenance</DialogTitle>
          <DialogDescription id='dialog-description'>
            Update avatar and voice for each assignment
          </DialogDescription>
        </DialogHeader>
        {(isPendingToGetAssignment || isPendingAvatarVoiceMaintenance) && (
          <Loader />
        )}
        <div className='flex flex-col p-3 sm:p-6 pb-4 sm:pb-8'>
          {/* Header with title and close button */}
          <div className='flex items-center justify-between mb-3 sm:mb-6'>
            <h2 className='text-base md:text-lg font-medium text-black'>
              Avatar & Voice Maintenance
            </h2>
            <DialogClose className='h-6 w-6 flex items-center justify-center  text-gray-500 hover:bg-gray-100 border border-black rounded-full'>
              <IoMdClose size={18} className='text-black' />
            </DialogClose>
          </div>

          {/* Desktop view - only visible on md and above */}
          <div className='hidden md:block w-full overflow-x-auto'>
            {/* Table header */}
            <div className='overflow-x-auto'>
              <div className='grid grid-cols-4 gap-4 mb-4 min-w-[600px]'>
                <div className='text-base text-black font-medium ms-2'>
                  Class
                </div>
                <div className='text-base text-black font-medium ms-2'>
                  Subject
                </div>
                <div className='text-base text-black font-medium ms-2'>
                  Avatar
                </div>
                <div className='text-base text-black font-medium ms-2'>
                  Voice
                </div>
              </div>
            </div>

            {/* Table rows */}
            <div className='overflow-x-auto'>
              <div className='max-h-[60vh] overflow-y-auto'>
                <div className='min-w-[600px] border border-[#F1F1F3] rounded-md overflow-hidden'>
                  {assignments.length > 0 ? (
                    assignments.map((item, index) => (
                      <div
                        key={`desktop-${item.id}-${index}`}
                        className={`grid grid-cols-4
                    ${index % 2 === 0 ? 'bg-[#FAFAFA]' : 'bg-white'}
                    ${
                      index !== assignments.length - 1
                        ? 'border-b border-[#F1F1F3]'
                        : ''
                    }`}
                      >
                        {/* Class column - not editable */}
                        <div className='text-base text-[#656567] font-normal p-4 border-r border-[#F1F1F3]'>
                          {item.className}
                        </div>

                        {/* Subject dropdown */}
                        <div className='text-base text-[#656567] font-normal p-4 border-r border-[#F1F1F3]'>
                          {item.subjectName}
                        </div>

                        {/* Avatar dropdown */}
                        <div className='p-4 border-r border-[#F1F1F3]'>
                          <Select
                            defaultValue={item.avatarName}
                            value={item.avatarName}
                            onValueChange={(value) =>
                              handleSelectChange(item.id, 'avatar', value)
                            }
                          >
                            <SelectTrigger className='w-full bg-[#FCFCFD] border-none shadow-none focus:ring-0 text-sm h-auto p-0'>
                              <SelectValue
                                placeholder='Select avatar'
                                className='text-base text-[#656567] font-normal'
                              />
                            </SelectTrigger>
                            <SelectContent className='bg-white z-[9999]'>
                              {options.avatarOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className='hover:bg-[#F1F1F3] text-black focus:bg-[#F1F1F3]'
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Voice dropdown */}
                        <div className='p-4'>
                          <Select
                            defaultValue={item.voiceName}
                            value={item.voiceName}
                            onValueChange={(value) =>
                              handleSelectChange(item.id, 'voice', value)
                            }
                          >
                            <SelectTrigger className='w-full bg-[#FCFCFD] border-none shadow-none focus:ring-0 text-sm h-auto p-0'>
                              <SelectValue
                                placeholder='Select voice'
                                className='text-base text-[#656567] font-normal'
                              />
                            </SelectTrigger>
                            <SelectContent className='bg-white z-[9999]'>
                              {options.voiceOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                  className='hover:bg-[#F1F1F3] text-black focus:bg-[#F1F1F3]'
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='p-4 text-center text-[#656567]'>
                      No data found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile view - only visible on smaller than md screens */}
          <div className='md:hidden w-full'>
            <div className='max-h-[60vh] overflow-y-auto pb-1'>
              {assignments.length > 0 ? (
                assignments.map((item, index) => (
                  <MobileCard key={`mobile-${item.id}-${index}`} item={item} />
                ))
              ) : (
                <div className='p-4 text-center text-[#656567]'>
                  No data found
                </div>
              )}
            </div>
          </div>

          {/* Update button */}
          <div className='flex justify-end mt-4'>
            <Button
              className='bg-[#FFD74B] hover:bg-[#FFD74B]/90 text-black px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base rounded'
              onClick={handleUpdate}
              disabled={isPendingToGetAssignment}
            >
              {isPendingToGetAssignment ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarVoiceMaintenance;
