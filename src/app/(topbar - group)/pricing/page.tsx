import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const SubscriptionPage = () => {
  return (
    <div className='h-full w-full flex-1 rounded-xl bg-[#FEF7E4] border-2 border-[#F9BB1C] p-4 md:p-10'>
      <div className='flex flex-col items-center text-center mb-8'>
        {/* Timer icon replacement */}
        <div className=' mb-6 mx-auto flex items-center justify-center'>
          <Image
            src='/img/pricing.svg'
            alt='Timer icon'
            width={270}
            height={180}
          ></Image>
        </div>

        <h1 className='text-3xl md:text-4xl text-[#000000] font-semibold mb-2'>
          Your 3-Day Free Trial Has Ended
        </h1>
        <p className='text-sm md:text-base text-[#5F5F5F]'>
          Upgrade now to continue accessing the platform and enjoy uninterrupted
          learning with our exclusive plan.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Pricing Card */}
        <Card className='bg-[#FFC20D] border-0  overflow-hidden  '>
          <CardContent className='flex flex-col items-center gap-4 h-full justify-between p-6'>
            <div className='flex flex-col items-center gap-6'>
              <h2 className='text-2xl font-medium text-[#262626] '>{`Learner's plan`}</h2>
              <div className='mb-6'>
                <div className='text-5xl font-bold text-black text-center'>
                  ₹779
                </div>
                <div className='text-lg  text-black text-center'>Per Month</div>
              </div>
            </div>
            <p className='text-lg text-[#262626] mb-6 text-center'>
              Lorem ipsum dolor sit amet consectetur. Sapien dui quam
            </p>
            <Button className='w-full bg-white text-dark-blue p-4 md:p-6 text-lg hover:bg-gray-100'>
              Continue
            </Button>
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className='bg-[#FFFFFF] border border-[#F1F1F3]'>
          <CardHeader className='flex flex-col items-center gap-4 pb-8'>
            {/* Student icon replacement */}
            <div className='flex items-center justify-center'>
              <Image
                src='/img/pricing-template.svg'
                alt='Timer icon'
                width={161}
                height={111}
              ></Image>
            </div>
            <h2 className='text-2xl font-semibold text-black '>
              Available Features
            </h2>
          </CardHeader>
          <CardContent>
            <ul className='space-y-1'>
              {[
                'Unlimited access to all courses.',
                'Unlimited course materials and resources.',
                'Priority support from instructors.',
                'Access to exclusive Pro Plan community forums.',
                'Early access to new courses and updates.',
              ].map((feature, index) => (
                <li key={index} className='flex items-start gap-2'>
                  <span className='text-[#5F5F5F] font-bold'>•</span>
                  <span className='text-sm text-[#5F5F5F]'>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
