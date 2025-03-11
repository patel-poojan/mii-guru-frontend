import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className='w-full bg-[#FFC20D] overflow-hidden'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative py-6 sm:py-12 lg:py-20  max-w-2xl lg:max-w-7xl mx-auto'>
          <div className='lg:grid lg:grid-cols-12 lg:gap-16 items-center'>
            {/* Text Content */}
            <div className='text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left'>
              <h1 className='mt-4 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#5F5F5F] leading-tight flex flex-col gap-2 md:gap-3'>
                <span className='block'>Empowering young</span>
                <span className='block'>Minds with Smarter</span>
                <span className='block text-white'>AI capabilities</span>
              </h1>
              <div className='mt-8 sm:mt-12'>
                <div className='flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4'>
                  <Button className='w-full sm:w-auto bg-white text-[#5F5F5F] hover:bg-[#163ba5] hover:text-white px-6 sm:px-8 py-3 text-base font-medium transition-colors'>
                    Explore Courses
                  </Button>
                  <Button className='w-full sm:w-auto bg-transparent text-[#5F5F5F] border border-[#5F5F5F] hover:bg-[#163ba5] hover:text-white hover:border-transparent px-6 sm:px-8 py-3 text-base font-medium transition-colors'>
                    View Pricing
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className='mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 hidden lg:block'>
              <div className='relative w-full h-auto aspect-[4/3] sm:aspect-[3/2]'>
                <Image
                  src='/img/hero.svg'
                  alt='AI Education Illustration'
                  fill
                  priority
                  className='object-contain'
                  sizes='(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 40vw'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
