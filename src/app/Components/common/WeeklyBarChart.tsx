'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

const WeeklyBarChart = ({
  data,
}: {
  data: {
    date: string;
    day_name: string;
    duration_seconds: number;
    duration_hours: number;
    is_today: boolean;
    is_future: boolean;
  }[];
}) => {
  // Define proper types for the refs
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  // Track empty state
  const [hasNoStudyHours, setHasNoStudyHours] = useState<boolean>(false);

  // Handle window resize with debounce for optimization
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', debouncedResize);
      return () => {
        window.removeEventListener('resize', debouncedResize);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  // Process data to ensure it's sorted by date
  const processedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    // Sort data by date to ensure correct order
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Check if all hours are zero
    const allZeros = sortedData.every((item) => item.duration_hours === 0);
    setHasNoStudyHours(allZeros);

    return sortedData;
  }, [data]);

  useEffect(() => {
    if (!chartRef.current || !processedData || processedData.length === 0)
      return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get the 2d context
    const ctx = chartRef.current.getContext('2d') as CanvasRenderingContext2D;

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#ffb347');
    gradient.addColorStop(1, '#ffcc33');

    // Determine if on mobile
    const isMobile = windowWidth < 768;

    // Extract day names and duration hours from data
    const dayNames = processedData.map((item) => item.day_name);
    const durationHours = processedData.map((item) => item.duration_hours);

    // Create short day names for mobile
    const shortDayNames = dayNames.map((day) => day.substring(0, 3));

    // If all hours are zero, use a very light gray for all bars
    // Otherwise highlight today's bar with a different color
    const backgroundColors = hasNoStudyHours
      ? processedData.map(() => 'rgba(230, 230, 230, 0.3)')
      : processedData.map((item) => (item.is_today ? '#ff9900' : gradient));

    // Chart configuration with TypeScript
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: isMobile ? shortDayNames : dayNames,
        datasets: [
          {
            data: hasNoStudyHours ? dayNames.map(() => 2) : durationHours, // Show stub bars of height 2 when all zeros
            backgroundColor: backgroundColors,
            borderSkipped: false,
            // Adjust column width based on screen size
            barPercentage: isMobile ? 0.9 : 0.8,
            categoryPercentage: isMobile ? 0.9 : 0.8,
            borderRadius: hasNoStudyHours ? 1 : 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000, // Reduced for better performance
          easing: 'easeOutQuart',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: !hasNoStudyHours, // Disable tooltips when all values are zero
            padding: isMobile ? 8 : 12,
            backgroundColor: 'rgba(40, 40, 40, 0.9)',
            titleFont: {
              size: isMobile ? 12 : 14,
              weight: 'bold',
            },
            bodyFont: {
              size: isMobile ? 11 : 13,
            },
            boxPadding: isMobile ? 6 : 8,
            usePointStyle: true,
            displayColors: false,
            callbacks: {
              title: (items) => {
                const index = items[0].dataIndex;
                return processedData[index]?.day_name || '';
              },
              label: (context) => {
                const index = context.dataIndex;
                const item = processedData[index];
                const hours = item ? item.duration_hours : 0;
                return `Study Hours: ${hours} hrs`;
              },
              afterLabel: (context) => {
                const index = context.dataIndex;
                const item = processedData[index];
                if (item?.is_today) return 'Today';
                if (item?.is_future) return 'Upcoming';
                return '';
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: hasNoStudyHours ? 'rgba(230, 230, 230, 0.7)' : '#e0e0e0',
              lineWidth: hasNoStudyHours ? 0.5 : 1,
              drawTicks: false,
            },
            ticks: {
              font: {
                size: isMobile ? 10 : 12,
                weight: hasNoStudyHours ? 'normal' : 'bold',
              },
              color: hasNoStudyHours ? '#aaa' : '#555',
              maxRotation: 0,
              minRotation: 0,
            },
            border: {
              display: true,
              width: hasNoStudyHours ? 0.5 : 1,
              color: hasNoStudyHours ? '#ddd' : '#666',
              dash: [3, 3],
            },
            title: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
              color: hasNoStudyHours ? 'rgba(230, 230, 230, 0.7)' : '#e0e0e0',
              lineWidth: hasNoStudyHours ? 0.5 : 1,
              drawTicks: false,
            },
            ticks: {
              font: {
                size: isMobile ? 10 : 12,
              },
              color: hasNoStudyHours ? '#aaa' : '#666',
              padding: isMobile ? 4 : 8,
              callback: (value) => `${value}hrs`,
              stepSize: 4,
            },
            border: {
              display: true,
              width: hasNoStudyHours ? 0.5 : 1,
              color: hasNoStudyHours ? '#ddd' : '#666',
              dash: [3, 3],
            },
            title: {
              display: false,
            },
            max: hasNoStudyHours ? 24 : undefined,
            beginAtZero: true,
            suggestedMax: hasNoStudyHours
              ? 24
              : Math.max(...durationHours, 4) + 2, // Dynamic max based on data
          },
        },
        // Set background color to transparent
        backgroundColor: 'transparent',
        // Set padding to zero
        layout: {
          padding: {
            top: 10,
            bottom: 5,
            left: isMobile ? 0 : 10,
            right: isMobile ? 0 : 10,
          },
        },
        // Make hover interactions more touch-friendly
        hover: {
          mode: 'nearest',
          intersect: false,
        },
        // More responsive interactions
        interaction: {
          mode: 'index',
          intersect: false,
        },
      },
    };

    // Initialize chart with proper typing
    chartInstance.current = new Chart(chartRef.current as ChartItem, config);

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [windowWidth, processedData, hasNoStudyHours]); // Redraw chart when window size or data changes

  return (
    <div className='w-full h-48 sm:h-56 md:h-64 relative bg-transparent'>
      <canvas ref={chartRef} />
      {hasNoStudyHours && (
        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
          <p className='text-black text-sm md:text-xl text-center px-4'>
            Track your daily study hours here and watch your progress grow.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeeklyBarChart;
