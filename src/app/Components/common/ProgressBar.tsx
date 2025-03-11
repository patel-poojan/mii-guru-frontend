// 'use client';
// import React, { useEffect, useState, useRef } from 'react';

// interface ProgressBarProps {
//   progress: number;
//   duration?: number;
//   showText?: boolean;
//   height?: string;
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({
//   progress,
//   duration = 1500,
//   showText = true,
//   height = 'h-5',
// }) => {
//   const [animatedProgress, setAnimatedProgress] = useState(0);
//   const [isFirstRender, setIsFirstRender] = useState(true);
//   const animationRef = useRef<number | null>(null);
//   const prevProgressRef = useRef(progress);

//   // Animation function with improved easing
//   const animateProgress = (
//     startValue: number,
//     endValue: number,
//     startTime: number,
//     duration: number,
//     timestamp: number
//   ) => {
//     const elapsed = timestamp - startTime;
//     const progressRatio = Math.min(elapsed / duration, 1);

//     // Cubic ease-out for smoother deceleration
//     const easedProgress = 1 - Math.pow(1 - progressRatio, 3);
//     const currentValue = startValue + (endValue - startValue) * easedProgress;

//     setAnimatedProgress(currentValue);

//     if (progressRatio < 1) {
//       animationRef.current = requestAnimationFrame((newTimestamp) =>
//         animateProgress(startValue, endValue, startTime, duration, newTimestamp)
//       );
//     } else {
//       prevProgressRef.current = endValue;
//     }
//   };

//   // Handle progress changes including first render
//   useEffect(() => {
//     // Special handling for first render
//     if (isFirstRender) {
//       setIsFirstRender(false);

//       // Start from 0 on first render for a nice intro animation
//       const startTime = performance.now();
//       animationRef.current = requestAnimationFrame((timestamp) =>
//         animateProgress(0, progress, startTime, duration, timestamp)
//       );

//       return;
//     }

//     // Skip animation if progress hasn't changed
//     if (prevProgressRef.current === progress) {
//       return;
//     }

//     // Cancel any ongoing animation
//     if (animationRef.current) {
//       cancelAnimationFrame(animationRef.current);
//     }

//     // Start a new animation
//     const startTime = performance.now();
//     const startValue = animatedProgress;

//     animationRef.current = requestAnimationFrame((timestamp) =>
//       animateProgress(startValue, progress, startTime, duration, timestamp)
//     );

//     // Cleanup function to cancel animation when component unmounts
//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [progress, duration, isFirstRender]);

//   return (
//     <div className='w-full'>
//       <div
//         className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden shadow-inner`}
//       >
//         <div
//           className='h-full rounded-full relative flex items-center justify-center transition-all'
//           style={{
//             width: `${Math.max(animatedProgress, 0)}%`,
//             background: 'linear-gradient(90deg, #F9D949 0%, #FD9A11 100%)',
//           }}
//         >
//           {/* Shine effect animation */}
//           <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine'></div>

//           {/* Subtle pulse effect for the filled area */}
//           <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse'></div>

//           {/* Percentage text - only show if there's enough space and showText is true */}
//           {showText && animatedProgress > 5 && (
//             <span className='text-xs font-bold text-white relative z-10 px-1'>
//               {Math.round(animatedProgress)}%
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;

import React from 'react';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='w-full bg-white rounded-full h-2.5'>
      <div
        className='bg-[#F3AC50] h-2.5 rounded-full'
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
