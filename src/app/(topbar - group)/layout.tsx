import React, { ReactNode } from 'react';
import DashboardLayout from '../Components/common/DashboardLayout';

const Layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
