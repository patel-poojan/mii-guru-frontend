'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Availability {
  selectDay: string;
  timeAvailable: string;
  timeToSpend: string;
}

interface FormData {
  firstName: string;
  dob: string;
  email: string;
  phone: string;
  fatherName: string;
  motherName: string;
  currentAddress: string;
  city: string;
  country: string;
  schoolName: string;
  board: string;
  mediumOfStudy: string;
  classOrGrade: string;
  major: string;
  subjects: string[];
  otherSubjects: string;
  otherActivities: string;
  availability: Availability;
}

const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    dob: '',
    email: '',
    phone: '',
    fatherName: '',
    motherName: '',
    currentAddress: '',
    city: '',
    country: '',
    schoolName: '',
    board: '',
    mediumOfStudy: '',
    classOrGrade: '',
    major: '',
    subjects: [],
    otherSubjects: '',
    otherActivities: '',
    availability: {
      selectDay: '',
      timeAvailable: '',
      timeToSpend: '',
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='w-full max-w-[1200px] mx-auto p-4'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Personal Details */}
        <div className='bg-[#FDF6ED] p-6 rounded'>
          <h3 className='text-lg mb-6'>Personal Details</h3>

          <div className='relative'>
            {/* Left Column */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
              <div>
                <label className='block mb-2'>
                  Name<span className='text-red-500'>*</span>
                </label>
                <Input
                  type='text'
                  placeholder='Enter First Name'
                  className='w-full bg-white border-[#F1F1F3]'
                />
              </div>

              <div>
                <label className='block mb-2'>
                  Date of Birth<span className='text-red-500'>*</span>
                </label>
                <Input
                  type='text'
                  placeholder='dd-mm-yyyy'
                  className='w-full bg-white border-[#F1F1F3]'
                />
              </div>

              <div>
                <label className='block mb-2'>
                  Email<span className='text-red-500'>*</span>
                </label>
                <Input
                  type='email'
                  placeholder='Enter Email'
                  className='w-full bg-white border-[#F1F1F3]'
                />
              </div>

              <div>
                <label className='block mb-2'>
                  Phone<span className='text-red-500'>*</span>
                </label>
                <Input
                  type='tel'
                  placeholder='Enter Number'
                  className='w-full bg-white border-[#F1F1F3]'
                />
              </div>
            </div>

            {/* Upload Photo - Absolute Position */}
            <div className='absolute top-0 right-0'>
              <p className='text-sm text-gray-600 mb-2'>Upload Your Photo</p>
              <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-8 h-8 text-gray-400'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Parents Details */}
        <div className='bg-[#FFF5EB] rounded-lg p-6'>
          <h2 className='text-base font-medium text-gray-900 mb-4'>
            Parents Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
            <div className='relative'>
              <Label htmlFor='fatherName' className='text-sm text-gray-600'>
                Father Name*
              </Label>
              <Input
                id='fatherName'
                name='fatherName'
                placeholder='Enter Father Name'
                value={formData.fatherName}
                onChange={handleChange}
                className='mt-1 bg-white border-gray-200'
              />
            </div>
            <div className='relative'>
              <Label htmlFor='motherName' className='text-sm text-gray-600'>
                Mother Name*
              </Label>
              <Input
                id='motherName'
                name='motherName'
                placeholder='Enter Mother Name'
                value={formData.motherName}
                onChange={handleChange}
                className='mt-1 bg-white border-gray-200'
              />
            </div>
            <div className='relative col-span-2'>
              <Label htmlFor='currentAddress' className='text-sm text-gray-600'>
                Current Address*
              </Label>
              <Input
                id='currentAddress'
                name='currentAddress'
                placeholder='Enter Address'
                value={formData.currentAddress}
                onChange={handleChange}
                className='mt-1 bg-white border-gray-200'
              />
            </div>
            <div className='relative'>
              <Label htmlFor='city' className='text-sm text-gray-600'>
                City*
              </Label>
              <Input
                id='city'
                name='city'
                placeholder='Enter City'
                value={formData.city}
                onChange={handleChange}
                className='mt-1 bg-white border-gray-200'
              />
            </div>
            <div className='relative'>
              <Label htmlFor='country' className='text-sm text-gray-600'>
                Country*
              </Label>
              <Input
                id='country'
                name='country'
                placeholder='Enter Country'
                value={formData.country}
                onChange={handleChange}
                className='mt-1 bg-white border-gray-200'
              />
            </div>
          </div>
        </div>

        {/* Educational Details */}
        <div className='bg-[#FFF5EB] rounded-lg p-6'>
          <h2 className='text-base font-medium text-gray-900 mb-4'>
            Educational Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
            <div className='relative'>
              <Label htmlFor='schoolName' className='text-sm text-gray-600'>
                School Name*
              </Label>
              <Input
                id='schoolName'
                name='schoolName'
                placeholder='Enter School Name'
                value={formData.schoolName}
                onChange={handleChange}
                className='mt-1 bg-white border-gray-200'
              />
            </div>
            <div className='relative'>
              <Label htmlFor='board' className='text-sm text-gray-600'>
                Board*
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, board: value }))
                }
              >
                <SelectTrigger className='mt-1 bg-white border-gray-200'>
                  <SelectValue placeholder='Enter Board' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='cbse'>CBSE</SelectItem>
                  <SelectItem value='icse'>ICSE</SelectItem>
                  <SelectItem value='state'>State Board</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='relative'>
              <Label htmlFor='mediumOfStudy' className='text-sm text-gray-600'>
                Medium of Study*
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, mediumOfStudy: value }))
                }
              >
                <SelectTrigger className='mt-1 bg-white border-gray-200'>
                  <SelectValue placeholder='Enter Medium of Study' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='english'>English</SelectItem>
                  <SelectItem value='hindi'>Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='relative'>
              <Label htmlFor='classOrGrade' className='text-sm text-gray-600'>
                Class/Grade*
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, classOrGrade: value }))
                }
              >
                <SelectTrigger className='mt-1 bg-white border-gray-200'>
                  <SelectValue placeholder='Enter Class/Grade' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='9'>Grade 9</SelectItem>
                  <SelectItem value='10'>Grade 10</SelectItem>
                  <SelectItem value='11'>Grade 11</SelectItem>
                  <SelectItem value='12'>Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='relative col-span-2'>
              <Label htmlFor='major' className='text-sm text-gray-600'>
                Major (if applicable)
              </Label>
              <Input
                id='major'
                name='major'
                placeholder='Enter Major'
                value={formData.major}
                onChange={handleChange}
                className='mt-1 bg-white border-gray-200'
              />
            </div>
          </div>
        </div>

        {/* Course Selection */}
        <div className='bg-[#FFF5EB] rounded-lg p-6'>
          <h2 className='text-base font-medium text-gray-900 mb-4'>
            Course Selection
          </h2>
          <div className='space-y-6'>
            <div>
              <Label className='text-sm text-gray-600 block mb-3'>
                Subject you wish to study on mGuru*
              </Label>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {['Mathematics', 'Physics', 'Chemistry', 'Biology'].map(
                  (subject) => (
                    <div key={subject} className='flex items-center space-x-2'>
                      <Checkbox
                        id={subject}
                        checked={formData.subjects.includes(subject)}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            setFormData((prev) => ({
                              ...prev,
                              subjects: [...prev.subjects, subject],
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              subjects: prev.subjects.filter(
                                (s) => s !== subject
                              ),
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={subject} className='text-sm'>
                        {subject}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
              <div className='relative'>
                <Label
                  htmlFor='otherSubjects'
                  className='text-sm text-gray-600'
                >
                  Other Subjects
                </Label>
                <Input
                  id='otherSubjects'
                  name='otherSubjects'
                  placeholder='Enter Other Subject'
                  value={formData.otherSubjects}
                  onChange={handleChange}
                  className='mt-1 bg-white border-gray-200'
                />
              </div>
              <div className='relative'>
                <Label
                  htmlFor='otherActivities'
                  className='text-sm text-gray-600'
                >
                  Other Activities of Interest
                </Label>
                <Input
                  id='otherActivities'
                  name='otherActivities'
                  placeholder='Enter Other Activities of Interest'
                  value={formData.otherActivities}
                  onChange={handleChange}
                  className='mt-1 bg-white border-gray-200'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className='bg-[#FFF5EB] rounded-lg p-6'>
          <h2 className='text-base font-medium text-gray-900 mb-4'>
            Availability
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4'>
            <div className='relative'>
              <Label htmlFor='selectDay' className='text-sm text-gray-600'>
                Select Day*
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: { ...prev.availability, selectDay: value },
                  }))
                }
              >
                <SelectTrigger className='mt-1 bg-white border-gray-200'>
                  <SelectValue placeholder='Select Date' />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ].map((day) => (
                    <SelectItem key={day} value={day.toLowerCase()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='relative'>
              <Label htmlFor='timeAvailable' className='text-sm text-gray-600'>
                Time Available/Day*
              </Label>
              <Input
                id='timeAvailable'
                name='timeAvailable'
                type='time'
                value={formData.availability.timeAvailable}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      timeAvailable: e.target.value,
                    },
                  }))
                }
                className='mt-1 bg-white border-gray-200'
              />
            </div>
            <div className='relative'>
              <Label htmlFor='timeToSpend' className='text-sm text-gray-600'>
                Time to Study*
              </Label>
              <Input
                id='timeToSpend'
                name='timeToSpend'
                type='time'
                value={formData.availability.timeToSpend}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      timeToSpend: e.target.value,
                    },
                  }))
                }
                className='mt-1 bg-white border-gray-200'
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <Button
            type='submit'
            className='bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8 py-2 rounded'
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingForm;
