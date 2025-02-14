'use client';
import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { emailRegex, passwordRegex } from '../utils/regex-collection';
import { Checkbox } from '@/components/ui/checkbox';
import CompanyLogo from '../Components/common/CompanyLogo';
import { useRouter } from 'next/navigation';
import { useSignup } from '../utils/auth-api';
import { axiosError } from '../types/axiosTypes';
import { Loader } from '../Components/common/Loader';

// Separate interfaces and types
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  sendUpdates: boolean;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Form validation utility
const validateForm = (formData: FormData): ValidationResult => {
  if (!formData.email || !formData.password) {
    return { isValid: false, message: 'Please fill in all fields' };
  }

  if (!emailRegex.test(formData.email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
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

  if (!formData.agreeTerms) {
    return { isValid: false, message: 'Please agree to Terms & Conditions' };
  }

  return { isValid: true };
};

// Reusable components
const PasswordInput = ({
  name,
  value,
  onChange,
  placeholder,
  showPassword,
  togglePassword,
}: {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPassword: boolean;
  togglePassword: () => void;
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
      onClick={togglePassword}
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

const CheckboxField = ({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) => (
  <div className='flex items-center space-x-2'>
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={(checked) => onChange(checked as boolean)}
      className='h-4 w-4 border-dark-blue data-[state=checked]:bg-yellow data-[state=checked]:border-yellow'
    />
    <label
      htmlFor={id}
      className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black cursor-pointer'
    >
      {label}
    </label>
  </div>
);

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    sendUpdates: false,
  });

  const router = useRouter();

  const { mutate: onSignup, isPending } = useSignup({
    onSuccess(data) {
      router.push(`/verify?email=${formData.email}`);
      toast.success(data?.message);
    },
    onError(error: axiosError) {
      const errorMessage =
        error?.response?.data?.errors?.message ||
        error?.response?.data?.message ||
        'Signup failed';
      toast.error(errorMessage);
    },
  });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validation = validateForm(formData);
      if (!validation.isValid) {
        toast.warning(validation.message);
        return;
      }

      onSignup({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
    },
    [formData, onSignup]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleCheckboxChange = useCallback(
    (field: keyof Pick<FormData, 'agreeTerms' | 'sendUpdates'>) => {
      return (checked: boolean) => {
        setFormData((prev) => ({
          ...prev,
          [field]: checked,
        }));
      };
    },
    []
  );

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-4'>
      {isPending && <Loader />}
      <Card className='w-full max-w-md rounded-[36px] p-0 border-[#ACACAC]'>
        <CardContent className='p-6 sm:p-12'>
          <div className='flex flex-col items-center gap-6 w-full'>
            <div className='flex flex-col items-center gap-4 w-full'>
              <CompanyLogo className='w-[120px] sm:w-[140px] mb-2 md:w-[166px] h-auto' />
              <h2 className='text-3xl text-black font-medium'>
                Create your account
              </h2>
            </div>

            <form
              className='w-full flex flex-col gap-4'
              onSubmit={handleSubmit}
            >
              <Input
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter Email'
                className='w-full h-12 px-4 rounded-md border border-[#ACACAC] focus:border-yellow focus:ring-yellow focus-visible:ring-yellow'
              />

              <PasswordInput
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter Password'
                showPassword={showPassword}
                togglePassword={togglePassword}
              />

              <PasswordInput
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm Password'
                showPassword={showPassword}
                togglePassword={togglePassword}
              />

              <div className='flex flex-col gap-3'>
                <CheckboxField
                  id='agreeTerms'
                  checked={formData.agreeTerms}
                  onChange={handleCheckboxChange('agreeTerms')}
                  label='Agree Term & Condition'
                />

                <CheckboxField
                  id='sendUpdates'
                  checked={formData.sendUpdates}
                  onChange={handleCheckboxChange('sendUpdates')}
                  label='Send me updates'
                />
              </div>

              <Button
                type='submit'
                className='w-full bg-yellow py-3 hover:bg-yellow-hover transition-all duration-200 font-semibold text-lg text-white'
              >
                Sign Up
              </Button>
            </form>

            <div className='w-full'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-[#ACACAC]' />
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-black'>
                    Or Continue with
                  </span>
                </div>
              </div>

              <Button
                variant='outline'
                className='flex mt-6 items-center w-full justify-center space-x-1 border-[#F1F1F3]'
              >
                <FcGoogle className='w-6 h-6' />
                <span>Google</span>
              </Button>
            </div>

            <div className='text-center'>
              <span className='text-sm text-black'>
                Already have an account?
                <a
                  href='/login'
                  className='text-yellow hover:text-yellow-hover ms-1'
                >
                  Sign in
                </a>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
