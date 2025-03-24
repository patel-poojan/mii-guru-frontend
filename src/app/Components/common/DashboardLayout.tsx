import React from 'react';
import CommonHeader from './CommonHeader';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col min-h-dvh'>
      <CommonHeader />
      <div className='relative w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8 flex-1 flex flex-col'>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
