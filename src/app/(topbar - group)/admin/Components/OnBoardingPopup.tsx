import React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IoMdClose } from 'react-icons/io';
import OnboardingForm from '@/app/Components/common/OnboardingForm';
const OnBoardingPopup = ({
  open,
  onClose,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  userId: string;
}) => {
  if (userId === '') return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='bg-white w-full max-w-[95vw] sm:max-w-2xl md:max-w-4xl p-0 rounded-md'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Update User Profile</DialogTitle>
          <DialogDescription id='dialog-description'>Update</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col p-3 sm:p-6 pb-4 sm:pb-8'>
          {/* Header with title and close button */}
          <div className='flex items-center justify-between mb-3 sm:mb-6'>
            <h2 className='text-base md:text-lg font-medium text-black'>
              Edit User Details
            </h2>
            <DialogClose className='h-6 w-6 flex items-center justify-center  text-gray-500 hover:bg-gray-100 border border-black rounded-full'>
              <IoMdClose size={18} className='text-black' />
            </DialogClose>
          </div>
          <div className='overflow-x-auto'>
            <div className='max-h-[60vh] overflow-y-auto'>
              {userId && <OnboardingForm userId={userId} />}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnBoardingPopup;
