'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, memo } from 'react';

interface CompanyLogoProps {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
  priority?: boolean;
  onClick?: () => void;
  isLandingPage?: boolean;
  mobileSizes?: {
    width: number;
    height: number;
  };
}

const CompanyLogo: React.FC<CompanyLogoProps> = memo(
  ({
    className = '',
    width = 173,
    height = 73,
    alt = 'Company Logo',
    priority = true,
    onClick,
    mobileSizes = { width: 120, height: 50 },
  }) => {
    const router = useRouter();

    const handleClick = useCallback(() => {
      if (onClick) {
        onClick();
        return;
      }
      router.push('/');
    }, [onClick, router]);

    return (
      <div
        className={`relative  cursor-pointer ${className}`}
        onClick={handleClick}
        role='link'
        aria-label={`${alt} - Click to go to home page`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        title='Go to home page'
      >
        <div className='hidden sm:block'>
          <Image
            src='/img/mii-logo.svg'
            alt={alt}
            width={width}
            height={height}
            className='w-auto object-contain'
            priority={priority}
          />
        </div>
        <div className='block sm:hidden'>
          <Image
            src='/img/mii-logo.svg'
            alt={alt}
            width={mobileSizes.width}
            height={mobileSizes.height}
            className='w-auto object-contain'
            priority={priority}
          />
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
CompanyLogo.displayName = 'CompanyLogo';

export default CompanyLogo;
