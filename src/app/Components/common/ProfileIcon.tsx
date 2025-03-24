'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const ProfileIcon = ({
  h,
  w,
  className,
}: {
  h: number;
  w: number;
  className?: string;
}) => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const info = Cookies.get('userInfo');
    try {
      if (info) {
        setUserInfo(JSON.parse(info));
      }
    } catch (error) {
      console.error('Error parsing userInfo from cookie:', error);
    }
  }, []);
  return (
    <div
      className={`h-${h} w-${w} ${className}  bg-yellow rounded-full flex items-center  justify-center text-lg font-medium text-black`}
    >
      {(isClient && userInfo?.username?.charAt(0)) ?? 'U'}
    </div>
  );
};

export default ProfileIcon;
