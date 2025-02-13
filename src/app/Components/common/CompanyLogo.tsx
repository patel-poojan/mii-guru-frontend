import Image from 'next/image';
import React from 'react';

interface CompanyLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({
  className = '',
  width = 166,
  height = 35,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src='/img/mii-logo.svg'
        alt='Company Logo'
        width={width}
        height={height}
        className='w-auto object-contain rounded-md'
        priority
      />
    </div>
  );
};

export default CompanyLogo;
