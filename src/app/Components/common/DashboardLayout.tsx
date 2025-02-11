import React from 'react';
import CommonHeader from './CommonHeader';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CommonHeader />
      <div className='w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8'>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
