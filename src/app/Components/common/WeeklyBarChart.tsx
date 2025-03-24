'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

const WeeklyBarChart: React.FC = () => {
  // Define proper types for the refs
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

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

    // Create full and abbreviated day names
    const fullDayNames = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    const shortDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Chart configuration with TypeScript
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: isMobile ? shortDayNames : fullDayNames,
        datasets: [
          {
            data: [5, 6, 8, 7, 8, 4, 4],
            backgroundColor: gradient,
            borderSkipped: false,
            // Adjust column width based on screen size
            barPercentage: isMobile ? 0.9 : 0.8,
            categoryPercentage: isMobile ? 0.9 : 0.8,
            borderRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1500,
          delay: 300,
          easing: 'easeOutQuart',
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
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
                // Show full day name in tooltip even on mobile
                const index = shortDayNames.indexOf(items[0].label as string);
                return index !== -1 ? fullDayNames[index] : items[0].label;
              },
              label: (context) => {
                return `Study Hours: ${context.raw} hrs`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: '#e0e0e0',
              lineWidth: 1,
              drawTicks: false,
            },
            ticks: {
              font: {
                size: isMobile ? 10 : 12,
                weight: 'bold',
              },
              color: '#555',
              maxRotation: 0,
              minRotation: 0,
            },
            border: {
              display: true,
              width: 1,
              color: '#666',
              dash: [3, 3],
            },
            title: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
              color: '#e0e0e0',
              lineWidth: 1,
              drawTicks: false,
            },
            ticks: {
              font: {
                size: isMobile ? 10 : 12,
              },
              color: '#666',
              padding: isMobile ? 4 : 8,
              callback: (value) => `${value}hrs`,
              stepSize: 4,
            },
            border: {
              display: true,
              width: 1,
              color: '#666',
              dash: [3, 3],
            },
            title: {
              display: false,
            },
            max: 24,
            beginAtZero: true,
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
  }, [windowWidth]); // Redraw chart when window size changes

  return (
    <div className='w-full h-48 sm:h-56 md:h-64 relative bg-transparent'>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WeeklyBarChart;
