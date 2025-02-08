import React from 'react';
import Image from 'next/image';

const MissionSection = () => {
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl lg:max-w-6xl mx-auto  py-8 md:pt-16 md:pb-20'>
        <h2 className='text-center text-3xl font-bold mb-6'>
          Our <span className='text-yellow'>Mission</span>
        </h2>

        <div className='flex flex-col lg:flex-row gap-10 md:gap-12 items-start'>
          <div className='relative w-full lg:w-[55%] p-3'>
            {/* Container for image and decorative elements */}
            <div className='relative'>
              {/* Blue corner accent */}
              <div className='absolute -top-3 -left-3 w-20 sm:w-24 h-20 sm:h-24 bg-[#47B7F8] rounded-[20px] -z-10' />

              {/* Image with rounded corners */}
              <div className='relative aspect-video w-full rounded-lg overflow-hidden'>
                <Image
                  src='/img/student-learning.svg'
                  alt='Student studying at desk with laptop'
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority
                />
              </div>

              {/* Orange corner accent */}
              <div className='absolute -bottom-3 -right-3 w-32 sm:w-40 h-32 sm:h-40 bg-[#FFCCA0] rounded-[20px] -z-10' />
            </div>
          </div>

          <div className='w-full lg:w-[45%] space-y-4 my-auto'>
            <p className='text-gray-900 text-lg xl:text-2xl'>
              To empower students with personalized, AI-driven tutoring
              solutions that make learning engaging, effective, and affordable
              for all, ensuring they excel academically and build a strong
              foundation for their future.
            </p>

            <p className='text-gray-600 text-lg xl:text-2xl'>
              We aim to bridge the gap between classroom learning and individual
              needs by providing a smart, interactive AI tutor through
              cutting-edge AI technologies and adaptive models.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
