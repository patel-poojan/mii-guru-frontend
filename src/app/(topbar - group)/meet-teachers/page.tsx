'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';

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

export default function Index() {
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
        {
          weeks: 'Week 3-4',
          title: 'Algebra',
          subtitle:
            'Linear Equations, Polynomials, Factorization, Quadratic Equations',
          topics: [
            'Linear Equations',
            'Polynomials',
            'Factorization',
            'Quadratic Equations',
          ],
        },
        {
          weeks: 'Week 5-6',
          title: 'Geometry',
          subtitle: 'Triangles, Circles, Quadrilaterals, Coordinate Geometry',
          topics: [
            'Triangles',
            'Circles',
            'Quadrilaterals',
            'Coordinate Geometry',
          ],
        },
        {
          weeks: 'Week 7-8',
          title: 'Mensuration',
          subtitle: 'Area & Volume of 2D and 3D shapes',
          topics: ['Area of 2D shapes', 'Volume of 3D shapes'],
        },
        {
          weeks: 'Week 9-10',
          title: 'Probability & Statistics',
          subtitle: 'Mean, Median, Mode, Probability Basics',
          topics: ['Mean', 'Median', 'Mode', 'Probability Basics'],
        },
        {
          weeks: 'Week 11-12',
          title: 'Trigonometry & Introduction to Calculus',
          subtitle:
            'Ratios, Identities, Heights & Distances, Limits, Differentiation, Integration',
          topics: [
            'Ratios',
            'Identities',
            'Heights & Distances',
            'Limits',
            'Differentiation',
            'Integration',
          ],
        },
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
        {
          weeks: 'Week 3-4',
          title: 'Energy & Work',
          subtitle: 'Energy Forms, Conservation, and Power',
          topics: [
            'Work and Energy',
            'Conservation of Energy',
            'Power',
            'Simple Machines',
          ],
        },
        {
          weeks: 'Week 5-6',
          title: 'Waves & Sound',
          subtitle: 'Wave Properties, Sound Waves, and Applications',
          topics: [
            'Wave Properties',
            'Sound Waves',
            'Doppler Effect',
            'Musical Instruments',
          ],
        },
        {
          weeks: 'Week 7-8',
          title: 'Heat & Thermodynamics',
          subtitle: 'Temperature, Heat Transfer, and Laws',
          topics: [
            'Temperature & Heat',
            'Heat Transfer',
            'Laws of Thermodynamics',
          ],
        },
        {
          weeks: 'Week 9-10',
          title: 'Electricity & Magnetism',
          subtitle: 'Electric Charges, Circuits, and Magnetic Fields',
          topics: [
            'Electric Charges',
            'Electric Circuits',
            'Magnetism',
            'Electromagnetic Induction',
          ],
        },
        {
          weeks: 'Week 11-12',
          title: 'Modern Physics',
          subtitle: 'Atomic Structure, Light, and Nuclear Physics',
          topics: [
            'Atomic Structure',
            'Photoelectric Effect',
            'Nuclear Physics',
            'Relativity Basics',
          ],
        },
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
        {
          weeks: 'Week 3-4',
          title: 'Human Physiology I',
          subtitle: 'Digestive and Respiratory Systems',
          topics: [
            'Digestive System',
            'Nutrition',
            'Respiratory System',
            'Gas Exchange',
          ],
        },
        {
          weeks: 'Week 5-6',
          title: 'Human Physiology II',
          subtitle: 'Circulatory and Nervous Systems',
          topics: [
            'Circulatory System',
            'Blood',
            'Nervous System',
            'Brain Functions',
          ],
        },
        {
          weeks: 'Week 7-8',
          title: 'Genetics',
          subtitle: 'Inheritance and DNA',
          topics: [
            'DNA Structure',
            'Inheritance',
            'Genetic Disorders',
            'Evolution',
          ],
        },
        {
          weeks: 'Week 9-10',
          title: 'Ecology',
          subtitle: 'Ecosystems and Environmental Biology',
          topics: [
            'Ecosystems',
            'Food Chains',
            'Biodiversity',
            'Environmental Conservation',
          ],
        },
        {
          weeks: 'Week 11-12',
          title: 'Plant Biology',
          subtitle: 'Plant Structure, Function, and Reproduction',
          topics: [
            'Plant Anatomy',
            'Photosynthesis',
            'Plant Reproduction',
            'Plant Responses',
          ],
        },
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
        {
          weeks: 'Week 3-4',
          title: 'Algebra',
          subtitle:
            'Linear Equations, Polynomials, Factorization, Quadratic Equations',
          topics: [
            'Linear Equations',
            'Polynomials',
            'Factorization',
            'Quadratic Equations',
          ],
        },
        {
          weeks: 'Week 5-6',
          title: 'Geometry',
          subtitle: 'Triangles, Circles, Quadrilaterals, Coordinate Geometry',
          topics: [
            'Triangles',
            'Circles',
            'Quadrilaterals',
            'Coordinate Geometry',
          ],
        },
        {
          weeks: 'Week 7-8',
          title: 'Mensuration',
          subtitle: 'Area & Volume of 2D and 3D shapes',
          topics: ['Area of 2D shapes', 'Volume of 3D shapes'],
        },
        {
          weeks: 'Week 9-10',
          title: 'Probability & Statistics',
          subtitle: 'Mean, Median, Mode, Probability Basics',
          topics: ['Mean', 'Median', 'Mode', 'Probability Basics'],
        },
        {
          weeks: 'Week 11-12',
          title: 'Trigonometry & Introduction to Calculus',
          subtitle:
            'Ratios, Identities, Heights & Distances, Limits, Differentiation, Integration',
          topics: [
            'Ratios',
            'Identities',
            'Heights & Distances',
            'Limits',
            'Differentiation',
            'Integration',
          ],
        },
      ],
    },
  ]);

  const [openedTeacherId, setOpenedTeacherId] = useState<number>(1);
  const currentTeacher = faculty.find(
    (teacher) => teacher.id === openedTeacherId
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
              <DialogContent className='h-[96%] w-[96%] rounded-xl md:rounded-2xl p-3 md:p-8 overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle className='text-xl text-left font-[600] tracking-normal  border-b-2 pb-4  border-[var(--MainLight-color)] flex flex-col md:flex-row'>
                    Study Plan & Syllabus{' '}
                    <span className='text-[var(--MainLight-color)] md:ml-2'>
                      {' '}
                      {
                        faculty.find(
                          (teacher) => teacher.id === openedTeacherId
                        )?.subject
                      }{' '}
                      -{' '}
                      {
                        faculty.find(
                          (teacher) => teacher.id === openedTeacherId
                        )?.name
                      }
                    </span>
                  </DialogTitle>
                  {/* <DialogDescription>xyz</DialogDescription> */}
                </DialogHeader>
                <div className='min-h-screen w-full mx-auto grid grid-cols-1 md:grid-cols-[1fr_0.2fr] md:gap-4'>
                  <div className='w-full mx-auto space-y-4 mt-2'>
                    {faculty
                      .find((teacher) => teacher.id === openedTeacherId)
                      ?.syllabus.map((section, index) => (
                        // {faculty.find()openedTeacherId.syllabus.map((section, index) => (
                        <Card
                          key={index}
                          className='group shadow-md transition-all duration-300 bg-[var(--Secondary-color)] border-none'
                        >
                          <CardContent className='p-4 md:p-6'>
                            <div className='space-y-2'>
                              <div className='flex items-start justify-between w-full'>
                                <div className='w-full'>
                                  <h2 className='text-lg md:text-xl font-[600] text-gray-900 border-b-4 pb-2 mb-2 border-white'>
                                    {section.weeks}
                                  </h2>
                                  <h3 className=' font-[600] text-gray-800'>
                                    {section.title}
                                  </h3>
                                </div>
                              </div>
                              <p className='text-sm md:text-base text-gray-600'>
                                <li>{section.subtitle}</li>
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                  <div className='hidden md:flex flex-col w-full gap-3'>
                    <Image
                      src={
                        currentTeacher?.imageUrl.toString() ||
                        '/placeholder.svg'
                      }
                      width={500}
                      height={500}
                      alt='teacher'
                      className=' rounded-xl mx-auto'
                    />
                    <div className='flex justify-center gap-6'>
                      <Button
                        className='h-10 md:h-10 w-10 text-small md:text-regular px-4 bg-[var(--MainLight-color)] hover:bg-[var(--MainLight-color)] text-gray-900 font-medium'
                        disabled={openedTeacherId === 1}
                        onClick={() => {
                          // if (openedTeacherId === faculty.length) {
                          //   setOpenedTeacherId(1);
                          // } else {
                          setOpenedTeacherId(openedTeacherId - 1);
                          // }
                        }}
                      >
                        <MdOutlineNavigateBefore className='h-10 w-10 scale-[2]' />
                      </Button>
                      <Button
                        className='h-10 md:h-10 w-10  px-4 bg-[var(--MainLight-color)] hover:bg-[var(--MainLight-color)] text-gray-900 font-medium'
                        disabled={openedTeacherId === faculty.length}
                        onClick={() => {
                          // if (openedTeacherId === 2) {
                          //   setOpenedTeacherId(1);
                          // } else {
                          setOpenedTeacherId(openedTeacherId + 1);
                          // }
                        }}
                      >
                        <MdOutlineNavigateNext className='h-10 w-10 scale-[2]' />
                      </Button>
                    </div>
                  </div>

                  <div className='flex justify-between py-4 pb-8 col-span-2'>
                    <Button
                      className={`"h-10 md:h-12 text-small md:text-regular px-4 bg-[var(--MainLight-color)] hover:bg-[var(--MainLight-color)] text-gray-900 font-medium ${
                        openedTeacherId === 1 ? 'opacity-0 cursor-default' : ''
                      }`}
                      disabled={openedTeacherId === 1}
                      onClick={() => {
                        // if (openedTeacherId === 1) {
                        //   setOpenedTeacherId(1);
                        // } else {
                        setOpenedTeacherId(openedTeacherId - 1);
                        // }
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      className='h-10 md:h-12 text-small md:text-regular px-4 bg-[var(--MainLight-color)] hover:bg-[var(--MainLight-color)] text-gray-900 font-medium'
                      disabled={openedTeacherId === faculty.length}
                      onClick={() => {
                        // if (openedTeacherId === faculty.length) {
                        //   setOpenedTeacherId(1);
                        // } else {
                        setOpenedTeacherId(openedTeacherId + 1);
                        // }
                      }}
                    >
                      Next Teacher
                    </Button>
                  </div>
                </div>

                <DialogFooter></DialogFooter>
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
