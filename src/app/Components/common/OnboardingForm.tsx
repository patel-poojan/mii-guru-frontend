'use client';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import { emailRegex, phoneRegex } from '../../utils/regex-collection';
import CustomDatePicker from '@/app/Components/common/CustomDatePicker';
import { useUpdateUserTracking } from '@/app/utils/api/user-api';
import { axiosError } from '../../types/axiosTypes';
import { Loader } from '@/app/Components/common/Loader';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useRegisterUser } from '@/app/utils/api/onboarding-api';
import useWindowDimensions from '@/app/utils/windowSize';
// Types for select options
interface SelectOption {
  value: string;
  label: string;
}

// Keep existing CSS classes
const SECTION_CLASS = 'bg-[#F2F2F2] p-4 sm:p-6 lg:p-8 rounded-xl';
const SECTION_TITLE_CLASS =
  'text-lg sm:text-xl font-medium text-black mb-4 sm:mb-5';
const LABEL_CLASS = 'block mb-2 sm:mb-3 text-black text-sm';
const INPUT_CLASS =
  'w-full bg-[#FCFCFD] border-[#F1F1F3] p-3 sm:p-5 !text-[#656567] !placeholder:text-[#ACACAC] !text-sm sm:!text-base placeholder:!text-sm';
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
  name: string;
  dob: Date | undefined;
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
  classGrade: string;
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

