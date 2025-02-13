'use client';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  useResendEmail,
  useResetPassword,
  useVerifyToken,
} from '../utils/auth-api';
import { axiosError } from '../types/axiosTypes';
import { Loader } from '../Components/common/Loader';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { LucideBadgeAlert } from 'lucide-react';
import { passwordRegex } from '../utils/regex-collection';
import { useRouter, useSearchParams } from 'next/navigation';

// Interfaces
interface FormData {
  password: string;
  confirmPassword: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Reusable components
const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder,
  showPassword,
  toggleVisibility,
}: {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPassword: boolean;
  toggleVisibility: () => void;
}) => (
  <div className='relative'>
    <Input
      type={showPassword ? 'text' : 'password'}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='w-full h-12 px-4 rounded-md border border-[#ACACAC] focus:border-yellow focus:ring-yellow focus-visible:ring-yellow'
    />
    <button
      type='button'
      onClick={toggleVisibility}
      className='absolute right-4 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600'
    >
      {showPassword ? (
        <IoEyeOffOutline className='w-5 h-5' />
      ) : (
        <IoEyeOutline className='w-5 h-5' />
      )}
    </button>
  </div>
);

// Expired Link Component
const ExpiredLinkCard = ({
  onResend,
  email,
}: {
  onResend: (email: string) => void;
  email: string;
}) => (
  <Card className='w-full max-w-lg rounded-[36px] p-0 border-[#ACACAC]'>
    <CardContent className='p-6 sm:p-8'>
      <div className='flex flex-col items-center gap-6 w-full'>
        <div className='flex flex-col items-center gap-6 w-full'>
          <LucideBadgeAlert
            className='text-yellow text-6xl md:text-8xl'
            style={{ height: '112px', width: '112px' }}
          />
          <p className='text-3xl text-center text-black font-normal'>
            Your link has been expired
          </p>
          <p className='text-xl text-center text-black'>
            The link you clicked on has expired due to inactivity. To complete
            the action, please request a new link.
          </p>
          <span
            className='text-yellow ms-1 hover:text-yellow-500 hover:underline hover:cursor-pointer'
            onClick={() => onResend(email)}
          >
            Resend
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Validation utility
const validatePasswordForm = (formData: FormData): ValidationResult => {
  if (!formData.password) {
    return { isValid: false, message: 'Please enter your password' };
  }

  if (!passwordRegex.test(formData.password)) {
    return {
      isValid: false,
      message:
        'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character',
    };
  }

  if (!passwordRegex.test(formData.confirmPassword)) {
    return {
      isValid: false,
      message: 'Confirm password must meet the same requirements as password',
    };
  }

  if (formData.password !== formData.confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }

  return { isValid: true };
};

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
  });
  const [linkExpired, setLinkExpired] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const { mutate: onResetPassword, isPending } = useResetPassword({
    onSuccess(data) {
      toast.success(data?.message);
      router.push('/login');
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Reset password failed'
      );
    },
  });

  const { mutate: onVerifyToken, isPending: isVerifyPending } = useVerifyToken({
    onError(error: axiosError) {
      setLinkExpired(true);
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Reset password failed'
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

  useEffect(() => {
    if (token) {
      onVerifyToken({ token });
    }
  }, [token, onVerifyToken]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validation = validatePasswordForm(formData);
      if (!validation.isValid) {
        toast.warning(validation.message, {
          duration: 5000,
        });
        return;
      }

      onResetPassword({
        details: {
          newPassword: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        token,
      });
    },
    [formData, token, onResetPassword]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const togglePassword = useCallback(
    (field: 'password' | 'confirmPassword') => {
      if (field === 'password') {
        setShowPassword((prev) => !prev);
      } else {
        setShowConfirmPassword((prev) => !prev);
      }
    },
    []
  );

  const handleResendEmail = useCallback(
    (email: string) => {
      onResendEmail({ email });
    },
    [onResendEmail]
  );

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-4'>
      {(isPending || isResendPending || isVerifyPending) && <Loader />}
      {linkExpired ? (
        <ExpiredLinkCard onResend={handleResendEmail} email={email} />
      ) : (
        <Card className='w-full max-w-lg rounded-[36px] p-0 border-[#ACACAC]'>
          <CardContent className='p-6 sm:p-12'>
            <div className='flex flex-col items-center gap-6 w-full'>
              <div className='flex flex-col items-center gap-4 w-full'>
                <h1 className='text-black font-medium text-2xl md:text-[32px]'>
                  Forgot Your Password
                </h1>
              </div>
              <form
                className='w-full flex flex-col gap-4'
                onSubmit={handleSubmit}
              >
                <PasswordInput
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  showPassword={showPassword}
                  toggleVisibility={() => togglePassword('password')}
                />
                <PasswordInput
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm Password'
                  showPassword={showConfirmPassword}
                  toggleVisibility={() => togglePassword('confirmPassword')}
                />
                <Button
                  type='submit'
                  className='w-full bg-yellow py-3 hover:bg-yellow-hover transition-all duration-200 font-semibold text-lg text-white'
                >
                  Reset Password
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResetPasswordPage;
