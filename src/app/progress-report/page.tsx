"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function Page() {
  const student_info = {
    name: "Krishty Lovely",
    class: "Class 7",
    id: "789456",
    subjects: "Maths , Chemistry , Biology and Physics",
  }

  const progress_data = {
    overall: {
      syllabus_completion: 39,
      test_performance: 74,
      attendance: 94,
    },
    maths: {
      syllabus_completion: 45,
      test_performance: 34,
      attendance: 80,
    },
    chemistry: {
      syllabus_completion: 55,
      test_performance: 67,
      attendance: 88,
    },
    biology: {
      syllabus_completion: 47,
      test_performance: 66,
      attendance: 74,
    },
    physics: {
      syllabus_completion: 50,
      test_performance: 92,
      attendance: 88,
    },
  }

  const ProgressCard = ({ value, title }: { value: number; title: string }) => (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="w-24 h-24 mx-auto mb-4">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: `url(#gradient-${title.replace(/\s+/g, '-')})`,
            textColor: "#000",
            trailColor: "#d6d6d6",
            textSize: "20px",
          })}
        />
        <svg width={0} height={0}>
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`}>
              <stop offset="0%" stopColor="#FD9A11" />
              <stop offset="1000%" stopColor="#F9D949" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3 className="text-center font-semibold">{title}</h3>
    </div>
  )

  const ProgressSection = ({
    title,
    data,
  }: {
    title: string
    data: {
      syllabus_completion: number
      test_performance: number
      attendance: number
    }
  }) => (
    <section className="mt-8">
      <h2 className="text-xl md:text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressCard value={data.syllabus_completion} title="Syllabus Completion" />
        <ProgressCard value={data.test_performance} title="Test Performance" />
        <ProgressCard value={data.attendance} title="Attendance" />
      </div>
    </section>
  )

  return (
    <div className="w-[92%] md:w-[90%] my-10 rounded-2xl min-h-screen p-4 md:p-10 bg-[var(--Secondary-color)] mx-auto">
      {/* Student Info Grid */}   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block mb-1 md:mb-2 font-semibold">Name :</label>
          <div className="bg-white p-3 pl-4 rounded-lg cursor-not-allowed">{student_info.name}</div>
        </div>
        <div>
          <label className="block mb-1 md:mb-2 font-semibold">Class/Grade :</label>
          <div className="bg-white p-3 pl-4 rounded-lg cursor-not-allowed">{student_info.class}</div>
        </div>
        <div>
          <label className="block mb-1 md:mb-2 font-semibold">Student ID :</label>
          <div className="bg-white p-3 pl-4 rounded-lg cursor-not-allowed">{student_info.id}</div>
        </div>
        <div>
          <label className="block mb-1 md:mb-2 font-semibold">Subjects Enrolled :</label>
          <div className="bg-white p-3 pl-4 rounded-lg cursor-not-allowed">{student_info.subjects}</div>
        </div>
      </div>

      {/* Progress Sections */}
      <ProgressSection title="Overall Summary" data={progress_data.overall} />
      <ProgressSection title="Maths" data={progress_data.maths} />
      <ProgressSection title="Chemistry" data={progress_data.chemistry} />
      <ProgressSection title="Biology" data={progress_data.biology} />
      <ProgressSection title="Physics" data={progress_data.physics} />
    </div>
  )
}