'use client';
import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { emailRegex } from '../utils/regex-collection';
import { useForgetPassword, useResendEmail } from '../utils/auth-api';
import { axiosError } from '../types/axiosTypes';
import { Loader } from '../Components/common/Loader';
import EmailSucessCard from '../Components/common/EmailSucessCard';

// Interfaces and Types
interface FormData {
  email: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

const ResetForm = ({
  email,
  onChange,
  onSubmit,
}: {
  email: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => (
  <Card className='w-full max-w-lg rounded-[36px] p-0 border-[#ACACAC]'>
    <CardContent className='p-6 sm:p-12'>
      <div className='flex flex-col items-center gap-6 w-full'>
        <div className='flex flex-col items-center gap-4 w-full'>
          <h1 className='text-black font-medium text-2xl md:text-[32px]'>
            Forgot Your Password ?
          </h1>
          <p className='text-gray-600 text-base md:text-lg text-center'>
            {`  Don't worry! Just enter your email address below, and we'll send you
            a link to reset your password.`}
          </p>
        </div>
        <form className='w-full flex flex-col gap-4' onSubmit={onSubmit}>
          <Input
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Enter Email'
            className='w-full h-12 px-4 rounded-md border border-[#ACACAC] focus:border-yellow focus:ring-yellow focus-visible:ring-yellow'
          />
          <Button
            type='submit'
            className='w-full bg-yellow py-3 hover:bg-yellow-hover transition-all duration-200 font-semibold text-lg text-white'
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </CardContent>
  </Card>
);

// Validation utility
const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Please enter your email' };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

const ForgetPasswordPage = () => {
  const [formData, setFormData] = useState<FormData>({ email: '' });
  const [sentMail, setSentMail] = useState(false);

  const { mutate: onForgetPassword, isPending } = useForgetPassword({
    onSuccess(data) {
      setSentMail(true);
      toast.success(data?.message);
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Request failed'
      );
    },
  });

  const { mutate: onResendEmail, isPending: isResendPending } = useResendEmail({
    onSuccess(data) {
      toast.success(data?.message);
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Resend email request failed'
      );
    },
  });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validation = validateEmail(formData.email);
      if (!validation.isValid) {
        toast.warning(validation.message);
        return;
      }

      onForgetPassword({ email: formData.email });
    },
    [formData.email, onForgetPassword]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleResend = useCallback(
    (email: string) => {
      onResendEmail({ email });
    },
    [onResendEmail]
  );

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-4'>
      {(isPending || isResendPending) && <Loader />}

      {sentMail && formData.email ? (
        <EmailSucessCard email={formData.email} onResend={handleResend} />
      ) : (
        <ResetForm
          email={formData.email}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ForgetPasswordPage;
