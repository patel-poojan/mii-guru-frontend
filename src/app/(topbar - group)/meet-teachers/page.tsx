'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RxDash } from 'react-icons/rx';
import { Skeleton } from '@/components/ui/skeleton';
import { axiosInstance } from '@/app/utils/axiosInstance';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface FacultyMember {
  id: number;
  name: string;
  subject: string;
  imageUrl: string;
}

interface SyllabusResponse {
  subject: string;
  class_grade: string;
  duration: string;
  weekly_schedule: WeeklySchedule[];
}

interface WeeklySchedule {
  week: number;
  topics: string;
  description: string;
  days: string[];
  hours_per_session: number;
  topic_id: string;
  _matched_topic?: string;
  _match_attempted?: boolean;
}

export default function Index() {
  const [syllabusData, setSyllabusData] = useState<SyllabusResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openedTeacherId, setOpenedTeacherId] = useState<number | null>(null);
  const [autoCycleIndex, setAutoCycleIndex] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const router = useRouter();
  const subject = 'biology';
  const class_grade = '9';

  useEffect(() => {
    const fetchSyllabusData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/user/syllabus/${subject}?class_grade=${class_grade}`
        );
        setSyllabusData(response.data);
      } catch (err) {
        console.log('Error fetching syllabus data:', err);
        setError('Failed to load syllabus data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabusData();
  }, []);

  const [faculty] = useState<FacultyMember[]>([
    {
      id: 1,
      name: 'Mrs Anna',
      subject: 'Maths',
      imageUrl: '/img/meet-teachers/mrs_anna.png',
    },
    {
      id: 2,
      name: 'Miss Rashmi',
      subject: 'Physics',
      imageUrl: '/img/meet-teachers/miss_rohini.png',
    },
    {
      id: 3,
      name: 'Mr David',
      subject: 'Biology',
      imageUrl: '/img/meet-teachers/mr_ankit.png',
    },
    {
      id: 4,
      name: 'Mrs Anna',
      subject: 'Maths',
      imageUrl: '/img/meet-teachers/mrs_anna.png',
    },
  ]);
  useEffect(() => {
    if (autoCycleIndex < faculty.length) {
      setOpenedTeacherId(faculty[autoCycleIndex].id);
      setIsPopupOpen(true);

      const timeout = setTimeout(() => {
        setIsPopupOpen(false);

        setTimeout(() => {
          setAutoCycleIndex((prevIndex) => prevIndex + 1);
        }, 2000);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [autoCycleIndex]);
  const [topic_id] = useState<string>('');

  useEffect(() => {
    if (topic_id) {
      window.alert(topic_id);
    }
  }, [topic_id]);

  const handleDashboardBtnClick = async () => {
    try {
      const response = await axiosInstance.post('/auth/update-tracking', {
        introductionViewed: true,
      });
      if (response?.data?.tracking) {
        const userInfo = response.data.tracking;
        const setCookiePromise = new Promise<void>((resolve) => {
          // Set the cookie
          Cookies.set('userInfo', JSON.stringify(userInfo), {
            path: '/',
            sameSite: 'Lax',
            secure: true,
            expires: 30, // Adding expiration to increase persistence
          });

          // Resolve the promise
          resolve();
        });
        setCookiePromise.then(() => {
          // Force a small delay to ensure cookie is processed by the browser
          setTimeout(() => {
            // Prevent navigation interruption by using replace instead of push
            window.location.href = '/dashboard';
          }, 500);
        });
      } else {
        router.push('/meet-teachers');
      }
    } catch (error) {
      console.error('Error updating tracking:', error);
    }
  };

  const SyllabusSkeleton = () => (
    <div className='w-full mx-auto space-y-4 pl-3 md:pl-0'>
      <ol className='relative border-l-2 border-gray-300 border-dashed'>
        {[1, 2, 3, 4].map((_, index) => (
          <li key={index} className='mb-10 ms-6 md:ms-8'>
            <div className='absolute w-3 h-3 bg-gray-400 rounded-full mt-1 -start-1.5 border border-white'></div>
            <Skeleton className='mb-3 h-8 w-32 rounded-lg bg-primary/30 ' />
            <Skeleton className='mb-2 h-6 w-full max-w-md bg-primary/20' />
            <Skeleton className='mb-4 h-5 w-full max-w-xl bg-primary/20' />
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <>
      <div className='w-full text-small md:text-regular'>
        <div className='flex justify-between items-start'>
          <h1 className='text-2xl md:text-4xl font-bold opacity-80 text-gray-700 mb-10'>
            Meet your teachers
          </h1>
          <button
            className='bg-[var(--MainLight-color)] shadow-md text-lg h-10 md:h-10 px-6 rounded-lg'
            onClick={handleDashboardBtnClick}
          >
            Dashboard
          </button>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-10'>
          {faculty.map((teacher) => (
            <Dialog
              key={teacher.id}
              open={isPopupOpen && openedTeacherId === teacher.id}
              onOpenChange={setIsPopupOpen}
            >
              <DialogTrigger asChild>
                <button
                  className={`flex flex-col items-center ${
                    openedTeacherId == teacher.id
                      ? 'bg-[var(--MainLight-color)] scale-105 border-none outline-none'
                      : 'bg-white'
                  } rounded-xl md:rounded-2xl p-0 space-y-1 cursor-pointer ${
                    openedTeacherId == teacher.id ? 'shadow-md' : 'shadow-sm'
                  }  `}
                  onClick={() => setOpenedTeacherId(teacher.id)}
                >
                  <div className='relative w-full aspect-[4/5] outline-none border-none'>
                    <div className='relative h-full w-full'>
                      <Image
                        src={teacher.imageUrl || '/placeholder.svg'}
                        alt={`${teacher.name}'s profile`}
                        fill
                        className='object-cover'
                      />
                    </div>
                  </div>

                  <div className='w-full bg-[var(--Secondary-color)] mt-0 p-4 text-center space-y-1'>
                    <h3 className='font-semibold text-md md:text-2xl'>
                      {teacher.name}
                    </h3>
                    <p className='text-gray-600'>{teacher.subject}</p>
                  </div>
                </button>
              </DialogTrigger>

              <DialogContent className='h-[96%] lg:h-[90%] w-[96%] lg:w-[60%] rounded-xl md:rounded-2xl p-0 flex flex-col'>
                <div className='sticky top-0 z-10 bg-white p-6 pb-4 border-b-2 border-[var(--MainLight-color)] rounded-t-xl'>
                  <DialogHeader>
                    <DialogTitle className='text-xl text-left font-[600] tracking-normal flex flex-col md:flex-row'>
                      Study Plan & Syllabus{' '}
                      <span>
                        <span className='text-[var(--MainLight-color)] md:ml-2'>
                          {syllabusData?.subject
                            ? syllabusData.subject
                                .substring(0, 1)
                                .toUpperCase() +
                              syllabusData.subject.substring(1)
                            : teacher.subject}
                        </span>{' '}
                        <span className='opacity-30 md:ml-2'>
                          ({syllabusData?.duration + ' months' || ''})
                        </span>
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                </div>

                <div className='flex-1 overflow-y-auto p-3 md:p-8 md:pt-2 pt-4'>
                  {loading ? (
                    <SyllabusSkeleton />
                  ) : error ? (
                    <div className='flex text-lg justify-center items-center font-[600] text-center h-40 text-red-300'>
                      <p>{error}</p>
                    </div>
                  ) : (
                    <div className='w-full mx-auto space-y-4 pl-3 md:pl-0'>
                      <ol className='relative border-l-2 border-[var(--MainLight-color)] border-dashed'>
                        {syllabusData?.weekly_schedule &&
                        syllabusData?.weekly_schedule?.length > 0 ? (
                          syllabusData?.weekly_schedule.map((ele) => (
                            <li
                              key={ele.topic_id || ele.week}
                              className='mb-7 ms-6 md:ms-8'
                            >
                              <div className='absolute w-3 h-3 bg-black/50 rounded-full mt-1 -start-1.5 border border-white'></div>
                              <h1 className='mb-3 text-base font-[600] leading-none bg-[var(--Secondary-color)] w-fit rounded-lg px-3 py-2'>
                                Week {ele.week} - {ele.week + 1}
                              </h1>
                              <h1 className='mb-1 text-lg text-left font-[500] text-gray-900'>
                                {ele.topics}
                              </h1>
                              <p className='mb-4 text-base font-normal text-left text-gray-500 flex gap-1 place-items-start'>
                                <RxDash className='scale-x-150 size-5 text-black font-[600]' />
                                {ele.description}
                              </p>
                            </li>
                          ))
                        ) : (
                          <div className='flex text-lg justify-center items-center font-[600] text-center h-40 text-red-300'>
                            <p>
                              No syllabus data found for{' '}
                              {syllabusData?.subject || teacher.subject}
                            </p>
                          </div>
                        )}
                      </ol>
                    </div>
                  )}
                </div>
                <DialogFooter className='p-1'></DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <h1 className='text-small md:text-regular opacity-80 text-gray-800 my-10'>
          You can have a conversation with her and introduce yourself and brief
          her about your study plans.
        </h1>
      </div>
    </>
  );
}
