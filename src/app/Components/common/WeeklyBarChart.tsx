'use client';

import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

const WeeklyBarChart: React.FC = () => {
  // Define proper types for the refs
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

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

    // Chart configuration with TypeScript
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        datasets: [
          {
            data: [60, 70, 90, 90, 85, 50, 50],
            backgroundColor: gradient,
            borderRadius: 6,
            borderSkipped: false,
            // Increase column width
            barPercentage: 0.8,
            categoryPercentage: 0.8,
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
            padding: 12,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 13,
            },
            callbacks: {
              title: (items) => {
                return items[0].label;
              },
              label: (context) => {
                return `Value: ${context.raw}%`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
                weight: 'bold',
              },
              color: '#555',
            },
            border: {
              display: false,
            },
          },
          y: {
            grid: {
              color: '#e0e0e0',
              lineWidth: 1,
              drawTicks: false,
            },
            ticks: {
              font: {
                size: 12,
              },
              color: '#666',
              padding: 8,
              callback: (value) => `${value}%`,
            },
            border: {
              display: false,
            },
            max: 100,
          },
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
  }, []);

  return (
    <div className='w-full h-64 relative p-2 bg-white rounded-lg shadow-sm'>
      <canvas ref={chartRef} />
    </div>
  );
};

export default WeeklyBarChart;
