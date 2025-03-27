'use client';
import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { emailRegex } from '../utils/regex-collection';
import CompanyLogo from '../Components/common/CompanyLogo';
import { useLogin } from '../utils/api/auth-api';
import { axiosError } from '../types/axiosTypes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Loader } from '../Components/common/Loader';
import GoogleButton from '../Components/common/GoogleButton';
import { storeProfileImage } from '../utils/storeProfileImage';

// Interfaces and Types
interface FormData {
  email: string;
  password: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

// Reusable Components
const PasswordInput = ({
  value,
  onChange,
  showPassword,
  toggleVisibility,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleVisibility: () => void;
}) => (
  <div className='relative'>
    <Input
      type={showPassword ? 'text' : 'password'}
      name='password'
      value={value}
      onChange={onChange}
      placeholder='Enter Password'
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

// Validation utility
const validateLoginForm = (formData: FormData): ValidationResult => {
  if (!formData.email && !formData.password) {
    return { isValid: false, message: 'Please fill in all fields' };
  }

  if (!formData.email) {
    return { isValid: false, message: 'Please enter your email' };
  }

  if (!formData.password) {
    return { isValid: false, message: 'Please enter your password' };
  }

  if (!emailRegex.test(formData.email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const router = useRouter();

  const { mutate: onLogin, isPending } = useLogin({
    onSuccess(data) {
      const token = data?.data?.access_token;
      if (token) {
        Cookies.set('authToken', token, {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        const role = data?.data?.user?.roles;
        Cookies.set('role', JSON.stringify(role), {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        const userInfo = data?.data?.user?.tracking;
        Cookies.set('userInfo', JSON.stringify(userInfo), {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        const photo = data?.data?.user?.photo;
        // Cookies.set('photo', JSON.stringify(photo), {
        //   path: '/',
        //   sameSite: 'Lax',
        //   secure: true,
        // });
        storeProfileImage(photo);
        setTimeout(() => {
          router.push('/termsandconditon');
        }, 200);
      }
      toast.success(data?.message);
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Login failed'
      );
    },
  });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validation = validateLoginForm(formData);
      if (!validation.isValid) {
        toast.warning(validation.message);
        return;
      }

      onLogin({
        username: formData.email,
        password: formData.password,
      });
    },
    [formData, onLogin]
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

  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-4'>
      {isPending && <Loader />}
      <Card className='w-full max-w-md rounded-[36px] p-0 border-[#ACACAC]'>
        <CardContent className='p-6 sm:p-12'>
          <div className='flex flex-col items-center gap-6 w-full'>
            <div className='flex flex-col items-center gap-4 w-full'>
              <CompanyLogo className='w-[120px] sm:w-[135px] mb-1  h-auto mx-auto flex justify-center' />
              <h2 className='text-3xl text-black font-medium'>Welcome back!</h2>
              <p className='text-lg text-[#636363]'>
                Login to your account below.
              </p>
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
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                toggleVisibility={togglePassword}
              />

              <div className='flex justify-end'>
                <a
                  href='/forgetpassword'
                  className='text-sm text-dark-blue cursor-pointer'
                >
                  Forgot Password?
                </a>
              </div>

              <Button
                type='submit'
                className='w-full bg-yellow py-3 hover:bg-[#E5C832] transition-all duration-200 font-semibold text-base text-white'
              >
                Log In
              </Button>
            </form>

            <div className='w-full'>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-[#ACACAC]'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-black'>
                    Or Continue with
                  </span>
                </div>
              </div>
              <GoogleButton />
            </div>

            <div className='text-center'>
              <span className='text-sm text-black'>
                {`Don't have an account?`}
                <a
                  href='/signup'
                  className='text-yellow hover:text-yellow-hover ms-1'
                >
                  Sign up
                </a>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