const OnboardingForm = ({ userId }: { userId?: string }) => {
  const info = Cookies.get('userInfo') || '';
  const userInfo = useMemo(() => {
    try {
      return info ? JSON.parse(info) : {};
    } catch (error) {
      console.error('Error parsing userInfo from cookie:', error);
      return {};
    }
  }, [info]);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dob: undefined,
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
    classGrade: '',
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
  const { width: screenWidth } = useWindowDimensions();
  const customSelectStyles: ReactSelectStylesConfig<
    SelectOption,
    false,
    GroupBase<SelectOption>
  > = {
    control: (base) => ({
      ...base,
      backgroundColor: '#FCFCFD',
      borderColor: '#F1F1F3',
      padding: screenWidth > 768 ? '0rem 0.75rem' : '0rem 0.25rem',
      borderRadius: '0.375rem',
      minHeight: screenWidth > 768 ? '42px' : '36px',
      height: screenWidth > 768 ? '42px' : '36px',
      fontSize: '0.875rem',
      boxShadow: 'none',
      '@media (min-width: 768px)': {
        minHeight: '42px',
        height: '42px',
        padding: '0rem 0.75rem',
      },
      '@media (max-width: 767px)': {
        minHeight: '36px',
        height: '36px',
        padding: '0rem 0.25rem',
      },
      '&:hover': {
        borderColor: '#F1F1F3',
        cursor: 'pointer',
      },
    }),

    placeholder: (base) => ({
      ...base,
      color: '#ACACAC !important',
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
    valueContainer: (base) => ({
      ...base,
      padding: '0 8px',
      height: '36px',
      '@media (min-width: 768px)': {
        height: '42px',
      },
      '@media (max-width: 767px)': {
        height: '36px',
      },
    }),
  };

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
  useEffect(() => {
    // Only run this effect once when component mounts
    try {
      // Check if userInfo is a valid object before accessing properties
      if (userInfo && typeof userInfo === 'object') {
        const username = userInfo.username || '';
        const email = userInfo.email || '';

        if (username || email) {
          setFormData((prevData) => ({
            ...prevData,
            name: username || prevData.name,
            email: email || prevData.email,
          }));
        }
      }
    } catch (error) {
      console.error('Error setting user info:', error);
    }
  }, []);
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
          (option) => option.value === formData.classGrade
        )}
        onChange={(option) =>
          setFormData((prev) => ({
            ...prev,
            classGrade: option?.value || '',
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

  const validateForm = React.useCallback(
    (data: FormData): { isValid: boolean; errors: string[] } => {
      const errors: string[] = [];

      // Personal Details Section
      if (!data.name.trim()) {
        errors.push('Please enter your name');
      }
      if (!data.dob) {
        errors.push('Please select your date of birth');
      }
      if (!data.email.trim()) {
        errors.push('Please enter your email address');
      } else if (!emailRegex.test(data.email)) {
        errors.push(
          'Please enter a valid email address (e.g., name@example.com)'
        );
      }
      if (!data.phone.trim()) {
        errors.push('Please enter your phone number');
      } else if (!phoneRegex.test(data.phone)) {
        errors.push('Please enter a valid phone number (10 digits)');
      }

      // Parents Details Section
      if (!data.fatherName.trim()) {
        errors.push("Please enter your father's name");
      }
      if (!data.motherName.trim()) {
        errors.push("Please enter your mother's name");
      }
      if (!data.currentAddress.trim()) {
        errors.push('Please enter your current address');
      }
      if (!data.city.trim()) {
        errors.push('Please enter your city');
      }
      if (!data.country.trim()) {
        errors.push('Please enter your country');
      }

      // Educational Details Section
      if (!data.schoolName.trim()) {
        errors.push('Please enter your school name');
      }
      if (!data.board) {
        errors.push('Please select your board');
      }
      if (!data.mediumOfStudy) {
        errors.push('Please select your medium of study');
      }
      if (!data.classGrade) {
        errors.push('Please select your class/grade');
      }

      // Course Selection Section
      if (data.subjects.length === 0) {
        errors.push('Please select at least one subject you wish to study');
      }

      // Availability Section
      if (data.availability.selectedDays.length === 0) {
        errors.push('Please select your available days');
      }
      if (!data.availability.timeAvailable) {
        errors.push('Please select your available time per day');
      }
      if (!data.availability.timeToFinish) {
        errors.push('Please select your preferred course duration');
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    },
    []
  );
  const { mutate: updateUserTracking, isPending } = useUpdateUserTracking({
    onSuccess(data) {
      toast.success("Registration successful! Let's get started");
      if (data?.data?.tracking) {
        const updatedUserInfo = data?.data?.tracking;
        Cookies.set('userInfo', JSON.stringify(updatedUserInfo), {
          path: '/',
          sameSite: 'Lax',
          secure: true,
        });
        router.push('/meet-teachers');
      }
    },
    onError(error: axiosError) {
      toast.error(
        error?.response?.data?.errors?.message ||
          error?.response?.data?.message ||
          'Failed to update user tracking'
      );
    },
  });
  const { mutate: registerUser, isPending: isPendingToRegister } =
    useRegisterUser({
      onSuccess() {
        updateUserTracking({
          onboardingCompleted: true,
        });
      },
      onError(error: axiosError) {
        toast.error(
          error?.response?.data?.errors?.message ||
            error?.response?.data?.message ||
            'Failed to register user'
        );
      },
    });
  const handleSubmit = React.useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      const validation = validateForm(formData);

      if (!validation.isValid) {
        // Show all errors in a single toast with proper formatting
        const errorMessage = (
          <div className='space-y-1'>
            <p className='font-medium'>Please check the following:</p>
            <ul className='list-disc pl-4 space-y-1'>
              {validation.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        );

        toast.warning(errorMessage, {
          duration: 5000,
          className: 'max-w-md',
        });
        return;
      }

      // Create FormData for API submission
      const apiFormData = new FormData();

      // Handle basic fields with proper type checking
      Object.entries(formData).forEach(([key, value]) => {
        // Skip specific objects and arrays that need special handling
        if (
          key !== 'subjects' &&
          key !== 'availability' &&
          key !== 'photo' &&
          key !== 'dob' &&
          key !== 'otherSubjects' && // Skip these for special handling
          key !== 'otherActivities'
        ) {
          // Safe type assertion with proper checks
          const strValue = value as unknown;
          if (
            typeof strValue === 'string' &&
            strValue !== null &&
            strValue !== undefined &&
            strValue !== ''
          ) {
            apiFormData.append(key, strValue);
          }
        }
      });

      // Handle photo file with proper type check
      if (formData.photo instanceof File) {
        apiFormData.append('photo', formData.photo);
      }

      // Handle date of birth with proper type check
      if (formData.dob instanceof Date) {
        apiFormData.append('dob', formData.dob.toISOString());
      }

      // Handle subjects array - only add non-empty values
      if (Array.isArray(formData.subjects) && formData.subjects.length > 0) {
        formData.subjects.forEach((subject: string) => {
          if (subject && typeof subject === 'string' && subject.trim() !== '') {
            apiFormData.append('subjects', subject);
          }
        });
      }

      // Handle other subjects (comma-separated string)
      if (formData.otherSubjects && formData.otherSubjects.trim() !== '') {
        const otherSubjects = formData.otherSubjects
          .split(',')
          .map((subject) => subject.trim())
          .filter((subject) => subject !== '');

        otherSubjects.forEach((subject) => {
          apiFormData.append('otherSubjects', subject);
        });
      }

      // Handle other activities (comma-separated string)
      if (formData.otherActivities && formData.otherActivities.trim() !== '') {
        const otherActivities = formData.otherActivities
          .split(',')
          .map((activity) => activity.trim())
          .filter((activity) => activity !== '');

        otherActivities.forEach((activity) => {
          apiFormData.append('otherActivities', activity);
        });
      }

      // Handle availability object with proper type checks
      const availability = formData.availability;

      // Add selectedDays array - only add non-empty values
      if (
        Array.isArray(availability.selectedDays) &&
        availability.selectedDays.length > 0
      ) {
        availability.selectedDays.forEach((day: string) => {
          if (day && typeof day === 'string' && day.trim() !== '') {
            apiFormData.append('selectedDays', day);
          }
        });
      }

      // Add other availability fields - only if they're not empty
      if (
        availability.timeAvailable &&
        typeof availability.timeAvailable === 'string' &&
        availability.timeAvailable.trim() !== ''
      ) {
        apiFormData.append('timeAvailable', availability.timeAvailable);
      }

      if (
        availability.timeToFinish &&
        typeof availability.timeToFinish === 'string' &&
        availability.timeToFinish.trim() !== ''
      ) {
        apiFormData.append('timeToFinish', availability.timeToFinish);
      }

      // Submit form data
      registerUser(apiFormData);
    },
    [formData, validateForm, registerUser]
  );
  const generateTimeOptions = () => {
    const options = [];
    // Start from i = 1 to skip 00:00
    for (let i = 1; i < 48; i++) {
      const hour = Math.floor(i / 2)
        .toString()
        .padStart(2, '0');
      const minute = ((i % 2) * 30).toString().padStart(2, '0');
      const timeValue = `${hour}:${minute}`;
      options.push({
        value: timeValue,
        label: `${timeValue} hrs`,
      });
    }
    return options;
  };
  const timeOptions = generateTimeOptions();
  return (
    <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
      {(isPendingToRegister || isPending) && <Loader />}
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
                name='name'
                value={formData.name}
                // onChange={handleChange}
                disabled
                placeholder='Enter First Name'
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <Label className={LABEL_CLASS}>
                Date of Birth<span className='text-red-500'>*</span>
              </Label>
              <CustomDatePicker
                value={formData.dob}
                onChange={(date) =>
                  setFormData((prev) => ({ ...prev, dob: date }))
                }
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
                // onChange={handleChange}
                disabled
                placeholder='Enter Email'
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <Label className={LABEL_CLASS}>
                Phone<span className='text-red-500'>*</span>
              </Label>
              <div className='relative'>
                <Input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={(e) => {
                    // Only allow numeric input
                    const numericValue = e.target.value.replace(/\D/g, '');
                    // Update with only the first 10 digits
                    setFormData((prev) => ({
                      ...prev,
                      phone: numericValue.slice(0, 10),
                    }));
                  }}
                  maxLength={10}
                  placeholder='Enter 10-digit number'
                  className={INPUT_CLASS}
                />
              </div>
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
              className={`${INPUT_CLASS} min-h-[100px] placeholder:!text-[#ACACAC]`}
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
                    className=' data-[state=checked]:bg-yellow data-[state=checked]:border-yellow hover:data-[state=checked]:bg-yellow-500 '
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
              <div className='relative'>
                <Input
                  name='otherSubjects'
                  value={formData.otherSubjects}
                  onChange={handleChange}
                  placeholder='E.g., Geography, Computer Science, Art'
                  className={INPUT_CLASS}
                />
                <p className='text-xs text-gray-500 mt-1 mx-2'>
                  Separate multiple subjects with commas
                </p>
              </div>
            </div>
            <div>
              <Label className={LABEL_CLASS}>
                Other Activities of Interest
              </Label>
              <div className='relative'>
                <Input
                  name='otherActivities'
                  value={formData.otherActivities}
                  onChange={handleChange}
                  placeholder='E.g., Robotics, Music, Debate'
                  className={INPUT_CLASS}
                />
                <p className='text-xs text-gray-500 mt-1 mx-2'>
                  Separate multiple activities with commas
                </p>
              </div>
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
              <Select<SelectOption>
                instanceId='time-available-select'
                menuPlacement='auto'
                styles={customSelectStyles}
                options={timeOptions}
                value={timeOptions.find(
                  (option) =>
                    option.value === formData.availability.timeAvailable
                )}
                onChange={(option) =>
                  setFormData((prev) => ({
                    ...prev,
                    availability: {
                      ...prev.availability,
                      timeAvailable: option?.value || '',
                    },
                  }))
                }
                placeholder='00:00 hrs'
              />
              <p className='text-xs text-gray-500 mt-1 mx-2'>
                Select time in 24-hour format
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
          {userId ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
};

export default OnboardingForm;
