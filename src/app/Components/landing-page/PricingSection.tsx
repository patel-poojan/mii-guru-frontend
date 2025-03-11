import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface Feature {
  text: string;
  enabled: boolean;
}

interface Plan {
  name: string;
  price: string;
  features: Feature[];
  buttonText: string;
}

interface PricingCardProps {
  plan: Plan;
}

const PricingSection = () => {
  const plans = [
    {
      name: 'Trial Plan',
      price: '0',
      features: [
        { text: 'Access to selected free courses.', enabled: true },
        { text: 'Limited course materials and resources.', enabled: true },
        { text: 'Basic community support.', enabled: true },
        {
          text: 'Access to exclusive Pro Plan community forums.',
          enabled: false,
        },
        { text: 'Early access to new courses and updates.', enabled: false },
      ],
      buttonText: 'Start Learning',
    },
    {
      name: "Learner's plan",
      price: '779',
      features: [
        { text: 'Unlimited access to all courses.', enabled: true },
        { text: 'Unlimited course materials and resources.', enabled: true },
        { text: 'Priority support from instructors.', enabled: true },
        {
          text: 'Access to exclusive Pro Plan community forums.',
          enabled: true,
        },
        { text: 'Early access to new courses and updates.', enabled: true },
      ],
      buttonText: 'Continue Learning',
    },
  ];

  const PricingCard: React.FC<PricingCardProps> = ({ plan }) => (
    <div className='w-full  mx-auto '>
      <Card
        className={`overflow-hidden p-5 rounded-xl ${
          plan.name === "Learner's plan"
            ? 'border-2 border-yellow  bg-[#f9bb1c1f]'
            : 'border border-[#F1F1F3]  bg-[#FCFCFD]'
        }`}
      >
        {/* Header */}
        <div
          className={`py-2 px-4 text-center ${
            plan.name === 'Trial Plan' ? 'bg-[#FFF3E4]' : 'bg-[#FFFFFF]'
          }`}
        >
          <h3 className='text-lg font-medium text-[#262626]'>{plan.name}</h3>
        </div>

        {/* Price */}
        <div className='px-6 py-8  text-center'>
          <div className='flex items-baseline justify-center'>
            <span className='text-4xl font-bold text-black'>₹</span>
            <span className='text-4xl font-bold text-black'>{plan.price}</span>
            <span className='text-dark-blue ml-1'>/month</span>
          </div>
        </div>

        {/* Features */}
        <div className={` border border-[#F1F1F3] rounded-xl bg-white`}>
          <div className='px-6 pt-6 pb-8'>
            <h4 className='font-medium mb-6 text-black text-2xl text-center'>
              Available Features
            </h4>
            <ul className='space-y-3 '>
              {plan.features.map((feature, index) => (
                <li key={index} className='flex items-start gap-2'>
                  <div
                    className={`p-1 rounded ${
                      feature.enabled
                        ? 'bg-[#FFF4E5]'
                        : 'bg-transparent border border-[#F1F1F3]'
                    }`}
                  >
                    {feature.enabled ? (
                      <Check className='h-4 w-4 text-[#262626] shrink-0' />
                    ) : (
                      <X className='h-4 w-4 text-[#262626] shrink-0' />
                    )}
                  </div>
                  <span className={` text-[#4C4C4D] text-sm`}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <Button className='w-full  px-6 rounded-b-xl sm:px-8 py-5 text-base font-medium bg-[#FFC302] text-[#5F5F5F] hover:bg-[#163ba5] hover:text-white transition-colors'>
            {plan.buttonText}
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className='container mx-auto px-4 py-8 md:pt-16 md:pb-20'>
      <div className='max-w-5xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-6 text-[#5F5F5F]'>
          Our <span className='text-[#FFC302]'>Pricing</span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8  mx-auto'>
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
