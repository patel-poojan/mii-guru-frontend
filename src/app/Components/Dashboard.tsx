"use client"

import { Bar } from "react-chartjs-2"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Bell, Users } from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const studyData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      label: "Study Hours",
      data: [5, 6, 7, 7, 6, 4, 4],
      backgroundColor: "rgba(255, 159, 64, 0.8)",
      borderRadius: 8,
    },
  ],
}

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 10,
      ticks: {
        stepSize: 2,
        callback: (value: number) => `${value}hrs`,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

const subjects = [
  { name: "Maths", chapter: "Chapter-6", progress: "27/68", hours: 6, icon: "📚" },
  { name: "Biology", chapter: "Chapter-2", progress: "07/32", hours: 4, icon: "🧬" },
  { name: "Physics", chapter: "Chapter-2", progress: "07/32", hours: 4, icon: "⚡" },
  { name: "Chemistry", chapter: "Chapter-6", progress: "07/32", hours: 4, icon: "🧪" },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-orange-50 p-4 md:p-8">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Launch Classroom</h1>
        <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm">
          <Users className="h-5 w-5" />
          <span>Invite your friend</span>
        </button>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {subjects.map((subject) => (
              <div key={subject.name} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-semibold">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.chapter}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{subject.progress} Lessons</span>
                  <span>{subject.hours} Hours left</span>
                </div>
                <button className="mt-4 text-sm font-medium text-orange-500">Resume Course →</button>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Study Hours</h2>
            <Bar data={studyData} options={chartOptions} />
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <img src="https://v0.dev/placeholder.svg" alt="Profile" className="h-12 w-12 rounded-full" />
              <div>
                <h2 className="font-semibold">Krishty Lovely</h2>
                <p className="text-sm text-gray-500">🏆 Streak 12 Days in a row</p>
              </div>
            </div>

            <h3 className="mb-4 font-semibold">Progress so far</h3>
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <div key={subject.name} className="text-center">
                  <div className="mx-auto h-24 w-24">
                    <CircularProgressbar
                      value={74}
                      text="74%"
                      styles={buildStyles({
                        pathColor: "#f97316",
                        textColor: "#f97316",
                        trailColor: "#fee2e2",
                      })}
                    />
                  </div>
                  <p className="mt-2 text-sm">{subject.name}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border p-4 text-center">
                <div className="mb-2 inline-block rounded-lg bg-blue-100 p-2">📝</div>
                <p className="font-semibold">8 Test</p>
              </div>
              <div className="rounded-xl border p-4 text-center">
                <p className="text-2xl font-bold text-green-600">98%</p>
                <p className="text-sm text-gray-500">Score</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-xl border p-4">
              <div className="rounded-lg bg-orange-100 p-2">
                <Bell className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="font-semibold">Next test in 2 days</p>
                <p className="text-sm text-gray-500">Subject: Maths</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

