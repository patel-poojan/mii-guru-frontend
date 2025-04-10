import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';
import CompanyLogo from '../common/CompanyLogo';

const Footer = () => {
  return (
    <footer className='w-full bg-[#F5F5F5] text-[#212121] py-8 md:py-16'>
      <div className='container mx-auto px-4'>
        <div className='mb-6 lg:mb-0'>
          <CompanyLogo className='w-[120px] sm:w-[140px] md:w-[166px] h-auto' />
        </div>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10'>
          {/* Navigation Links */}
          <nav className='flex flex-col lg:flex-row gap-4 lg:gap-7 mb-6 lg:mb-0 text-base text-[#212121]'>
            <Link href='/terms' className='hover:text-yellow transition-colors'>
              Terms of service
            </Link>
            <Link
              href='/privacy'
              className='hover:text-yellow transition-colors'
            >
              Privacy Policy
            </Link>
          </nav>

          {/* Newsletter */}
          <div className='w-full lg:w-auto'>
            <p className=' mb-2 text-[#212121]'>Get the fresh news from us</p>
            <div className='flex gap-2'>
              <Input
                type='email'
                placeholder='Enter your Email'
                className='rounded text-black lg:w-80 border-[#212121] bg-[#FCFCFD] focus:border-yellow focus:ring-yellow focus-visible:ring-yellow'
              />
              <Button className='bg-[#FFC302] text-[#5F5F5F] rounded hover:bg-yellow/90  transition-colors whitespace-nowrap'>
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex flex-col lg:flex-row justify-between items-center pt-10 border-t border-[#212121]'>
          <div>
            <p className='text-sm opacity-80 mb-4 lg:mb-0'>
              Copyright © 2025 miiiGuru, All rights reserved.
            </p>

            <p className='text-sm opacity-80 mb-4 lg:mb-0'>
              A product of TechMii Innovations
            </p>
          </div>

          {/* Social Icons */}
          <div className='flex gap-4'>
            <Link
              href='#'
              className='w-10 h-10 rounded-full border border-[#212121] flex items-center justify-center hover:bg-white/10 transition-colors'
            >
              <FaFacebookF size={18} />
            </Link>
            <Link
              href='#'
              className='w-10 h-10 rounded-full border border-[#212121] flex items-center justify-center hover:bg-white/10 transition-colors'
            >
              <FaInstagram size={18} />
            </Link>
            <Link
              href='#'
              className='w-10 h-10 rounded-full border border-[#212121] flex items-center justify-center hover:bg-white/10 transition-colors'
            >
              <FaTwitter size={18} />
            </Link>
            <Link
              href='#'
              className='w-10 h-10 rounded-full border border-[#212121] flex items-center justify-center hover:bg-white/10 transition-colors'
            >
              <FaLinkedinIn size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
