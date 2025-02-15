'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLogout } from '@/app/utils/api/auth-api';
import { Loader } from './Loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CommonHeader = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const navLinks = [
    { href: '#Dashboard', label: 'Dashboard' },
    { href: '#Settings', label: 'Settings' },
  ];
  const { mutate: onLogout, isPending } = useLogout({
    onSuccess(data) {
      router.push('/');
      toast.success(data?.message);
    },
  });
  const logoutHandler = () => {
    onLogout();
  };
  return (
    <header
      className='sticky top-0 w-full bg-[#ffffff80] shadow-sm supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-3xl z-50'
      style={{ boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.08)' }}
    >
      {isPending && <Loader />}
      <div className='mx-auto md:px-6 lg:px-20 py-3'>
        <div className='flex justify-between items-center  px-4'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <CompanyLogo className='w-[120px] sm:w-[140px] md:w-[166px] h-auto' />
          </div>

          <div className='flex items-center'>
            {/* Desktop Navigation and Profile */}
            <div className='hidden md:flex items-center space-x-8'>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className='text-black hover:text-[#183CAC]'
                >
                  {link.label}
                </a>
              ))}
              <Popover>
                <PopoverTrigger asChild>
                  <Button className='h-10 w-10 rounded-full bg-yellow p-0  hover:bg-yellow'>
                    <span className='font-medium text-black'>UN</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-48 p-2' align='end'>
                  <div className='flex flex-col gap-2'>
                    <div className='px-2 py-1.5'>
                      <p className='text-sm font-medium text-gray-900'>
                        User Name
                      </p>
                      <p className='text-xs text-gray-500'>user@email.com</p>
                    </div>
                    <div className='px-2'>
                      <Button
                        variant='outline'
                        className='w-full justify-center'
                        onClick={() => logoutHandler()}
                      >
                        Sign out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className='md:hidden'>
                <Button variant='ghost' size='icon' className='text-gray-600'>
                  <Menu className='text-xl' />
                  <span className='sr-only'>Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-72 p-0 [&>button]:hidden'>
                <SheetHeader className='px-4 py-4 border-b border-gray-100'>
                  <div className='flex justify-between items-center'>
                    <SheetTitle className='text-lg font-medium text-gray-900 sr-only'>
                      Menu
                    </SheetTitle>
                    <CompanyLogo className='w-[120px] sm:w-[140px] md:w-[166px] h-auto' />
                    <SheetClose className='rounded-full p-1 hover:bg-gray-100 transition-colors'>
                      <X className='h-5 w-5 text-gray-500' />
                      <span className='sr-only'>Close menu</span>
                    </SheetClose>
                  </div>
                </SheetHeader>

                {/* Profile Section */}
                <div className='p-4 border-b border-gray-100'>
                  <div className='flex items-center gap-3'>
                    <div className='h-12 w-12 bg-yellow rounded-full flex items-center justify-center text-lg font-medium text-black'>
                      UN
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-base font-medium text-gray-900'>
                        User Name
                      </span>
                      <span className='text-sm text-gray-500'>
                        user@email.com
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className='py-2' aria-label='Main navigation'>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className='flex px-4 py-3 text-base text-gray-700 hover:bg-gray-50 transition-colors'
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                {/* Footer Actions */}
                <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100'>
                  <SheetClose asChild>
                    <a
                      href='#logout'
                      onClick={logoutHandler}
                      className='flex items-center justify-center w-full  text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors'
                    >
                      Sign Out
                    </a>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CommonHeader;
