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
}

const CompanyLogo: React.FC<CompanyLogoProps> = memo(
  ({
    className = '',
    width = 166,
    height = 35,
    alt = 'Company Logo',
    priority = true,
    onClick,
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
        className={`relative cursor-pointer ${className}`}
        onClick={handleClick}
        role='link'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      >
        <Image
          src='/img/mii-logo.svg'
          alt={alt}
          width={width}
          height={height}
          className='w-auto object-contain'
          priority={priority}
        />
      </div>
    );
  }
);

// Add display name for better debugging
CompanyLogo.displayName = 'CompanyLogo';

export default CompanyLogo;
