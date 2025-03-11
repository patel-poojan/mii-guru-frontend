import ProgressBar from '@/app/Components/common/ProgressBar';
import WeeklyBarChart from '@/app/Components/common/WeeklyBarChart';
import React from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { LuClock } from 'react-icons/lu';
const page = () => {
  const subjects = [
    {
      iconURL: '',
      name: 'Maths',
      noOfChapter: 10,
      noOfLesson: 100,
      noOfCompetedLesson: 50,
      remainingTime: 10,
    },
    {
      iconURL: '',
      name: 'Science',
      noOfChapter: 10,
      noOfLesson: 100,
      noOfCompetedLesson: 50,
      remainingTime: 10,
    },
    {
      iconURL: '',
      name: 'physics',
      noOfChapter: 10,
      noOfLesson: 100,
      noOfCompetedLesson: 50,
      remainingTime: 10,
    },
    {
      iconURL: '',
      name: 'chemistry',
      noOfChapter: 10,
      noOfLesson: 100,
      noOfCompetedLesson: 50,
      remainingTime: 10,
    },
  ];
  return (
    <div>
      <div className='flex flex-row justify-between items-center mb-3'>
        <div className='text-black font-medium text-2xl'>Launch Classroom</div>
        <div className='text-black font-normal text-lg'>
          Invite your friends
        </div>
      </div>
      <div className='w-full flex flex-row h-full gap-6'>
        <div className='w-9/12 flex flex-col gap-6  '>
          <div className='w-full grid-cols-2 grid gap-6'>
            {subjects.map((item, index) => (
              <div
                key={index}
                className='bg-[#F2F2F2] p-4 rounded-xl flex flex-col gap-4'
              >
                <div className='flex flex-row gap-4'>
                  <div className='bg-white h-12 w-12'>{item.iconURL}</div>
                  <div className='flex flex-col justify-between'>
                    <div className='text-[#000000] text-lg font-normal'>
                      {item.name}
                    </div>
                    <div className='text-[#949494] text-sm font-normal'>{`Chapter-${item.noOfChapter}`}</div>
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <div>
                    <ProgressBar progress={50} />
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
                <div className='text-[#F3AC50] font-medium text-sm'>
                  Resume Course
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-black font-medium text-2xl'>Study Hours</div>
            <div>
              <WeeklyBarChart />
            </div>
          </div>
        </div>
        <div className='w-3/12 border border-[green] h-8'>right</div>
      </div>
    </div>
  );
};

export default page;
