import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const LearningHeightsSection = () => {
  const features = [
    {
      number: '01',
      title: 'Adaptive Learning',
      description:
        'Start by identifying the core features of the product. These are the functions.',
      color: '#3AC6F2',
    },
    {
      number: '02',
      title: 'Interactive Content',
      description:
        'Start by identifying the core features of the product. These are the functions.',
      color: '#3189EF',
    },
    {
      number: '03',
      title: 'Progress Tracking',
      description:
        'Start by identifying the core features of the product. These are the functions.',
      color: '#68F146',
    },
    {
      number: '04',
      title: 'Gamification',
      description:
        'Start by identifying the core features of the product. These are the functions.',
      color: '#545AE7',
    },
  ];

  return (
    <div className='bg-[#FFC20D] py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-12'>
      <div className='max-w-6xl mx-auto'>
        {/* Heading */}
        <div className='mb-4 sm:mb-6'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-left relative'>
            <span className='relative inline-block'>
              <span className='absolute -left-1 sm:-left-[5px] -top-2 sm:-top-[15px] w-12 sm:w-[66px] h-12 sm:h-[66px] bg-[#5F5F5F] rounded-full'></span>
              <span className='relative text-white'>Taking </span>
            </span>
            <span className='text-white'>Your Learnings </span>
            <span className='text-white block sm:inline'>to New Heights</span>
          </h2>
          <p className='text-[#5F5F5F] text-sm sm:text-base font-medium text-left max-w-3xl mt-2 sm:mt-3'>
            {`Understanding a product's capabilities requires a comprehensive
            assessment of its features, functionality, flexibility &
            integration.`}
          </p>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-10'>
          {features.map((feature, index) => (
            <div key={index} className='relative group'>
              {/* Top-left border */}
              <div
                className='absolute rounded-[20px] -top-[10px] -left-[10px] w-[138px] h-[138px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10'
                style={{
                  background: `
                    linear-gradient(to right, ${feature.color}, ${feature.color}) left top no-repeat,
                    linear-gradient(to bottom, ${feature.color}, ${feature.color}) left top no-repeat
                  `,
                }}
              />

              {/* Bottom-right border */}
              <div
                className='absolute rounded-[20px] -bottom-[10px] -right-[10px] w-[138px] h-[138px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10'
                style={{
                  background: `
                    linear-gradient(to left, #5F5F5F, #5F5F5F) bottom right no-repeat,
                    linear-gradient(to top, #5F5F5F, #5F5F5F) bottom right no-repeat
                  `,
                }}
              />

              <Card
                style={{
                  boxShadow: '0px 10px 60px 0px rgba(38, 45, 118, 0.08)',
                  position: 'relative',
                  zIndex: 20,
                }}
                className='bg-white border-none rounded-[20px]'
              >
                <CardContent className='p-6 sm:p-8 md:p-10 flex flex-col gap-6 sm:gap-8 md:gap-10'>
                  {/* Number in top-right */}
                  <span
                    style={{ color: feature.color }}
                    className='text-end text-4xl sm:text-5xl md:text-6xl font-bold'
                  >
                    {feature.number}
                  </span>

                  {/* Content */}
                  <div>
                    <h3 className='text-lg sm:text-xl font-semibold text-[#5F5F5F]'>
                      {feature.title}
                    </h3>
                    <p className='text-[#5F5F5F] text-sm sm:text-base mt-1'>
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHeightsSection;
