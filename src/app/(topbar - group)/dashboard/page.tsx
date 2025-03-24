import CircularProgress from '@/app/Components/common/CircularProgress';
import ProfileIcon from '@/app/Components/common/ProfileIcon';
import ProgressBar from '@/app/Components/common/ProgressBar';
import WeeklyBarChart from '@/app/Components/common/WeeklyBarChart';
import Image from 'next/image';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FiBookOpen } from 'react-icons/fi';
import { LuClock } from 'react-icons/lu';
import { MdOutlinePersonAddAlt } from 'react-icons/md';

const Page = () => {
  const subjects = [
    {
      name: 'Maths',
      noOfChapter: 10,
      noOfLesson: 100,
      noOfCompetedLesson: 50,
      remainingTime: 10,
      parentage: 50,
    },
    {
      name: 'Maths',
      noOfChapter: 10,
      noOfLesson: 100,
      noOfCompetedLesson: 50,
      remainingTime: 10,
      parentage: 50,
    },
    {
      name: 'Maths',
      noOfChapter: 10,
      noOfLesson: 100,
      noOfCompetedLesson: 50,
      remainingTime: 10,
      parentage: 50,
    },
  ];

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
    if (subjects.length === 0) {
      return (
        <div className='col-span-2 bg-[#F2F2F2] p-4 rounded-xl flex flex-col items-center justify-center min-h-[356px]'>
          <div className='text-[#949494] text-base md:text-lg font-normal'>
            No subjects available
          </div>
        </div>
      );
    }

    // For exactly 1 subject, display it with full width
    if (subjects.length === 1) {
      return (
        <>
          <div className='col-span-1 h-fit sm:col-span-2 bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-3 md:gap-4'>
            <div className='flex flex-row gap-3 md:gap-4'>
              <div className='bg-white h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-md'>
                <Image
                  src={getIconUrl(subjects[0].name)}
                  alt='subject'
                  height={28}
                  width={28}
                  className='md:h-8 md:w-8'
                />
              </div>
              <div className='flex flex-col justify-between'>
                <div className='text-[#000000] text-base md:text-lg font-normal capitalize'>
                  {subjects[0].name}
                </div>
                <div className='text-[#949494] text-xs md:text-sm font-normal'>{`Chapter-${subjects[0].noOfChapter}`}</div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <ProgressBar progress={subjects[0].parentage} />
              </div>
              <div className='flex flex-row justify-between'>
                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <FiBookOpen className='me-1' />
                  {` ${subjects[0].noOfCompetedLesson}/${subjects[0].noOfLesson} Lessons`}
                </div>

                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <LuClock className='me-1' />
                  {`${subjects[0].remainingTime} Hours Left`}
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
    if (subjects.length === 2) {
      return (
        <>
          <div className='col-span-1 sm:col-span-2 bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-3 md:gap-4'>
            <div className='flex flex-row gap-3 md:gap-4'>
              <div className='bg-white h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-md'>
                <Image
                  src={getIconUrl(subjects[0].name)}
                  alt='subject'
                  height={28}
                  width={28}
                  className='md:h-8 md:w-8'
                />
              </div>
              <div className='flex flex-col justify-between'>
                <div className='text-[#000000] text-base md:text-lg font-normal capitalize'>
                  {subjects[0].name}
                </div>
                <div className='text-[#949494] text-xs md:text-sm font-normal'>{`Chapter-${subjects[0].noOfChapter}`}</div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <ProgressBar progress={subjects[0].parentage} />
              </div>
              <div className='flex flex-row justify-between'>
                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <FiBookOpen className='me-1' />
                  {` ${subjects[0].noOfCompetedLesson}/${subjects[0].noOfLesson} Lessons`}
                </div>

                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <LuClock className='me-1' />
                  {`${subjects[0].remainingTime} Hours Left`}
                </div>
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
                  src={getIconUrl(subjects[1].name)}
                  alt='subject'
                  height={28}
                  width={28}
                  className='md:h-8 md:w-8'
                />
              </div>
              <div className='flex flex-col justify-between'>
                <div className='text-[#000000] text-base md:text-lg font-normal capitalize'>
                  {subjects[1].name}
                </div>
                <div className='text-[#949494] text-xs md:text-sm font-normal'>{`Chapter-${subjects[1].noOfChapter}`}</div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>
                <ProgressBar progress={subjects[1].parentage} />
              </div>
              <div className='flex flex-row justify-between'>
                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <FiBookOpen className='me-1' />
                  {` ${subjects[1].noOfCompetedLesson}/${subjects[1].noOfLesson} Lessons`}
                </div>

                <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
                  <LuClock className='me-1' />
                  {`${subjects[1].remainingTime} Hours Left`}
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
    const subjectItems = subjects.map((item, index) => (
      <div
        key={index}
        className='bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-3 md:gap-4'
      >
        <div className='flex flex-row gap-3 md:gap-4'>
          <div className='bg-white h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-md'>
            <Image
              src={getIconUrl(item.name)}
              alt='subject'
              height={28}
              width={28}
              className='md:h-8 md:w-8'
            />
          </div>
          <div className='flex flex-col justify-between'>
            <div className='text-[#000000] text-base md:text-lg font-normal capitalize'>
              {item.name}
            </div>
            <div className='text-[#949494] text-xs md:text-sm font-normal'>{`Chapter-${item.noOfChapter}`}</div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div>
            <ProgressBar progress={item.parentage} />
          </div>
          <div className='flex flex-row justify-between'>
            <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
              <FiBookOpen className='me-1' />
              {` ${item.noOfCompetedLesson}/${item.noOfLesson} Lessons`}
            </div>

            <div className='text-[#949494] text-xs font-normal flex flex-row items-center'>
              <LuClock className='me-1' />
              {`${item.remainingTime} Hours Left`}
            </div>
          </div>
        </div>
        <div className='text-[#F3AC50] font-medium text-sm flex items-center gap-2 cursor-pointer'>
          Resume Course <FaArrowRightLong />
        </div>
      </div>
    ));

    return subjectItems;
  };

  // Function to handle empty or few subjects in progress section
  const renderProgressItems = () => {
    if (subjects.length === 0) {
      return (
        <div className='col-span-2 bg-white rounded-xl p-4 flex flex-col items-center justify-center min-h-[328px]'>
          <div className='text-[#949494] text-base font-normal'>
            No progress data available
          </div>
        </div>
      );
    }

    // For exactly 1 subject, center it in the container
    if (subjects.length === 1) {
      return (
        <>
          <div className='col-span-2 bg-white rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center justify-between h-full'>
            <CircularProgress
              value={subjects[0].parentage}
              gradientId={`progress-gradient-0`}
              initialAnimation={true}
              initialAnimationDelay={0.2}
            />
            <p className='text-black capitalize text-sm md:text-base font-normal text-center mt-1'>
              {subjects[0].name}
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
    if (subjects.length === 2) {
      return (
        <>
          {subjects.map((item, index) => (
            <div
              className='bg-white col-span-2 rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center justify-between h-full'
              key={index}
            >
              <CircularProgress
                value={item.parentage}
                gradientId={`progress-gradient-${index}`}
                initialAnimation={true}
                initialAnimationDelay={0.2 * index}
              />
              <p className='text-black capitalize text-sm md:text-base font-normal text-center mt-1'>
                {item.name}
              </p>
            </div>
          ))}
        </>
      );
    }

    // For more than 2 subjects
    return subjects.map((item, index) => (
      <div
        className='bg-white rounded-xl p-2 md:p-3 lg:p-4 flex flex-col items-center justify-between h-full'
        key={index}
      >
        <CircularProgress
          value={item.parentage}
          gradientId={`progress-gradient-${index}`}
          initialAnimation={true}
          initialAnimationDelay={0.2 * index}
        />
        <p className='text-black capitalize text-sm md:text-base font-normal text-center mt-1'>
          {item.name}
        </p>
      </div>
    ));
  };
  return (
    <div className='lg:h-[calc(100vh-142.84px)] flex flex-col lg:py-[17px]'>
      <div
        className='w-full  overflow-auto h-full flex flex-col my-auto'
        // style={{ height: 'calc(100vh - 174px)' }}
      >
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
          {/* Left Section (Subjects and Study Hours) */}
          <div className='w-full lg:w-[73%] flex-1 flex flex-col gap-4 md:gap-6 '>
            {/* Subjects Grid */}
            <div
              className={`w-full flex-1 grid grid-cols-1 overflow-y-auto h-full sm:grid-cols-2 gap-4 md:gap-6 ${
                subjects.length > 4 ? 'pr-2' : ''
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
                <WeeklyBarChart />
              </div>
            </div>
          </div>

          {/* Right Section (Profile and Progress) */}
          <div className='w-full lg:w-[27%] bg-[#F2F2F2] p-3 md:p-4 rounded-xl flex flex-col gap-4 h-auto'>
            {/* Profile Section */}
            <div className='flex items-center gap-3 md:gap-4'>
              <ProfileIcon h={8} w={8} className='md:h-10 md:w-10' />
              <div className='flex flex-col justify-between'>
                <div className='text-[#000000] text-base md:text-lg font-medium'>
                  Krishty Lovely
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
                    Streak 12 Days in a row
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
                  subjects.length > 4 ? ' pr-2' : ''
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
                  8 test
                </div>
              </div>
              <div className='bg-white rounded-xl p-2 md:p-3 w-full flex flex-col items-center justify-center'>
                <div className='text-black text-2xl md:text-3xl font-medium'>
                  98%
                </div>
                <div className='text-black text-sm md:text-base font-normal'>
                  score
                </div>
              </div>
            </div>

            {/* Alert Section */}
            <div className='bg-white rounded-xl p-2 md:p-3 lg:p-4 flex gap-3'>
              <Image
                src='/img/alert-logo.svg'
                alt='alert'
                height={60}
                width={60}
                className='md:h-16 md:w-16 lg:h-18 lg:w-18'
              />
              <div className='text-black text-sm md:text-base font-normal flex flex-col justify-center'>
                <div>Next test in 2 days</div>
                <div>Subject: Maths</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
