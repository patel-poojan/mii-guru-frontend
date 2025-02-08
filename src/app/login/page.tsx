'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { toast } from 'sonner';
import { emailRegex } from '../utils/regex-collection';
interface FormData {
  email: string;
  password: string;
}

// Add type for input change event
type InputChangeEvent = ChangeEvent<HTMLInputElement>;
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if fields are empty
    if (!formData.email && !formData.password) {
      toast.warning('Please fill in all fields');
      return;
    }

    // Validate email
    if (!formData.email) {
      toast.warning('Please enter your email');
      return;
    }

    // Validate password
    if (!formData.password) {
      toast.warning('Please enter your password');
      return;
    }

    // Basic email validation
    if (!emailRegex.test(formData.email)) {
      toast.warning('Please enter a valid email address');
      return;
    }

    // If all validations pass
    toast.success('Login successful!');
    // Add your login logic here
  };

  const handleChange = (e: InputChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-white p-4'>
      <Card className='w-full max-w-md rounded-[36px] p-0 border-[#ACACAC]'>
        <CardContent className='p-10 sm:p-12'>
          {/* Logo and Welcome Text */}
          <div className='flex flex-col items-center gap-6 w-full '>
            <div className='flex flex-col items-center gap-4 w-full '>
              <div className='bg-yellow-400 p-2 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-white'
                >
                  <path d='M22 10v6M2 10l10-5 10 5-10 5z' />
                  <path d='M6 12v5c3 3 9 3 12 0v-5' />
                </svg>
              </div>
              <h2 className='text-3xl text-black font-medium'>Welcome back!</h2>
              <p className='text-lg  text-[#636363] '>
                Login to your account below.
              </p>
            </div>
            {/* Login Form */}
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
              <div className='relative'>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  className='w-full h-12 px-4 rounded-md border border-[#ACACAC] focus:border-yellow focus:ring-yellow focus-visible:ring-yellow'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600'
                >
                  {showPassword ? (
                    <IoEyeOffOutline className='w-5 h-5' />
                  ) : (
                    <IoEyeOutline className='w-5 h-5' />
                  )}
                </button>
              </div>
              <div className='flex justify-end'>
                <a href='#' className='text-sm text-dark-blue'>
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

            {/* Social Login */}
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
              <Button
                variant='outline'
                className='flex mt-6 items-center w-full justify-center space-x-1 border-[#F1F1F3]'
              >
                <FcGoogle className='w-6 h-6' />
                <span>Google</span>
              </Button>
            </div>

            {/* Sign Up Link */}
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
