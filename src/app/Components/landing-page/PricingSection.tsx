'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Feature {
  text: string;
  enabled: boolean;
}

interface Plan {
  name: string;
  price: string;
  description?: string;
  features: Feature[];
  buttonText: string;
  showBadge?: boolean;
}

interface PricingCardProps {
  plan: Plan;
}

const PricingSection = () => {
  const router = useRouter();
  const plans = [
    {
      name: 'Try it FREE for 3 days',
      price: '0',
      description:
        'Get full access to our AI-powered tutoring platform with interactive lessons, personalized learning, and real-time voice support. No commitment, just smarter learning made simple.',
      features: [],
      buttonText: 'Start Free Trial',
      showBadge: false,
    },
    {
      name: '₹799',
      price: '799',
      subtext: '/month',
      features: [
        { text: 'Unlimited access to all courses.', enabled: true },
        { text: 'Unlimited course materials and resources.', enabled: true },
        { text: 'Periodic progress reports and insights.', enabled: true },
        {
          text: 'Access to exclusive Pro Plan community forums.',
          enabled: true,
        },
        { text: 'Early access to new courses and updates.', enabled: true },
      ],
      buttonText: 'Continue Learning',
      showBadge: true,
    },
  ];

  const FreeTrialCard: React.FC<PricingCardProps> = ({ plan }) => (
    <div className='w-full mx-auto'>
      <Card
        className={`overflow-hidden rounded-xl h-full border-2 border-[#F9BB1C] bg-[#f9bb1c1f]`}
      >
        {/* Content */}
        <div className='p-4 sm:p-6 flex flex-col justify-between h-full'>
          {/* Heading */}
          <h3 className='text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold text-[#212121] mb-6 md:mb-8 lg:mb-10'>
            {plan.name}
          </h3>

          <div className='mb-6'>
            <p className='text-[#4C4C4D] text-sm sm:text-base'>
              {plan.description ?? ''}
            </p>
            <p className='text-[#4C4C4D] text-sm sm:text-base mt-4'>
              Try it now and see the difference!
            </p>
          </div>

          {/* Button */}
          <Button
            className='w-full px-4 sm:px-6 rounded-md py-3 sm:py-4 text-sm sm:text-base font-medium bg-yellow text-dark-blue hover:bg-[#163ba5] hover:text-white transition-colors mt-auto'
            onClick={() => router.push('/signup')}
          >
            {plan.buttonText}
          </Button>
        </div>
      </Card>
    </div>
  );

  const PricingCard: React.FC<PricingCardProps> = ({ plan }) => (
    <div className='w-full mx-auto'>
      <Card
        className={`overflow-hidden rounded-xl h-full border-2 border-[#F9BB1C] bg-[#FCFCFD] relative`}
      >
        {plan.showBadge && (
          <div className='absolute -top-3 -left-6 md:-left-9 lg:-left-6 z-10 transform scale-75 sm:scale-90 md:scale-90 lg:scale-100 origin-top-left'>
            <Image
              src='/img/offer-banner.svg'
              alt='offer'
              width={206}
              height={140}
              style={{ height: '140px', width: '206px' }}
              priority
            />
          </div>
        )}
        {/* Content */}
        <div className='p-4 sm:p-6'>
          {/* Heading - adjusted md size specifically */}
          <h3 className='text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-semibold text-[#212121] mb-4 md:mb-5 lg:mb-7 text-center'>
            {plan.name}
            <span className='text-dark-blue text-xs sm:text-sm md:text-sm lg:text-base font-medium'>
              /month
            </span>
          </h3>

          <div className='px-2 sm:px-3 md:px-3 lg:px-4'>
            <div className='mb-4'>
              <h4 className='font-medium mb-3 md:mb-3 lg:mb-4 text-black text-base md:text-base lg:text-lg text-center'>
                Available Features
              </h4>
              <ul className='space-y-2 md:space-y-2 lg:space-y-3'>
                {plan.features.map((feature, index) => (
                  <li key={index} className='flex items-start gap-2'>
                    <div className='p-1 rounded bg-[#FFF4E5]'>
                      <Check className='h-3 w-3 md:h-3 md:w-3 lg:h-4 lg:w-4 text-[#262626] shrink-0' />
                    </div>
                    <span className='text-[#4C4C4D] text-xs sm:text-sm'>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Button */}
          <Button
            onClick={() => router.push('/signup')}
            className='w-full px-4 sm:px-6 rounded-md py-3 md:py-3 lg:py-4 text-sm md:text-sm lg:text-base font-medium bg-yellow text-dark-blue hover:bg-[#163ba5] hover:text-white transition-colors mt-auto'
          >
            {plan.buttonText}
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className='container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:pt-16 lg:pb-20'>
      <div className='max-w-5xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-[#5F5F5F]'>
          Our <span className='text-[#FFC302]'>Pricing</span>
        </h2>

        {/* Adjusted the gap specifically between md and lg */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8 mx-auto'>
          <FreeTrialCard plan={plans[0]} />
          <PricingCard plan={plans[1]} />
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
