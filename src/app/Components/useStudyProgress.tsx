"use client"

import { useState, useEffect } from "react"

interface StudyProgress {
  subject: string
  progress: number
  totalLessons: number
  completedLessons: number
  hoursLeft: number
}

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudyProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data
    const fetchProgress = () => {
      const data: StudyProgress[] = [
        {
          subject: "Maths",
          progress: 74,
          totalLessons: 68,
          completedLessons: 27,
          hoursLeft: 6,
        },
        {
          subject: "Biology",
          progress: 74,
          totalLessons: 32,
          completedLessons: 7,
          hoursLeft: 4,
        },
        {
          subject: "Physics",
          progress: 74,
          totalLessons: 32,
          completedLessons: 7,
          hoursLeft: 4,
        },
        {
          subject: "Chemistry",
          progress: 74,
          totalLessons: 32,
          completedLessons: 7,
          hoursLeft: 4,
        },
      ]

      setProgress(data)
      setIsLoading(false)
    }

    fetchProgress()
  }, [])

  return { progress, isLoading }
}

