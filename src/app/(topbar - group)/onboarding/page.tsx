'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Select from 'react-select';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { IoClose } from 'react-icons/io5';
import {
  StylesConfig as ReactSelectStylesConfig,
  GroupBase,
} from 'react-select';
import { toast } from 'sonner';
import { emailRegex } from '../../utils/regex-collection';
// Types for select options
interface SelectOption {
  value: string;
  label: string;
}

const customSelectStyles: ReactSelectStylesConfig<
  SelectOption,
  false,
  GroupBase<SelectOption>
> = {
  control: (base) => ({
    ...base,
    backgroundColor: '#FCFCFD',
    borderColor: '#F1F1F3',
    padding: '0rem 0.75rem',
    borderRadius: '0.375rem',
    minHeight: '42px',
    fontSize: '0.875rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#F1F1F3',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: '#656567 !important',
    fontSize: '0.875rem',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#F1F1F3' : 'white',
    color: '#000000',
    '&:hover': {
      backgroundColor: '#F1F1F3',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#656567',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'white',
    zIndex: 50,
  }),
};
// Keep existing CSS classes
const SECTION_CLASS = 'bg-[#FFF3E4] p-4 sm:p-6 lg:p-8 rounded-xl';
const SECTION_TITLE_CLASS =
  'text-lg sm:text-xl font-medium text-black mb-4 sm:mb-5';
const LABEL_CLASS = 'block mb-2 sm:mb-3 text-black text-sm';
const INPUT_CLASS =
  'w-full bg-[#FCFCFD] border-[#F1F1F3] p-3 sm:p-5 !text-[#656567] !placeholder:text-[#656567] !text-sm sm:!text-base placeholder:!text-sm';
const GRID_CONTAINER_CLASS =
  'flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4';

// Interface for availability
interface Availability {
  selectedDays: string[];
  timeAvailable: string;
  timeToFinish: string;
}

// Interface for form data
interface FormData {
  firstName: string;
  dob: string;
  email: string;
  photo: File | null;
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

// Interface for education options
interface EducationOptions {
  boards: SelectOption[];
  mediums: SelectOption[];
  grades: SelectOption[];
  subjects: string[];
}

interface RequiredFormFields {
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
  subjects: string[];
}

const OnboardingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    dob: '',
    email: '',
    photo: null,
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
      selectedDays: [],
      timeAvailable: '',
      timeToFinish: '',
    },
  });

  const EDUCATION_OPTIONS: EducationOptions = {
    boards: ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE'].map((board) => ({
      value: board.toLowerCase(),
      label: board,
    })),
    mediums: [
      'English',
      'Hindi',
      'Bengali',
      'Tamil',
      'Telugu',
      'Kannada',
      'Malayalam',
    ].map((medium) => ({
      value: medium.toLowerCase(),
      label: medium,
    })),
    grades: Array.from({ length: 4 }, (_, i) => i + 9).map((grade) => ({
      value: grade.toString(),
      label: `Grade ${grade}`,
    })),
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
  };

  const AVAILABLE_DAYS: SelectOption[] = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ].map((day) => ({
    value: day.toLowerCase(),
    label: day,
  }));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  const handleCheckboxChange = (
    checked: boolean | string,
    subject: string
  ): void => {
    const isChecked = typeof checked === 'boolean' ? checked : false;
    setFormData((prev) => ({
      ...prev,
      subjects: isChecked
        ? [...prev.subjects, subject]
        : prev.subjects.filter((s) => s !== subject),
    }));
  };
  const GradeSelect = React.memo(function GradeSelect() {
    return (
      <Select<SelectOption>
        instanceId='grade-select'
        menuPlacement='auto'
        styles={customSelectStyles}
        options={EDUCATION_OPTIONS.grades}
        placeholder='Enter Class/Grade'
        value={EDUCATION_OPTIONS.grades.find(
          (option) => option.value === formData.classOrGrade
        )}
        onChange={(option) =>
          setFormData((prev) => ({
            ...prev,
            classOrGrade: option?.value || '',
          }))
        }
      />
    );
  });
  const BoardSelect = React.memo(function BoardSelect() {
    return (
      <Select<SelectOption>
        instanceId='board-select'
        menuPlacement='auto'
        styles={customSelectStyles}
        options={EDUCATION_OPTIONS.boards}
        placeholder='Enter Board'
        value={EDUCATION_OPTIONS.boards.find(
          (option) => option.value === formData.board
        )}
        onChange={(option) =>
          setFormData((prev) => ({ ...prev, board: option?.value || '' }))
        }
      />
    );
  });

  const MediumSelect = React.memo(function MediumSelect() {
    return (
      <Select<SelectOption>
        instanceId='medium-select'
        menuPlacement='auto'
        styles={customSelectStyles}
        options={EDUCATION_OPTIONS.mediums}
        placeholder='Enter Medium of Study'
        value={EDUCATION_OPTIONS.mediums.find(
          (option) => option.value === formData.mediumOfStudy
        )}
        onChange={(option) =>
          setFormData((prev) => ({
            ...prev,
            mediumOfStudy: option?.value || '',
          }))
        }
      />
    );
  });
  const DaysSelect = React.memo(function DaysSelect() {
    return (
      <Select<SelectOption>
        instanceId='days-select'
        menuPlacement='auto'
        styles={customSelectStyles}
        options={AVAILABLE_DAYS}
        placeholder='Select Days'
        value={null}
        onChange={(option) => {
          if (option) {
            setFormData((prev) => ({
              ...prev,
              availability: {
                ...prev.availability,
                selectedDays: prev.availability.selectedDays.includes(
                  option.value
                )
                  ? prev.availability.selectedDays.filter(
                      (day) => day !== option.value
                    )
                  : [...prev.availability.selectedDays, option.value],
              },
            }));
          }
        }}
      />
    );
  });

  const TimeToFinishSelect = React.memo(function TimeToFinishSelect() {
    const timeOptions: SelectOption[] = [1, 2, 3, 4, 5, 6].map((months) => ({
      value: months.toString(),
      label:
        months === 1 ? '01 Month' : `${String(months).padStart(2, '0')} Months`,
    }));

    return (
      <Select<SelectOption>
        instanceId='time-finish-select'
        styles={customSelectStyles}
        menuPlacement='auto'
        options={timeOptions}
        placeholder='00 Months'
        value={timeOptions.find(
          (option) => option.value === formData.availability.timeToFinish
        )}
        onChange={(option) =>
          setFormData((prev) => ({
            ...prev,
            availability: {
              ...prev.availability,
              timeToFinish: option?.value || '',
            },
          }))
        }
      />
    );
  });
  type RequiredFieldKey = keyof RequiredFormFields;
  // Required fields validation mapping
  const requiredFields: Record<RequiredFieldKey, string> = {
    firstName: 'Name',
    dob: 'Date of Birth',
    email: 'Email',
    phone: 'Phone',
    fatherName: 'Father Name',
    motherName: 'Mother Name',
    currentAddress: 'Current Address',
    city: 'City',
    country: 'Country',
    schoolName: 'School Name',
    board: 'Board',
    mediumOfStudy: 'Medium of Study',
    classOrGrade: 'Class/Grade',
    subjects: 'Subjects',
  };
  const validateForm = React.useCallback((data: FormData): string | null => {
    // Validate required fields
    const missingFields = Object.entries(requiredFields).filter(([key]) => {
      const typedKey = key as RequiredFieldKey;
      if (typedKey === 'subjects') {
        return data.subjects.length === 0;
      }
      return !data[typedKey];
    });

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(([, label]) => label).join(', ');
      return `Please fill in the following required fields: ${fieldNames}`;
    }

    // Validate availability
    if (data.availability.selectedDays.length === 0) {
      return 'Please select available days';
    }

    if (!data.availability.timeAvailable) {
      return 'Please enter time available per day';
    }

    if (!data.availability.timeToFinish) {
      return 'Please select time to finish';
    }

    // Validate email format
    if (!emailRegex.test(data.email)) {
      return 'Please enter a valid email address';
    }

    // Validate phone number
    if (!/^\d+$/.test(data.phone)) {
      return 'Please enter a valid phone number';
    }

    return null;
  }, []);
  const handleSubmit = React.useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      const validationError = validateForm(formData);
      if (validationError) {
        toast.warning(validationError);
        return;
      }

      toast.success('Form submitted successfully!');
      console.log(formData);
    },
    [formData, validateForm]
  );
  return (
    <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
      {/* Personal Details */}
      <div className={SECTION_CLASS}>
        <h3 className={SECTION_TITLE_CLASS}>Personal Details</h3>
        <div className='flex flex-col md:flex-row gap-4 sm:gap-6'>
          <div className={GRID_CONTAINER_CLASS}>
            <div>
              <Label className={LABEL_CLASS}>
                Name<span className='text-red-500'>*</span>
              </Label>
              <Input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='Enter First Name'
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <Label className={LABEL_CLASS}>
                Date of Birth<span className='text-red-500'>*</span>
              </Label>
              <Input
                type='date'
                name='dob'
                value={formData.dob}
                onChange={handleChange}
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <Label className={LABEL_CLASS}>
                Email<span className='text-red-500'>*</span>
              </Label>
              <Input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter Email'
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <Label className={LABEL_CLASS}>
                Phone<span className='text-red-500'>*</span>
              </Label>
              <Input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                placeholder='Enter Number'
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {/* Photo Upload */}
          <div className='md:items-end w-full md:w-auto'>
            <div className={LABEL_CLASS}>Upload Your Photo</div>
            <div className='w-24 h-24 sm:w-28 sm:h-28 border bg-[#FCFCFD] border-[#F1F1F3] rounded-lg relative'>
              <input
                type='file'
                id='photo-upload'
                name='photo'
                accept='image/*'
                onChange={handlePhotoChange}
                className='hidden'
              />
              <label
                htmlFor='photo-upload'
                className='w-full h-full flex flex-col items-center justify-center cursor-pointer'
              >
                {formData.photo ? (
                  <Image
                    src={URL.createObjectURL(formData.photo)}
                    alt='Profile'
                    className='w-full h-full object-cover rounded-lg'
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className='flex flex-col items-center justify-center w-full h-full bg-[#FCFCFD]'>
                    <Image
                      src='/img/upload-pic.svg'
                      alt='Profile'
                      width={60}
                      height={60}
                      className='w-full h-full p-4 sm:p-5 object-cover rounded-lg'
                    />
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Parents Details */}
      <div className={SECTION_CLASS}>
        <h3 className={SECTION_TITLE_CLASS}>Parents Details</h3>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <Label className={LABEL_CLASS}>
                Father Name<span className='text-red-500'>*</span>
              </Label>
              <Input
                name='fatherName'
                value={formData.fatherName}
                onChange={handleChange}
                placeholder='Enter Father Name'
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>
                Mother Name<span className='text-red-500'>*</span>
              </Label>
              <Input
                name='motherName'
                value={formData.motherName}
                onChange={handleChange}
                placeholder='Enter Mother Name'
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div>
            <Label className={LABEL_CLASS}>
              Current Address<span className='text-red-500'>*</span>
            </Label>
            <Textarea
              name='currentAddress'
              value={formData.currentAddress}
              onChange={handleChange}
              placeholder='Enter Address'
              className={`${INPUT_CLASS} min-h-[100px] placeholder:!text-[#656567]`}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <Label className={LABEL_CLASS}>
                City<span className='text-red-500'>*</span>
              </Label>
              <Input
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='Enter City'
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>
                Country<span className='text-red-500'>*</span>
              </Label>
              <Input
                name='country'
                value={formData.country}
                onChange={handleChange}
                placeholder='Enter Country'
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Educational Details */}
      <div className={SECTION_CLASS}>
        <h3 className={SECTION_TITLE_CLASS}>Educational Details</h3>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <Label className={LABEL_CLASS}>
                School Name<span className='text-red-500'>*</span>
              </Label>
              <Input
                name='schoolName'
                value={formData.schoolName}
                onChange={handleChange}
                placeholder='Enter School Name'
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>
                Board<span className='text-red-500'>*</span>
              </Label>
              <BoardSelect />
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <Label className={LABEL_CLASS}>
                Medium of Study<span className='text-red-500'>*</span>
              </Label>
              <MediumSelect />
            </div>
            <div>
              <Label className={LABEL_CLASS}>
                Class/Grade<span className='text-red-500'>*</span>
              </Label>
              <GradeSelect />
            </div>
          </div>

          <div>
            <Label className={LABEL_CLASS}>Major (if applicable)</Label>
            <Input
              name='major'
              value={formData.major}
              onChange={handleChange}
              placeholder='Enter Major'
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className={SECTION_CLASS}>
        <h3 className={SECTION_TITLE_CLASS}>Course Selection</h3>
        <div className='space-y-4 sm:space-y-6'>
          <div>
            <Label className={LABEL_CLASS}>
              Subject you wish to study on mGuru
              <span className='text-red-500'>*</span>
            </Label>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4'>
              {EDUCATION_OPTIONS.subjects.map((subject) => (
                <div key={subject} className='flex items-center space-x-2'>
                  <Checkbox
                    id={subject}
                    checked={formData.subjects.includes(subject)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked, subject)
                    }
                  />
                  <Label htmlFor={subject} className='text-sm'>
                    {subject}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className={GRID_CONTAINER_CLASS}>
            <div>
              <Label className={LABEL_CLASS}>Other Subjects</Label>
              <Input
                name='otherSubjects'
                value={formData.otherSubjects}
                onChange={handleChange}
                placeholder='Enter Other Subject'
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>
                Other Activities of Interest
              </Label>
              <Input
                name='otherActivities'
                value={formData.otherActivities}
                onChange={handleChange}
                placeholder='Enter Other Activities of Interest'
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className={SECTION_CLASS}>
        <h3 className={SECTION_TITLE_CLASS}>Availability</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-4'>
          <div>
            <Label className={LABEL_CLASS}>
              Select Days<span className='text-red-500'>*</span>
            </Label>
            <DaysSelect />
            <div className='flex flex-wrap gap-2 mt-2'>
              {formData.availability.selectedDays.map((day) => (
                <div
                  key={day}
                  className='inline-flex items-center px-3 py-1 border border-[#F1F1F3] bg-[#FCFCFD] rounded text-sm'
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                  <button
                    type='button'
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        availability: {
                          ...prev.availability,
                          selectedDays: prev.availability.selectedDays.filter(
                            (d) => d !== day
                          ),
                        },
                      }))
                    }
                    className='ml-2 text-gray-500 hover:text-gray-700'
                  >
                    <IoClose size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className={LABEL_CLASS}>
              Time Available/Day<span className='text-red-500'>*</span>
            </Label>
            <div className='relative'>
              <div className='w-full bg-[#FCFCFD] px-4 sm:px-5 h-[42px] rounded-sm border border-[#F1F1F3] flex items-center'>
                <input
                  type='text'
                  placeholder='00:00'
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
                  className='outline-none border-none bg-transparent flex-1'
                />
                <span className='text-gray-500 text-sm'>hrs</span>
              </div>
              <p className='text-xs text-gray-500 mt-1 mx-2'>
                Enter time in 24-hour format
              </p>
            </div>
          </div>

          <div>
            <Label className={LABEL_CLASS}>
              Time to Finish<span className='text-red-500'>*</span>
            </Label>
            <TimeToFinishSelect />
            <p className='text-xs text-gray-500 mt-1 mx-2'>
              Select course duration
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className='flex justify-end'>
        <Button
          type='submit'
          className='w-full sm:w-auto bg-yellow hover:bg-yellow-500 text-black font-medium px-6 sm:px-8 py-2 rounded text-sm sm:text-base'
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default OnboardingForm;
