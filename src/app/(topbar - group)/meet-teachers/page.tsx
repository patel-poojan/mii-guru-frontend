'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RxDash } from "react-icons/rx";
import { Skeleton } from "@/components/ui/skeleton";

interface FacultyMember {
  id: number;
  name: string;
  subject: string;
  imageUrl: string;
  syllabus: WeekSection[];
}

interface WeekSection {
  weeks: string;
  title: string;
  subtitle: string;
  topics: string[];
}

interface SyllabusResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    subject: string;
    class_grade: string;
    duration: string;
    weekly_schedule: WeeklySchedule[];
  };
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
  const [syllabusData, setSyllabusData] = useState<SyllabusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const base_url = "http://3.6.140.234:8002";
  const AUTH_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXJ0aGt1a2FkaXlhNzFAZ21haWwuY29tIiwiZXhwIjoxNzQzNDEyMzgzLjM4MzI0N30.s3RBtzAD0hFtLUNQ1bZx5GpF3c43NfdlW3-XRzPwPUM";
const subject ="biology"
const class_grade = "9"
  useEffect(() => {
    const fetchSyllabusData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base_url}/user/syllabus/${subject}?class_grade=${class_grade}`,
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          }
        );
        setSyllabusData(response.data);
      } catch (err) {
        console.log("Error fetching syllabus data:", err);
        setError("Failed to load syllabus data. Please try again later.");
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
      syllabus: [
        {
          weeks: 'Week 1-2',
          title: 'Numbers & Operations',
          subtitle:
            'Fractions, Decimals, BODMAS, Rational & Irrational Numbers',
          topics: [
            'Fractions',
            'Decimals',
            'BODMAS',
            'Rational & Irrational Numbers',
          ],
        },
        // ... other syllabus sections
      ],
    },
    {
      id: 2,
      name: 'Miss Rashmi',
      subject: 'Physics',
      imageUrl: '/img/meet-teachers/miss_rohini.png',
      syllabus: [
        {
          weeks: 'Week 1-2',
          title: 'Mechanics',
          subtitle: "Motion, Forces, and Newton's Laws",
          topics: [
            'Kinematics',
            "Newton's Laws of Motion",
            'Friction',
            'Gravitation',
          ],
        },
        // ... other syllabus sections
      ],
    },
    {
      id: 3,
      name: 'Mr David',
      subject: 'Biology',
      imageUrl: '/img/meet-teachers/mr_ankit.png',
      syllabus: [
        {
          weeks: 'Week 1-2',
          title: 'Cell Biology',
          subtitle: 'Cell Structure, Function, and Division',
          topics: [
            'Cell Structure',
            'Cell Organelles',
            'Cell Division',
            'Cell Transport',
          ],
        },
        // ... other syllabus sections
      ],
    },
    {
      id: 4,
      name: 'Mrs Anna',
      subject: 'Maths',
      imageUrl: '/img/meet-teachers/mrs_anna.png',
      syllabus: [
        {
          weeks: 'Week 1-2',
          title: 'Numbers & Operations',
          subtitle:
            'Fractions, Decimals, BODMAS, Rational & Irrational Numbers',
          topics: [
            'Fractions',
            'Decimals',
            'BODMAS',
            'Rational & Irrational Numbers',
          ],
        },
        // ... other syllabus sections
      ],
    },
  ]);
  
  const [ , setOpenedTeacherId] = useState<number>();
  const [topic_id, setTopicId] = useState<string>("");
  
  const handleTopicClick = (id:string) => {
    setTopicId(id);
  }
  
  useEffect(() => {
    if (topic_id) {
      window.alert(topic_id);
    }
  }, [topic_id]);
  const SyllabusSkeleton = () => (
    <div className="w-full mx-auto space-y-4 pl-3 md:pl-0">
      <ol className="relative border-l-2 border-gray-300 border-dashed">
        {[1, 2, 3, 4].map((_, index) => (
          <li key={index} className="mb-10 ms-6 md:ms-8">
            <div className="absolute w-3 h-3 bg-gray-400 rounded-full mt-1 -start-1.5 border border-white"></div>
            <Skeleton className="mb-3 h-8 w-32 rounded-lg bg-primary/30 " />
            <Skeleton className="mb-2 h-6 w-full max-w-md bg-primary/20" />
            <Skeleton className="mb-4 h-5 w-full max-w-xl bg-primary/20" />
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <>
      <div className='w-full text-small md:text-regular'>
        <h1 className='text-2xl md:text-4xl font-bold opacity-80 text-gray-700 mb-10'>
          Meet your teachers
        </h1>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-10'>
          {faculty.map((teacher) => (
            <Dialog key={teacher.id}>
              <DialogTrigger asChild>
                <button
                  className='flex flex-col items-center '
                  onClick={() => setOpenedTeacherId(teacher.id)}
                >
                  <div className='relative w-full aspect-[4/5]'>
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

              <DialogContent className="h-[96%] lg:h-[90%] w-[96%] lg:w-[60%] rounded-xl md:rounded-2xl p-0 flex flex-col">
                <div className="sticky top-0 z-10 bg-white p-6 pb-4 border-b-2 border-[var(--MainLight-color)] rounded-t-xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-left font-[600] tracking-normal flex flex-col md:flex-row">
                      Study Plan & Syllabus{" "}
                      <span className="text-[var(--MainLight-color)] md:ml-2">
                        {syllabusData?.data?.subject ? 
                          syllabusData.data.subject.substring(0, 1).toUpperCase() + 
                          syllabusData.data.subject.substring(1) : 
                          teacher.subject}
                      </span>{" "}
                      <span className="text-[var(--MainLight-color)] md:ml-2">
                        ({syllabusData?.data?.duration || "3 months"})
                      </span>
                    </DialogTitle>
                  </DialogHeader>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 md:p-8 pt-4">
                  {loading ? (
                    <SyllabusSkeleton />
                  ) : error ? (
                    <div className="flex text-lg justify-center items-center font-[600] text-center h-40 text-red-300">
                      <p>{error}</p>
                    </div>
                  ) : (
                    <div className="w-full mx-auto space-y-4 pl-3 md:pl-0">
                      <ol className="relative border-l-2 border-[var(--MainLight-color)] border-dashed">
                        {syllabusData?.data?.weekly_schedule?.map((ele) => (
                          <li key={ele.topic_id || ele.week} className="mb-7 ms-6 md:ms-8">
                            <div className="absolute w-3 h-3 bg-black/50 rounded-full mt-1 -start-1.5 border border-white"></div>
                            <h1 className="mb-3 text-base font-[600] leading-none bg-[var(--Secondary-color)] w-fit rounded-lg px-3 py-2">
                              Week {ele.week}{" "}-{" "}{ele.week + 1}
                            </h1>
                            <button 
                              className="mb-1 text-lg font-[500] text-gray-900" 
                              onClick={() => handleTopicClick(ele?.topic_id)}
                            >
                              {ele.topics}
                            </button>
                            <p className="mb-4 text-base font-normal text-gray-500 flex gap-1 place-items-start">
                              <RxDash className="scale-x-150 size-5 text-black font-[600]" />
                              {ele.description}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
                <DialogFooter className="p-1"></DialogFooter>
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
