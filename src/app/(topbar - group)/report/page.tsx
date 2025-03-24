'use client';
import CircularProgress from '@/app/Components/common/CircularProgress';
import CustomTable from '@/app/Components/common/CustomTable';
import React, { useRef } from 'react';
import { FiDownload } from 'react-icons/fi';

// Define types for the student data
interface StudentMetrics {
  totalProgress: number;
  attendance: number;
  testAvg: number;
  pointsEarned: number;
}

interface StudentData {
  name: string;
  board: string;
  class: string;
  subject: string;
  date: string;
  metrics: StudentMetrics;
}

const SECTION_CLASS =
  'bg-[#F2F2F2] border border-[#F1F1F3] rounded-xl p-5 sm:p-6 xs:p-3 ';
const SUB_SECTION_CLASS =
  'bg-[#FCFCFD] border border-[#F1F1F3] rounded-xl p-[20px] xs:p-3';
const DETAIL_CLASS =
  'text-base sm:text-sm xs:text-xs text-[#656567] font-normal leading-relaxed';
const SECTION_TITLE =
  'text-2xl sm:text-xl xs:text-lg text-black font-medium text-black mb-3';

const ProgressReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);

  // Add title to document
  React.useEffect(() => {
    document.title = 'Student Progress Report';
  }, []);

  const studentData: StudentData = {
    name: 'Kristihy Lovely',
    board: 'CBSC',
    class: '8th',
    subject: 'Maths',
    date: '01 Jan 2025',
    metrics: {
      totalProgress: 39,
      attendance: 74,
      testAvg: 94,
      pointsEarned: 86,
    },
  };

  // Data for 2 months progress report vs planned
  const progressVsPlannedColumns = [
    { key: 'date', header: 'Date' },
    { key: 'plannedTask', header: 'Planned Task' },
    { key: 'taskCovered', header: 'Task covered' },
    { key: 'completionStatus', header: 'Completion status' },
  ];

  const progressVsPlannedData = [
    {
      date: '01 Jan, 2025',
      plannedTask: 'Compound Interest',
      taskCovered: 'Simple Interest',
      completionStatus: 'Delayed',
    },
    {
      date: '5 Jan, 2025',
      plannedTask: 'Compound Interest',
      taskCovered: 'Compound Interest',
      completionStatus: 'Completed',
    },
    {
      date: '12 Jan, 2025',
      plannedTask: 'Planned Test',
      taskCovered: 'Compound Interest & Percent Test',
      completionStatus: 'Completed',
    },
    {
      date: 'Upcoming classes',
      plannedTask: '01/01/2025',
      taskCovered: '01/01/2025',
      completionStatus: 'Good',
    },
  ];

  // Data for 2 months tests conducted
  const testsColumns = [
    { key: 'date', header: 'Date' },
    { key: 'testTopic', header: 'Test Topic' },
    { key: 'maxMarks', header: 'Max marks' },
    { key: 'marksObtained', header: 'Marks obtained' },
    { key: 'result', header: 'Result' },
  ];

  const testsData = [
    {
      date: '5 Jan, 2025',
      testTopic: 'Simple Interest + Compound Interest',
      maxMarks: '50',
      marksObtained: '45',
      result: 'Excellent',
    },
  ];

  // Data for Yearly average
  const yearlyAverageColumns = [
    { key: 'noOfTests', header: 'No of Tests' },
    { key: 'maxMarks', header: 'Max Marks' },
    { key: 'marksObtained', header: 'Marks Obtained' },
    { key: 'result', header: 'Result' },
  ];

  const yearlyAverageData = [
    {
      noOfTests: '1',
      maxMarks: '50',
      marksObtained: '45',
      result: 'Excellent',
    },
  ];

  // Data for 2 months attendance
  const attendanceColumns = [
    { key: 'date', header: 'Date' },
    { key: 'plannedDuration', header: 'Planned duration' },
    { key: 'actualDuration', header: 'Actual duration' },
  ];

  const attendanceData = [
    {
      date: '01 Jan, 2025',
      plannedDuration: '01:00 Hrs',
      actualDuration: '01:20 Hrs',
    },
    {
      date: '5 Jan, 2025',
      plannedDuration: '01:00 Hrs',
      actualDuration: '00:50 Hrs',
    },
  ];

  // Function to handle PDF download
  const handleDownload = () => {
    // Create a print-specific style
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #reportContent, #reportContent * {
          visibility: visible;
        }
        #reportContent {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        @page {
          size: A4;
          margin: 10mm 10mm 10mm 10mm;
        }
        button {
          display: none !important;
        }
        .SECTION_CLASS {
          padding-top: 10px !important;
          margin-bottom: 15px !important;
        }
        table {
          page-break-inside: avoid;
        }
        h2 {
          page-break-after: avoid;
        }
        /* Ensure no content is cut off between pages */
        .page-break-avoid {
          page-break-inside: avoid;
        }
        
        /* Enhanced header and footer - forced to display */
        
        /* Date in header */
        .header-date {
          position: fixed;
          top: 3mm;
          left: 10mm;
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #666;
        }
        
        /* Footer elements */
        .footer-student {
          position: fixed;
          bottom: 3mm;
          left: 10mm;
          font-family: Arial, sans-serif;
          font-size: 9px;
          color: #666;
        }
        
        .footer-page-number {
          position: fixed;
          bottom: 3mm;
          width: 100%;
          text-align: center;
          font-family: Arial, sans-serif;
          font-size: 9px;
          color: #666;
          counter-increment: page;
        }
        
        .footer-page-number::after {
          content: counter(page) "/3";
        }
        
        .footer-class-subject {
          position: fixed;
          bottom: 3mm;
          right: 10mm;
          font-family: Arial, sans-serif;
          font-size: 9px;
          color: #666;
        }
        
        /* Add padding for headers and footers */
        #reportContent {
          padding-top: 8mm;
          padding-bottom: 10mm;
        }
      }
    `;
    document.head.appendChild(style);

    // Create elements for header and footer that will be visible regardless of browser print settings
    const headerDate = document.createElement('div');
    headerDate.className = 'header-date';
    headerDate.innerText = `${new Date().toLocaleDateString()}`;

    const footerStudent = document.createElement('div');
    footerStudent.className = 'footer-student';
    footerStudent.innerText = `${studentData.name}`;

    const footerPageNumber = document.createElement('div');
    footerPageNumber.className = 'footer-page-number';

    const footerClassSubject = document.createElement('div');
    footerClassSubject.className = 'footer-class-subject';
    footerClassSubject.innerText = `${studentData.class} | ${studentData.subject}`;

    // Add elements to the document
    document.body.appendChild(headerDate);
    document.body.appendChild(footerStudent);
    document.body.appendChild(footerPageNumber);
    document.body.appendChild(footerClassSubject);

    // Display a loading animation
    const loadingAnimation = document.createElement('div');
    loadingAnimation.className = 'loading-animation';
    loadingAnimation.innerHTML = `
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    `;
    document.body.appendChild(loadingAnimation);

    // Print the report
    window.print();

    // Remove the loading animation
    document.body.removeChild(loadingAnimation);

    // Display a success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
      <div class="alert alert-success" role="alert">
        Report downloaded successfully!
      </div>
    `;
    document.body.appendChild(successMessage);

    // Remove the success message after 2 seconds
    setTimeout(() => {
      document.body.removeChild(successMessage);
    }, 2000);

    // Clean up
    document.head.removeChild(style);
    document.body.removeChild(headerDate);
    document.body.removeChild(footerStudent);
    document.body.removeChild(footerPageNumber);
    document.body.removeChild(footerClassSubject);
  };

  return (
    <div className='mx-auto max-w-6xl'>
      {/* Header with title and download button */}
      <div className='flex flex-row justify-between items-center mb-4 gap-2'>
        <div className='flex items-center text-black text-2xl sm:text-xl font-medium'>
          Progress Report
        </div>
        <button
          className='flex items-center border border-yellow-400 text-lg sm:text-base py-2 px-3 rounded-md text-black'
          onClick={handleDownload}
        >
          <FiDownload className='w-4 h-4 mr-1' />
          Download
        </button>
      </div>

      <div id='reportContent' ref={reportRef} className='flex flex-col gap-4'>
        {/* Student Info Card with Metrics */}
        <div className={SECTION_CLASS}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-2 gap-x-4'>
            <div>
              <span className='text-black text-base sm:text-sm font-medium'>
                Name:
              </span>
              <span className='ml-1 text-black text-base sm:text-sm font-light'>
                {studentData.name}
              </span>
            </div>
            <div>
              <span className='text-black text-base sm:text-sm font-medium'>
                Board:
              </span>
              <span className='ml-1 text-black text-base sm:text-sm font-light'>
                {studentData.board}
              </span>
            </div>
            <div>
              <span className='text-black text-base sm:text-sm font-medium'>
                Class:
              </span>
              <span className='ml-1 text-black text-base sm:text-sm font-light'>
                {studentData.class}
              </span>
            </div>
            <div>
              <span className='text-black text-base sm:text-sm font-medium'>
                Subject:
              </span>
              <span className='ml-1 text-black text-base sm:text-sm font-light'>
                {studentData.subject}
              </span>
            </div>
            <div>
              <span className='text-black text-base sm:text-sm font-medium'>
                Date:
              </span>
              <span className='ml-1 text-black text-base sm:text-sm font-light'>
                {studentData.date}
              </span>
            </div>
          </div>

          <h2 className='text-2xl sm:text-xl font-medium mt-8 sm:mt-6 text-black mb-4'>
            At a Glance - Report
          </h2>

          {/* Metrics Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
            {/* Total Progress */}
            <div className='bg-white rounded-xl p-3 sm:p-4 flex flex-col items-center justify-between min-h-32 sm:min-h-24'>
              <CircularProgress
                value={studentData.metrics.totalProgress}
                gradientId='progress-gradient-1'
                initialAnimation={true}
                initialAnimationDelay={0.2}
              />
              <p className='text-center mt-2 text-black text-base sm:text-sm font-medium'>
                Total Progress
              </p>
            </div>

            {/* Attendance */}
            <div className='bg-white rounded-xl p-3 sm:p-4 flex flex-col items-center justify-between min-h-32 sm:min-h-24'>
              <CircularProgress
                value={studentData.metrics.attendance}
                gradientId='progress-gradient-2'
                initialAnimation={true}
                initialAnimationDelay={0.4}
              />
              <p className='text-center mt-2 text-black text-base sm:text-sm font-medium'>
                Attendance
              </p>
            </div>

            {/* Test Average */}
            <div className='bg-white rounded-xl p-3 sm:p-4 flex flex-col items-center justify-between min-h-32 sm:min-h-24'>
              <CircularProgress
                value={studentData.metrics.testAvg}
                gradientId='progress-gradient-3'
                initialAnimation={true}
                initialAnimationDelay={0.6}
              />
              <p className='text-center mt-2 text-black text-base sm:text-sm font-medium'>
                Test avg
              </p>
            </div>

            {/* Points Earned */}
            <div className='bg-white rounded-xl p-3 sm:p-4 flex flex-col items-center justify-between min-h-40'>
              <div className='text-[40px] sm:text-[32px] font-medium text-black mt-2 flex-1 text-center flex items-center justify-center'>
                {studentData.metrics.pointsEarned}
              </div>
              <p className='text-center mt-2 text-black text-base sm:text-sm font-medium'>
                Points Earned
              </p>
            </div>
          </div>
        </div>
        {/* Subject Header */}
        <div className={SECTION_CLASS}>
          <h2 className='text-[28px] sm:text-[24px] xs:text-[20px] text-black font-medium mb-10 sm:mb-6'>
            Subject: Maths
          </h2>
          <div className='flex flex-col gap-6 sm:gap-4'>
            <div>
              <h2 className={SECTION_TITLE}>
                2 months progress report vs planned
              </h2>
              <CustomTable
                columns={progressVsPlannedColumns}
                data={progressVsPlannedData}
                className='mb-2'
              />
            </div>
            <div>
              <h2 className={SECTION_TITLE}>AI summary for last 2 months</h2>
              <div className={SUB_SECTION_CLASS}>
                <p className={DETAIL_CLASS}>
                  Lorem ipsum dolor sit amet consectetur. Auctor quam egestas
                  diam id. Tempor et amet viverra semper ut vitae rutrum amet.
                  Eget tellus niam non at eunhud sed ipiscing vitae. Auctor quam
                  egestas diam id. Tempor et amet viverra semper ut vitae rutrum
                  amet. Eget tellus niam non at eunhud sed ipiscing lorem at
                  eunhud sed ipin tortor idfermentum lectus rhac rgigeon sed
                  pufvior se velit ac elementum. Neque urna id sed risus.
                  Lobortis ut odio placerate is elementum in suscipit egestas.
                  Nibuis e vitae placerat sit elit molest mattis ut odio nt
                  nifermentum nec lectus. Auc elementum vulputate lectut posuere
                  in pele nequeis hendrerit iquam. Duis id niam ipsum utriciee
                  tor eu ut eliet interdum nec fauces. Lobortis sunt at et
                  habitant eu euismad viverra sed lorem. Ac inter placertes
                  sollicitudin ioret phasellus amet. Egestas dictum ut purus
                  vitae quisque magna. Ut cursus vel ut bibendum pariatur curs
                  uspendisse. Mattis bibendum dui euis interdum iquus viverra.
                  Pharetra cursus ac, aliquet vulputetie utrum. Dignissim vel
                  consectetur torttitor giver a blandit posuere. Facilisis
                  porttitor, duis vitae vulputate elementum ante pharetra.
                  Egestas vulput suscipit et risus vel imperdiet. Etiam eros
                  elefifend condied commodo eget. Tincidunt nisl viverra etian
                  pharetra etiam faucibus id eget. Mauris eu purus vel vulputate
                  ac.
                </p>
              </div>
            </div>
            <div>
              <h2 className={SECTION_TITLE}>2 months tests conducted</h2>
              <CustomTable
                columns={testsColumns}
                data={testsData}
                className='mb-2'
              />
            </div>
            <div>
              <h2 className={SECTION_TITLE}>Yearly average</h2>
              <CustomTable
                columns={yearlyAverageColumns}
                data={yearlyAverageData}
                className='mb-2'
              />
            </div>
            <div>
              <h2 className={SECTION_TITLE}>2 months attendance</h2>
              <CustomTable
                columns={attendanceColumns}
                data={attendanceData}
                className='mb-2'
              />
            </div>
            <div>
              <h2 className={SECTION_TITLE}>2 months behaviour analysis</h2>
              <div className={SUB_SECTION_CLASS}>
                <p className={DETAIL_CLASS}>
                  Lorem ipsum dolor sit amet consectetur. Auctor quam egestas
                  diam id. Tempor et amet viverra semper ut vitae rutrum amet.
                  Eget tellus niam non at eunhud sed ipiscing vitae. Auctor quam
                  egestas diam id. Tempor et amet viverra semper ut vitae rutrum
                  amet. Eget tellus niam non at eunhud sed ipiscing lorem at
                  eunhud sed ipin tortor idfermentum lectus rhac rgigeon sed
                  pufvior se velit ac elementum. Neque urna id sed risus.
                  Lobortis ut odio placerate is elementum in suscipit egestas.
                  Nibuis e vitae placerat sit elit molest mattis ut odio nt
                  nifermentum nec lectus. Auc elementum vulputate lectut posuere
                  in pele nequeis hendrerit iquam. Duis id niam ipsum utriciee
                  tor eu ut eliet interdum nec fauces. Lobortis sunt at et
                  habitant eu euismad viverra sed lorem. Ac inter placertes
                  sollicitudin ioret phasellus amet. Egestas dictum ut purus
                  vitae quisque magna. Ut cursus vel ut bibendum pariatur curs
                  uspendisse. Mattis bibendum dui euis interdum iquus viverra.
                  Pharetra cursus ac, aliquet vulputetie utrum. Dignissim vel
                  consectetur torttitor giver a blandit posuere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;
