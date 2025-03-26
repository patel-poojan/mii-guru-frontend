'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';

const ProfileIcon = ({
  h = 10, // default height
  w = 10, // default width
  className = '',
}: {
  h?: number;
  w?: number;
  className?: string;
}) => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [isClient, setIsClient] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    setIsClient(true);
    const info = Cookies.get('userInfo');

    try {
      if (info) {
        setUserInfo(JSON.parse(info));
      }

      // Get photo from localStorage instead of cookies
      if (typeof window !== 'undefined') {
        const storedPhoto = localStorage.getItem('profilePhoto');
        if (storedPhoto) {
          setProfileImage(storedPhoto);
        }
      }
    } catch (error) {
      console.error('Error parsing data:', error);
    }
  }, []);

  // Calculate dynamic classes based on props
  const sizeClasses = `h-${h} w-${w}`;

  return (
    <div
      className={`${sizeClasses} ${className} bg-yellow rounded-full flex items-center justify-center text-lg font-medium text-black capitalize overflow-hidden`}
    >
      {profileImage ? (
        <div className='relative h-full w-full'>
          <Image
            src={profileImage}
            alt='Profile'
            fill
            sizes='100%'
            priority
            className='object-cover'
          />
        </div>
      ) : (
        (isClient && userInfo?.username?.charAt(0)) ?? 'U'
      )}
    </div>
  );
};

export default ProfileIcon;
