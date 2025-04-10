'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import CompanyLogo from '../common/CompanyLogo';
import { useRouter } from 'next/navigation';
const Header = ({
  scrollToPrice,
  scrollToMission,
  scrollToFeatures,
}: {
  scrollToPrice: () => void;
  scrollToMission: () => void;
  scrollToFeatures: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const navLinks = [
    { href: '#mission', label: 'Mission', onClick: scrollToMission },
    { href: '#features', label: 'Product Features', onClick: scrollToFeatures },
    { href: '#pricing', label: 'Pricing', onClick: scrollToPrice },
  ];

  return (
    <header className='sticky top-0 w-full bg-[#FFE186] shadow-sm supports-[backdrop-filter]:bg-[#FFE186]/60 supports-[backdrop-filter]:backdrop-blur-3xl z-50'>
      {/* <header className='sticky top-0 w-full bg-[#FFFFFF80] shadow-sm supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-3xl z-50'>
      {/* <header className='sticky top-0 w-full bg-transparent backdrop-blur-3XL supports-[backdrop-filter]:backdrop-blur-3xl z-50'> */}
      <div className='mx-auto md:px-6 lg:px-20 py-3'>
        <div className='flex justify-between items-center px-4'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <CompanyLogo className='w-[110px] md:w-[130px] h-auto' />
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden min-[900px]:flex items-center space-x-8'>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className='text-[#5F5F5F] hover:text-[#183CAC]'
                onClick={link.onClick}
              >
                {link.label}
              </a>
            ))}
            <Button
              className='bg-white px-6 py-2 border border-[#F1F1F3] font-medium rounded-sm shadow-sm hover:bg-[#163BA5] hover:text-white text-dark-blue transition-colors'
              onClick={() => router.push('/signup')}
            >
              Get Started
            </Button>
            <Button
              onClick={() => router.push('/login')}
              className='bg-[#FFC302] px-6 py-2 text-dark-blue font-medium rounded-sm hover:bg-[#163BA5] hover:text-white transition-colors'
            >
              Sign In
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className='min-[900px]:hidden'>
              <Button variant='ghost' size='icon' className='text-gray-600'>
                <Menu className='text-xl' />
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-72 p-0 [&>button]:hidden'>
              <SheetHeader className='border-b p-4 text-left'>
                <div className='flex justify-between items-center'>
                  <SheetTitle className='text-lg font-medium'>
                    Navigation Menu
                  </SheetTitle>
                  <SheetClose className='rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100'>
                    <X className='h-4 w-4' />
                    <span className='sr-only'>Close</span>
                  </SheetClose>
                </div>
              </SheetHeader>

              <nav className='flex flex-col pt-2'>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className='px-4 py-3 text-base text-black hover:text-[#183CAC] hover:bg-gray-50'
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}

                <div className='p-4 space-y-3 mt-2'>
                  <SheetClose asChild>
                    <Button
                      className='w-full bg-white border border-[#F1F1F3] font-medium rounded-lg shadow-sm hover:bg-[#163BA5] hover:text-white text-dark-blue transition-colors'
                      onClick={() => router.push('/signup')}
                    >
                      Get Started
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      onClick={() => router.push('/login')}
                      className='w-full bg-yellow text-dark-blue font-medium rounded-lg hover:bg-[#163BA5] hover:text-white transition-colors'
                    >
                      Sign In
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
