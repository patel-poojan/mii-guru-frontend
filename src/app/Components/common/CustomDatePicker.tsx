'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { BsCalendar } from 'react-icons/bs';

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);
  const [month, setMonth] = useState(
    value?.getMonth() ?? new Date().getMonth()
  );
  const [year, setYear] = useState(
    value?.getFullYear() ?? new Date().getFullYear()
  );

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from(
    { length: new Date().getFullYear() - 1900 + 1 },
    (_, i) => 1900 + i
  ).reverse();

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setMonth(newDate.getMonth());
      setYear(newDate.getFullYear());
      onChange?.(newDate);
      setIsOpen(false);
    }
  };

  const handleMonthChange = (newMonth: string) => {
    const monthIndex = months.indexOf(newMonth);
    setMonth(monthIndex);
  };

  const handleYearChange = (newYear: string) => {
    setYear(parseInt(newYear));
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={`w-full bg-[#FCFCFD] hover:bg-[#FCFCFD] border-[#F1F1F3] p-3 sm:p-5  ${
            date
              ? 'text-[#656567] hover:!text-[#656567] !font-normal !text-sm sm:!text-base'
              : 'text-[#ACACAC] hover:!text-[#ACACAC] !font-normal text-sm'
          } justify-start text-left font-normal ${
            !date && 'text-muted-foreground'
          } `}
        >
          <BsCalendar className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : 'Select date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <div className='px-3 pt-3 flex gap-2'>
          <Select value={months[month]} onValueChange={handleMonthChange}>
            <SelectTrigger className='w-[120px]'>
              <SelectValue placeholder='Month' />
            </SelectTrigger>
            <SelectContent className='max-h-60'>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year.toString()} onValueChange={handleYearChange}>
            <SelectTrigger className='w-[100px]'>
              <SelectValue placeholder='Year' />
            </SelectTrigger>
            <SelectContent className='max-h-60'>
              {years.map((y) => (
                <SelectItem key={y.toString()} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode='single'
          selected={date}
          onSelect={handleSelect}
          month={new Date(year, month)}
          defaultMonth={new Date(year, month)}
          disabled={(date) => date > new Date() || date < new Date(1900, 0, 1)}
          initialFocus
          className='bg-[#FCFCFD] rounded-lg'
          classNames={{
            months: 'space-y-4',
            month: 'space-y-4',
            vhidden: 'vhidden hidden',
            caption: 'flex justify-center relative items-center',
            caption_label: 'hidden',
            nav: 'hidden',
            nav_button: 'hidden',
            nav_button_previous: 'absolute left-2',
            nav_button_next: 'absolute right-2',
            table: 'w-full border-collapse !mt-0',
            head_row: 'flex justify-around',
            head_cell: 'text-black w-9 font-normal text-[0.8rem]',
            row: 'flex w-full mt-2 justify-around',
            cell: 'text-center text-sm p-0 relative',
            day: 'h-9 w-9 p-0 font-normal hover:bg-orange-100 rounded-full flex items-center justify-center transition-colors hover:text-black focus:text-black',
            day_selected:
              '[&:not([disabled])]:bg-orange-200 [&:not([disabled])]:text-black [&:not([disabled])]:hover:bg-orange-200 [&:not([disabled])]:hover:text-black rounded-full',
            day_today: 'bg-gray-100 text-black rounded-full',
            day_outside: 'text-muted-foreground opacity-50',
            day_disabled: 'text-muted-foreground opacity-50',
            day_hidden: 'invisible',
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CustomDatePicker;
