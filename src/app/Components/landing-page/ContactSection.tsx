'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import { emailRegex } from '@/app/utils/regex-collection';
import { useSupport } from '@/app/utils/api/support-api';
import { axiosError } from '../..//types/axiosTypes';
import { Loader } from '../common/Loader';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const { mutate: onSupport, isPending } = useSupport({
    onSuccess() {
      toast.success("Thanks for reaching out! We'll get back to you soon");
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Request failed'
      );
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name && !formData.email && !formData.message) {
      toast.warning('Oops! We need all fields filled to get in touch with you');
      return;
    }

    if (!formData.name) {
      toast.warning('Could you share your name with us?');
      return;
    }

    if (!formData.email) {
      toast.warning("We'll need your email to get back to you");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      toast.warning(
        "The email address doesn't look quite right. Mind checking it?"
      );
      return;
    }

    if (!formData.message) {
      toast.warning('What would you like to tell us? Your message is missing');
      return;
    }

    onSupport({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
  };

  const handleChange = (e: InputChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className='w-full bg-[#FFC20D] py-8 sm:py-12 lg:py-16'>
      {isPending && <Loader />}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5F5F5F] mb-6'>
            Contact <span className='text-white'>Us</span>
          </h2>

          <div className='bg-white rounded-xl p-6 sm:p-10'>
            <div className='flex  lg:flex-row flex-col-reverse gap-0 sm:gap-8 lg:gap-16'>
              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className='w-full lg:w-1/2 space-y-6'
              >
                <div className='space-y-2'>
                  <label className='font-medium text-black'>Name</label>
                  <Input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Enter First Name'
                    className='w-full p-3 rounded-md border border-[#F1F1F3] bg-[#FCFCFD] focus:border-yellow focus:ring-yellow focus-visible:ring-yellow text-sm placeholder:!text-sm'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='font-medium text-black'>Email</label>
                  <Input
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter Your Email'
                    className='w-full p-3 rounded-md border border-[#F1F1F3] bg-[#FCFCFD] focus:border-yellow focus:ring-yellow focus-visible:ring-yellow text-sm placeholder:!text-sm'
                  />
                </div>

                <div className='space-y-2'>
                  <label className='font-medium text-black'>Message</label>
                  <Textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='Enter Your Message Here...'
                    className='w-full min-h-[120px] p-3 rounded-md border border-[#F1F1F3] bg-[#FCFCFD] focus:border-yellow focus:ring-yellow focus-visible:ring-yellow text-sm placeholder:!text-sm'
                  />
                </div>

                <Button
                  type='submit'
                  className='w-full  px-6 rounded-md sm:px-8 py-4 text-base font-medium bg-[#FFC302] text-[#5F5F5F] hover:bg-[#163ba5] hover:text-white transition-colors'
                >
                  Send Your Message
                </Button>
              </form>

              {/* Illustration */}
              <div className='w-full lg:w-1/2 flex items-center justify-center'>
                <div className='relative w-full h-[400px]'>
                  <Image
                    src='/img/contact-illustration.svg'
                    alt='Contact illustration'
                    fill
                    className='object-contain'
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
