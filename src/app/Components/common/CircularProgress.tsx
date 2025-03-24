'use client';
import React, { useState, useEffect } from 'react';

// Define types for the props
interface CircularProgressProps {
  value: number;
  gradientId: string;
  initialAnimation?: boolean;
  initialAnimationDelay?: number;
  animationDuration?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  gradientId,
  initialAnimation = true,
  initialAnimationDelay = 0,
  animationDuration = 1.5,
}) => {
  const [isAnimated, setIsAnimated] = useState(!initialAnimation);
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  // Calculate the angle for the progress arc (starting from top, going clockwise)
  const strokeDashoffset = isAnimated
    ? circumference - (value / 100) * circumference
    : circumference; // Start with empty circle

  // For percentage counter animation
  const [displayValue, setDisplayValue] = useState(
    initialAnimation ? 0 : value
  );

  // Trigger animation after component mounts
  useEffect(() => {
    if (initialAnimation) {
      const timer = setTimeout(() => {
        setIsAnimated(true);

        // Animate the counter
        let startValue = 0;
        const step = value / (animationDuration * 60); // 60fps approximation
        const counterInterval = setInterval(() => {
          startValue += step;
          if (startValue >= value) {
            setDisplayValue(value);
            clearInterval(counterInterval);
          } else {
            setDisplayValue(Math.floor(startValue));
          }
        }, 1000 / 60); // ~60fps

        return () => clearInterval(counterInterval);
      }, initialAnimationDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [initialAnimation, initialAnimationDelay, animationDuration, value]);

  return (
    <div className='relative flex items-center justify-center w-24 h-24'>
      <svg className='w-full h-full' viewBox='0 0 100 100'>
        {/* Define the gradient */}
        <defs>
          <linearGradient id={gradientId} x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#F9D949' />
            <stop offset='100%' stopColor='#FD9A11' />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle
          cx='50'
          cy='50'
          r={normalizedRadius}
          fill='transparent'
          stroke='#EEEEEE'
          strokeWidth={strokeWidth}
        />

        {/* Progress circle with gradient - starts at the top and goes clockwise */}
        <circle
          cx='50'
          cy='50'
          r={normalizedRadius}
          fill='transparent'
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          transform='rotate(-90 50 50)'
          style={{
            transition: `stroke-dashoffset ${animationDuration}s ease-in-out`,
          }}
        />
      </svg>
      {/* Centered percentage text */}
      <div className='absolute text-lg text-black font-normal'>
        {Math.round(displayValue)}%
      </div>
    </div>
  );
};

export default CircularProgress;
