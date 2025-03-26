'use client';
import CircularProgress from '@/app/Components/common/CircularProgress';

import ProfileIcon from '@/app/Components/common/ProfileIcon';
import ProgressBar from '@/app/Components/common/ProgressBar';
import WeeklyBarChart from '@/app/Components/common/WeeklyBarChart';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaLock, FaPlus } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiBookOpen } from 'react-icons/fi';
import { MdOutlinePersonAddAlt } from 'react-icons/md';
import { toast } from 'sonner';

type DashboardDataType = {
  data: {
    progress: {
      subjects: {
        subject_name: string;
        total_topics: number;
        completed_topics: number;
        completion_percentage: number;
        last_activity: null;
        duration: null;
        class_name: null;
      }[];
      overall_progress: {
        total_topics: number;
        completed_topics: number;
        completion_percentage: number;
      };
    };
    activity: {
      daily_activities: {
        date: string;
        day_name: string;
        duration_seconds: number;
        duration_hours: number;
        is_today: boolean;
        is_future: boolean;
      }[];
      total_duration_seconds: number;
      total_duration_hours: number;
      timezone: string;
    };
    streak: {
      max_streak: number;
      current_streak: number;
      active_days: string[];
    };
    quiz_performance: {
      overall_percentage: number;
      subject_performances: string[];
      total_quizzes_taken: number;
      total_topics_tested: number;
      total_correct_answers: number;
      total_questions: number;
    };
    test_notifications: {
      has_available_tests: boolean;
      recently_completed_topics: string[];
      recommendations: string[];
      notification_message: string;
      total_test: number;
    };
    user_info: {
      user_id: string;
      username: string;
      email: string;
      is_verified: boolean;
      roles: string;
      processed_for_subscription: boolean;
    };
  };
  message: string;
  status: number;
  success: boolean;
};
const Page = () => {
  const fetchDashboardData = async () => {
    const response: DashboardDataType = await axiosInstance.get(
      `/dashboard/data`
    );
    return response.data;
  };

  const {
    data: dashboardData,
    isLoading: loadDashboardData,
    isError: errorInDashboardData,
  } = useQuery({
    queryKey: ['fetch', 'dashboard', 'data'],
    queryFn: fetchDashboardData,
  });
  useEffect(() => {
    if (errorInDashboardData) {
      toast.error('Failed to fetch dashboard data');
    }
  }, [errorInDashboardData]);

  const getIconUrl = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'maths':
        return '/img/maths-logo.svg';
      case 'biology':
        return '/img/biology-logo.svg';
      case 'physics':
        return '/img/physics-logo.svg';
      case 'chemistry':
        return '/img/chemistry-logo.svg';
      default:
        return '/img/other-logo.svg';
    }
  };

  // Function to handle empty or few subjects
  const renderSubjectGridItems = () => {
    if (dashboardData?.progress?.subjects.length === 0) {
      return (
        <div className='col-span-2 bg-[#F2F2F2] p-4 rounded-xl flex flex-col items-center justify-center min-h-[356px]'>
          <div className='text-[#949494] text-base md:text-lg font-normal'>
            No subjects available
          </div>
        </div>
      );
    }

    // For exactly 1 subject, display it with full width
    if (dashboardData?.progress?.subjects.length === 1) {
      return (
        <>
          <div className='col-span-1 h-fit sm:col-span-2 bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-3 md:gap-4'>
            <div className='flex flex-row gap-3 md:gap-4'>
              <div className='bg-white h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-md'>
                <Image
                  src={getIconUrl(
                    dashboardData?.progress?.subjects[0].subject_name
                  )}
                  alt='subject'
                  height={28}
                  width={28}
                  className='md:h-8 md:w-8'
                />
              </div>
              <div className='flex flex-col justify-between'>
                <div className='text-[#000000] text-base md:text-lg font-normal capitalize'>
                  {dashboardData?.progress?.subjects[0].subject_name}
                </div>
                {/* <div className='text-[#949494] text-xs md:text-sm font-normal'>{`Chapter-${subjects[0].noOfChapter}`}</div> */}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <ProgressBar
                  progress={
                    dashboardData?.progress?.subjects[0].completion_percentage
                  }
                />
              </div>
              <div className='flex flex-row justify-between'>
                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <FiBookOpen className='me-1' />
                  {` ${dashboardData?.progress?.subjects[0].completed_topics}/${dashboardData?.progress?.subjects[0].total_topics} Lessons`}
                </div>
              </div>
            </div>
            <div className='text-[#F3AC50] font-medium text-sm flex items-center gap-2 cursor-pointer'>
              Resume Course <FaArrowRightLong />
            </div>
          </div>
          <div className='col-span-1 sm:col-span-2 bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col justify-center items-center gap-2  h-40 cursor-pointer'>
            <FaPlus className='text-[#CCCCCC] text-4xl' />
            <div className='text-black text-lg font-medium'>Add subject</div>
          </div>
        </>
      );
    }

    // For exactly 2 subjects, display them in different rows
    if (dashboardData?.progress?.subjects.length === 2) {
      return (
        <>
          <div className='col-span-1 sm:col-span-2 bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-3 md:gap-4'>
            <div className='flex flex-row gap-3 md:gap-4'>
              <div className='bg-white h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-md'>
                <Image
                  src={getIconUrl(
                    dashboardData?.progress?.subjects[0].subject_name
                  )}
                  alt='subject'
                  height={28}
                  width={28}
                  className='md:h-8 md:w-8'
                />
              </div>
              <div className='flex flex-col justify-between'>
                <div className='text-[#000000] text-base md:text-lg font-normal capitalize'>
                  {dashboardData?.progress?.subjects[0].subject_name}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <ProgressBar
                  progress={
                    dashboardData?.progress?.subjects[0].completion_percentage
                  }
                />
              </div>
              <div className='flex flex-row justify-between'>
                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <FiBookOpen className='me-1' />
                  {` ${dashboardData?.progress?.subjects[0].completed_topics}/${dashboardData?.progress?.subjects[0].total_topics} Lessons`}
                </div>

                {/* <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <LuClock className='me-1' />
                  {`${subjects[0].remainingTime} Hours Left`}
                </div> */}
              </div>
            </div>
            <div className='text-[#F3AC50] font-medium text-sm flex items-center gap-2 cursor-pointer'>
              Resume Course <FaArrowRightLong />
            </div>
          </div>

          <div className='col-span-1 sm:col-span-2 bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-3 md:gap-4'>
            <div className='flex flex-row gap-3 md:gap-4'>
              <div className='bg-white h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-md'>
                <Image
                  src={getIconUrl(
                    dashboardData?.progress?.subjects[1].subject_name
                  )}
                  alt='subject'
                  height={28}
                  width={28}
                  className='md:h-8 md:w-8'
                />
              </div>
              <div className='flex flex-col justify-between'>
                <div className='text-[#000000] text-base md:text-lg font-normal capitalize'>
                  {dashboardData?.progress?.subjects[1].subject_name}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <ProgressBar
                  progress={
                    dashboardData?.progress?.subjects[1].completion_percentage
                  }
                />
              </div>
              <div className='flex flex-row justify-between'>
                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <FiBookOpen className='me-1' />
                  {` ${dashboardData?.progress?.subjects[1].completed_topics}/${dashboardData?.progress?.subjects[1].total_topics} Lessons`}
                </div>
              </div>
            </div>
            <div className='text-[#F3AC50] font-medium text-sm flex items-center gap-2 cursor-pointer'>
              Resume Course <FaArrowRightLong />
            </div>
          </div>
        </>
      );
    }

    // For more than 2 subjects, use the original code
    const subjectItems = dashboardData?.progress?.subjects.map(
      (item, index) => (
        <div
          key={index}
          className='bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-3 md:gap-4'
        >
          <div className='flex flex-row gap-3 md:gap-4'>
            <div className='bg-white h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-md'>
              <Image
                src={getIconUrl(item.subject_name)}
                alt='subject'
                height={28}
                width={28}
                className='md:h-8 md:w-8'
              />
            </div>
            <div className='flex flex-col justify-between'>
              <div className='text-[#000000] text-base md:text-lg font-normal capitalize'>
                {item.subject_name}
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div>
              <ProgressBar progress={item.completion_percentage} />
            </div>
            <div className='flex flex-row justify-between'>
              <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                <FiBookOpen className='me-1' />
                {` ${item.completed_topics}/${item.total_topics} Lessons`}
              </div>
            </div>
          </div>
          <div className='text-[#F3AC50] font-medium text-sm flex items-center gap-2 cursor-pointer'>
            Resume Course <FaArrowRightLong />
          </div>
        </div>
      )
    );

    return subjectItems;
  };

  // Function to handle empty or few subjects in progress section
  const renderProgressItems = () => {
    if (dashboardData?.progress?.subjects?.length === 0) {
      return (
        <div className='col-span-2 bg-white rounded-xl p-4 flex flex-col items-center justify-center min-h-[328px]'>
          <div className='text-[#949494] text-base font-normal'>
            No progress data available
          </div>
        </div>
      );
    }

    // For exactly 1 subject, center it in the container
    if (dashboardData?.progress?.subjects?.length === 1) {
      return (
        <>
          <div className='col-span-2 bg-white rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center justify-between h-full'>
            <CircularProgress
              value={dashboardData?.progress?.subjects[0].completion_percentage}
              gradientId={`progress-gradient-0`}
              initialAnimation={true}
              initialAnimationDelay={0.2}
            />
            <p className='text-black capitalize text-sm md:text-base font-normal text-center mt-1'>
              {dashboardData?.progress?.subjects[0].subject_name}
            </p>
          </div>
          <div className='col-span-2 bg-white rounded-xl p-2 md:p-3 lg:p-4 flex flex-col gap-1 items-center justify-center h-[156px] cursor-pointer'>
            <FaPlus className='text-[#CCCCCC] text-4xl' />
            <div className='text-black text-lg font-medium'>Add subject</div>
          </div>
        </>
      );
    }

    // For exactly 2 subjects, show them in one row with adjusted layout
    if (dashboardData?.progress?.subjects.length === 2) {
      return (
        <>
          {dashboardData?.progress?.subjects.map((item, index) => (
            <div
              className='bg-white col-span-2 rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center justify-between h-full'
              key={index}
            >
              <CircularProgress
                value={item.completion_percentage}
                gradientId={`progress-gradient-${index}`}
                initialAnimation={true}
                initialAnimationDelay={0.2 * index}
              />
              <p className='text-black capitalize text-sm md:text-base font-normal text-center mt-1'>
                {item.subject_name}
              </p>
            </div>
          ))}
        </>
      );
    }

    // For more than 2 subjects
    return dashboardData?.progress?.subjects.map((item, index) => (
      <div
        className='bg-white rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center justify-between h-full'
        key={index}
      >
        <CircularProgress
          value={item.completion_percentage}
          gradientId={`progress-gradient-${index}`}
          initialAnimation={true}
          initialAnimationDelay={0.2 * index}
        />
        <p className='text-black capitalize text-sm md:text-base font-normal text-center mt-1'>
          {item.subject_name}
        </p>
      </div>
    ));
  };

  // Render loading skeletons for better UX during loading
  const renderLoadingSkeletons = () => (
    <>
      {/* Left Section Skeleton (Subjects and Study Hours) */}
      <div className='w-full lg:w-[73%] flex-1 flex flex-col gap-4 md:gap-6'>
        {/* Subjects Grid Skeleton */}
        <div className='w-full flex-1 grid grid-cols-1 overflow-y-auto h-full sm:grid-cols-2 gap-4 md:gap-6'>
          <div className='col-span-1 sm:col-span-2 bg-[#F2F2F2] p-3 md:p-4 rounded-xl animate-pulse'>
            <div className='flex flex-row gap-3 md:gap-4'>
              <div className='bg-white/70 h-10 w-10 md:h-12 md:w-12 rounded-md'></div>
              <div className='flex flex-col justify-between'>
                <div className='bg-white/70 h-5 w-32 rounded'></div>
                <div className='bg-white/70 h-4 w-24 rounded mt-2'></div>
              </div>
            </div>
            <div className='mt-4 h-2 bg-white/70 rounded'></div>
            <div className='mt-4 flex justify-between'>
              <div className='bg-white/70 h-4 w-24 rounded'></div>
              <div className='bg-white/70 h-4 w-28 rounded'></div>
            </div>
          </div>
          <div className='col-span-1 sm:col-span-2 bg-[#F2F2F2] p-3 md:p-4 rounded-xl animate-pulse'>
            <div className='flex flex-row gap-3 md:gap-4'>
              <div className='bg-white/70 h-10 w-10 md:h-12 md:w-12 rounded-md'></div>
              <div className='flex flex-col justify-between'>
                <div className='bg-white/70 h-5 w-32 rounded'></div>
                <div className='bg-white/70 h-4 w-24 rounded mt-2'></div>
              </div>
            </div>
            <div className='mt-4 h-2 bg-white/70 rounded'></div>
            <div className='mt-4 flex justify-between'>
              <div className='bg-white/70 h-4 w-24 rounded'></div>
              <div className='bg-white/70 h-4 w-28 rounded'></div>
            </div>
          </div>
        </div>

        {/* Study Hours Skeleton */}
        <div className='flex flex-col gap-3'>
          <div className='text-black font-medium text-xl md:text-2xl mx-2'>
            Study Hours
          </div>
          <div className='bg-[#F2F2F2] p-3 md:p-4 rounded-xl'>
            <div className='h-48 sm:h-56 md:h-64 bg-white/20 animate-pulse rounded flex items-center justify-center'>
              <div className='text-gray-400 text-sm text-center px-4'>
                Loading study data...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section Skeleton (Profile and Progress) */}
      <div className='w-full lg:w-[27%] bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-4 h-auto'>
        {/* Profile Section Skeleton */}
        <div className='flex items-center gap-3 md:gap-4 animate-pulse'>
          <div className='bg-white/70 h-8 w-8 md:h-10 md:w-10 rounded-full'></div>
          <div className='flex flex-col justify-between'>
            <div className='bg-white/70 h-5 w-32 rounded'></div>
            <div className='bg-white/70 h-4 w-28 rounded mt-2'></div>
          </div>
        </div>

        {/* Progress Section Skeleton */}
        <div className='flex-1 flex flex-col overflow-hidden'>
          <div className='text-black text-base md:text-lg font-normal mb-2.5 mt-2.5'>
            Progress so far
          </div>
          <div className='grid grid-cols-1 gap-3 md:gap-4 overflow-auto'>
            <div className='bg-white rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center justify-center h-36 animate-pulse'>
              <div className='bg-white/70 h-20 w-20 rounded-full'></div>
              <div className='bg-white/70 h-4 w-16 rounded mt-2'></div>
            </div>
            <div className='bg-white rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center justify-center h-36 animate-pulse'>
              <div className='bg-white/70 h-20 w-20 rounded-full'></div>
              <div className='bg-white/70 h-4 w-16 rounded mt-2'></div>
            </div>
          </div>
        </div>

        {/* Test and Score Section Skeleton */}
        <div className='grid grid-cols-2 gap-3 md:gap-4'>
          <div className='bg-white rounded-xl p-2 md:p-3 w-full flex flex-col items-center justify-center h-24 animate-pulse'>
            <div className='bg-white/70 h-12 w-12 rounded-full'></div>
            <div className='bg-white/70 h-4 w-16 rounded mt-2'></div>
          </div>
          <div className='bg-white rounded-xl p-2 md:p-3 w-full flex flex-col items-center justify-center h-24 animate-pulse'>
            <div className='bg-white/70 h-8 w-12 rounded'></div>
            <div className='bg-white/70 h-4 w-12 rounded mt-2'></div>
          </div>
        </div>

        {/* Alert Section Skeleton */}
        <div className='bg-white rounded-xl p-2 md:p-3 lg:p-4 flex gap-3 animate-pulse'>
          <div className='bg-white/70 h-16 w-16 rounded'></div>
          <div className='flex-1'>
            <div className='bg-white/70 h-4 w-full rounded mb-2'></div>
            <div className='bg-white/70 h-4 w-3/4 rounded'></div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className='lg:h-[calc(100vh-144px)] flex flex-col lg:py-[13px]'>
      <div className='w-full overflow-auto h-full flex flex-col my-auto'>
        {/* Header Section */}
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 px-2'>
          <div className='text-black font-medium text-xl md:text-2xl mb-2 sm:mb-0'>
            Launch Classroom
          </div>
          <div className='flex flex-row gap-2 md:gap-3 items-center'>
            <div className='text-black font-normal text-base md:text-lg'>
              Invite your friends
            </div>
            <div className='p-1.5 rounded bg-[#F0F0F0]'>
              <MdOutlinePersonAddAlt className='text-lg text-black' />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='w-full flex-1 flex flex-col lg:flex-row gap-4 md:gap-6 lg:overflow-hidden'>
          {loadDashboardData ? (
            renderLoadingSkeletons()
          ) : (
            <>
              {/* Left Section (Subjects and Study Hours) */}
              <div className='w-full lg:w-[73%] flex-1 flex flex-col gap-4 md:gap-6 '>
                {/* Subjects Grid */}
                <div
                  className={`w-full flex-1 grid grid-cols-1 overflow-y-auto h-full sm:grid-cols-2 gap-4 md:gap-6 ${
                    dashboardData?.progress?.subjects &&
                    dashboardData?.progress?.subjects?.length > 4
                      ? 'pr-2'
                      : ''
                  }`}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor:
                      'linear-gradient(180deg, #F9D949 0%, #FD9A11 100%) transparent',
                  }}
                >
                  {renderSubjectGridItems()}
                </div>

                {/* Study Hours Section */}
                <div className='flex flex-col gap-3'>
                  <div className='text-black font-medium text-xl md:text-2xl mx-2'>
                    Study Hours
                  </div>
                  <div className='bg-[#F2F2F2] p-3 md:p-4 rounded-xl'>
                    <WeeklyBarChart
                      data={dashboardData?.activity?.daily_activities ?? []}
                    />
                  </div>
                </div>
              </div>

              {/* Right Section (Profile and Progress) */}
              <div className='w-full lg:w-[27%] bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-4 h-auto'>
                {/* Profile Section */}
                <div className='flex items-center gap-3 md:gap-4'>
                  <ProfileIcon h={8} w={8} className='md:h-10 md:w-10' />
                  <div className='flex flex-col justify-between'>
                    <div className='text-[#000000] text-base md:text-lg font-medium capitalize'>
                      {dashboardData?.user_info?.username}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Image
                        src='/img/streak-logo.svg'
                        alt='streak'
                        height={16}
                        width={16}
                        className='md:h-5 md:w-5'
                      />
                      <div className='text-black text-xs font-medium'>
                        Streak {dashboardData?.streak?.current_streak ?? 0} Days
                        in a row
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className='flex-1 flex flex-col overflow-hidden'>
                  <div className='text-black text-base md:text-lg font-normal mb-2.5 mt-2.5'>
                    Progress so far
                  </div>
                  <div
                    className={`grid grid-cols-2 gap-3 md:gap-4 overflow-auto ${
                      dashboardData?.progress?.subjects &&
                      dashboardData?.progress?.subjects?.length
                        ? ' pr-2'
                        : ''
                    }`}
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor:
                        'linear-gradient(180deg, #F9D949 0%, #FD9A11 100%) transparent',
                    }}
                  >
                    {renderProgressItems()}
                  </div>
                </div>

                {/* Test and Score Section */}
                <div className='grid grid-cols-2 gap-3 md:gap-4'>
                  <div className='bg-white rounded-xl p-2 md:p-3 w-full flex flex-col items-center justify-center'>
                    <Image
                      src='/img/test-logo.svg'
                      alt='test'
                      height={60}
                      width={60}
                      className='md:h-16 md:w-16 lg:h-18 lg:w-18'
                    />
                    <div className='text-black text-sm font-medium mt-1'>
                      {dashboardData?.test_notifications?.total_test ?? 0} test
                    </div>
                  </div>
                  <div className='bg-white rounded-xl p-2 md:p-3 w-full flex flex-col items-center justify-center'>
                    <div className='text-black text-2xl md:text-3xl font-medium'>
                      {dashboardData?.quiz_performance?.overall_percentage ?? 0}
                      %
                    </div>
                    <div className='text-black text-sm md:text-base font-normal'>
                      score
                    </div>
                  </div>
                </div>

                {/* Alert Section */}
                <div
                  className={`rounded-xl p-2 md:p-3 lg:p-4 flex gap-3 ${
                    dashboardData?.test_notifications?.has_available_tests
                      ? 'bg-white'
                      : 'bg-[#F8F8F8] border border-[#EEEEEE] relative overflow-hidden'
                  }`}
                >
                  {!dashboardData?.test_notifications?.has_available_tests && (
                    <div className='absolute right-0 top-0 p-2 bg-[#FFF8E8] rounded-bl-lg'>
                      <FaLock className='text-[#F3AC50] text-sm' />
                    </div>
                  )}
                  <Image
                    src='/img/alert-logo.svg'
                    alt='alert'
                    height={60}
                    width={60}
                    className={`md:h-16 md:w-16 lg:h-18 lg:w-18 ${
                      dashboardData?.test_notifications?.has_available_tests
                        ? ''
                        : 'opacity-85'
                    }`}
                  />
                  <div
                    className={`text-sm md:text-base font-normal flex flex-col justify-center ${
                      dashboardData?.test_notifications?.has_available_tests
                        ? 'text-black'
                        : 'text-[#888888]'
                    }`}
                  >
                    {dashboardData?.test_notifications?.notification_message}
                    {!dashboardData?.test_notifications
                      ?.has_available_tests && (
                      <span className='text-[#F3AC50] text-xs mt-1 font-medium'>
                        Tests are currently unavailable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
