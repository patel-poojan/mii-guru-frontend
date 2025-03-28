"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { RadioGroup } from "@/components/ui/radio-group";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import PassDialogPopup from "@/app/Components/quiz/PassDialogPopup";
import FailDialogPopup from "@/app/Components/quiz/FailDialogPopup";
import { toast } from "sonner";
import { axiosInstance } from "@/app/utils/axiosInstance";

interface QuestionOption {
  [key: string]: string;
}

interface Question {
  question_id: string;
  question: string;
  options: QuestionOption;
  description?: string;
  image?: string;
}

interface QuestionsResponse {
  quiz_id: string;
  questions: Question[];
}

const defaultQuestion: Question = {
  question_id: "loading",
  question: "Loading question...",
  options: {
    A: "Loading options...",
  },
};

const defaultQuizData: QuestionsResponse = {
  quiz_id: "loading",
  questions: [defaultQuestion],
};

interface QuizSubmissionRequest {
  user_id: string;
  quiz_id: string;
  topic_id: string;
  questions: {
    [key: string]: {
      question_id: string;
      selected_option: string;
    };
  };
}

// interface QuizSubmissionResponse {
//   success: boolean;
//   status: number;
//   message: string;
//   data: {
//     correct_count: number;
//     incorrect_count: number;
//     total_questions: number;
//     percentage: number;
//     passed: boolean;
//     question_results: {
//       [key: string]: {
//         question_id: string;
//         selected_option: string;
//         correct_option: string | null;
//         is_correct: boolean;
//         message: string;
//       };
//     };
//   };
// }
export default function Page() {
  const [user_id] = useState("67dd6df741e4ccc85f62416e");
  const [topicID] = useState("67dd4f3bada69ae06e9769c7");
  const [questions, setQuestions] =
    useState<QuestionsResponse>(defaultQuizData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeQuestionId, setActiveQuestionId] = useState<string>(
    defaultQuestion.question_id
  );
  const [activeQuestion, setActiveQuestion] =
    useState<Question>(defaultQuestion);

  const [openPassModel, setOpenPassModel] = useState(false);
  const [openFailModel, setOpenFailModel] = useState(false);

  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  // const base_url = "http://3.6.140.234:8002";
  // const AUTH_TOKEN =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYXJ0aGt1a2FkaXlhNzFAZ21haWwuY29tIiwiZXhwIjoxNzQzNDEyMzgzLjM4MzI0N30.s3RBtzAD0hFtLUNQ1bZx5GpF3c43NfdlW3-XRzPwPUM";
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
    
      try {
        const response = await axiosInstance.get(`/syllabus/quiz/${topicID}`);
        
        if (!response.data || !Array.isArray(response.data.questions)) {
          toast.error("Invalid quiz data received.");
          setError("Failed to load quiz data. Please try again later.");
          return;
        }
    
        const formattedData = {
          quiz_id: response.data.quiz_id,
          questions: response.data.questions,
        };
    
        setQuestions(formattedData);
        setActiveQuestionId(formattedData.questions[0].question_id);
        setActiveQuestion(formattedData.questions[0]);
        setTimeLeft(formattedData.questions.length * 60);
      } catch (err) {
        console.error("Error fetching questions:", err);
        
        toast.error("Failed to fetch quiz questions.");
        setError("Failed to fetch quiz questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
      
    useEffect(() => {
      fetchQuestions();
    }, [topicID]);

  useEffect(() => {
    if (!loading) {
      const questionIndex = questions.questions.findIndex(
        (q) => q.question_id === activeQuestionId
      );

      if (questionIndex !== -1) {
        setCurrentQuestionIndex(questionIndex);
        setActiveQuestion(questions.questions[questionIndex]);
      }
    }
  }, [activeQuestionId, questions.questions, loading]);

  const [timeLeft, setTimeLeft] = useState(questions.questions.length * 60);
  const [isQuizSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isQuizSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isQuizSubmitted) {
      // Automatically submit the quiz when time reaches zero
      evaluateResults();
    }
  }, [timeLeft, isQuizSubmitted]);

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const selectedOption = userAnswers[activeQuestionId] || "";

  const handleOptionChange = (value: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [activeQuestionId]: value,
    }));
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestion = questions.questions[currentQuestionIndex - 1];
      setActiveQuestionId(prevQuestion.question_id);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.questions.length - 1) {
      const nextQuestion = questions.questions[currentQuestionIndex + 1];
      setActiveQuestionId(nextQuestion.question_id);
    } else {
      evaluateResults();
    }
  };

  const evaluateResults = async () => {
    try {
        const submissionData: QuizSubmissionRequest = {
            user_id: user_id,
            quiz_id: questions.quiz_id,
            topic_id: topicID,
            questions: Object.entries(userAnswers).reduce(
                (acc, [questionId, selectedOption], index) => {
                    acc[index + 1] = {
                        question_id: questionId,
                        selected_option: selectedOption,
                    };
                    return acc;
                },
                {} as QuizSubmissionRequest["questions"]
            ),
        };

        const response = await axiosInstance.post("/quiz/checker", submissionData);

        if (response.data.success) {
            if (response.data.data.passed) {
                setOpenPassModel(true);
            } else {
                setOpenFailModel(true);
            }
        } else {
            setOpenFailModel(true);
        }
    } catch (error) {
        console.error("Error submitting quiz:", error);
        toast.error("Failed to submit quiz. Please try again.");
        alert("Failed to submit quiz. Please try again.");
    }
};

  const handleRetryQuiz = () => {
    setOpenFailModel(false);
    fetchQuestions(); 
  };

  if (loading) {
    return (
      <div className="w-full border-none outline-none text-small md:text-regular">
        <div>
          <div className="rounded-2xl">
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className=" pl-5 pr-7 h-14 rounded-2xl flex items-center gap-5 animate-pulse bg-[var(--Secondary-color)]">
                <Skeleton className="w-6 h-6 rounded-full" />
                <Skeleton className="h-6 w-12" />
              </div>
            </div>
            <div className="relative bg-[var(--Secondary-color)]  p-10 rounded-2xl ">
              <Skeleton className="h-6 w-3/4 mb-4 animate-pulse rounded-md bg-white" />
              <Skeleton className="h-4 w-1/2 mb-10 animate-pulse rounded-md bg-white" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-12 w-full rounded-lg animate-pulse bg-white" />
                <Skeleton className="h-12 w-full rounded-lg animate-pulse bg-white" />
                <Skeleton className="h-12 w-full rounded-lg animate-pulse bg-white" />
                <Skeleton className="h-12 w-full rounded-lg animate-pulse bg-white" />
              </div>
              <div className="flex flex-row sm:flex-row gap-3 justify-between pt-4 mt-6">
                <Skeleton className="opacity-0 md:opacity-100 h-12 w-40 rounded-lg animate-pulse bg-white" />
                <Skeleton className="h-12 w-40 rounded-lg animate-pulse bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (
    error &&
    questions.questions.length === 1 &&
    questions.questions[0].question_id === "loading"
  ) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full border-none outline-none text-small md:text-regular">
      <div>
        <div
          id="question"
          key={activeQuestion.question_id}
          className="rounded-2xl"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Biology Mock Test</h1>
              <p className="text-gray-600">
                Question {currentQuestionIndex + 1} of{" "}
                {questions.questions.length}
              </p>
            </div>
            <div
              className={`bg-[var(--MainLight-color)] pl-4 md:pl-5 pr-5 md:pr-7 h-[44px] md:h-14 rounded-2xl flex items-center gap-3 md:gap-5 text-small md:text-regular 
              ${timeLeft <= 60 ? "animate-ping-clock" : ""}`}
            >
              <span className="mb-3 md:mb-4 w-4 h-4 scale-110 md:scale-125">
                ⏱️
              </span>
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="relative bg-[var(--Secondary-color)] p-4 md:p-10 rounded-2xl overflow-hidden">
            <div>
              <p className="font-semibold mb-6 md:mb-8">
                {activeQuestion.question}
              </p>
              {activeQuestion.description && (
                <p className="text-gray-600 mb-10">
                  {activeQuestion.description}
                </p>
              )}
            </div>
            <div
              className={`grid ${
                activeQuestion.image
                  ? "md:grid-cols-[1fr_0.6fr]"
                  : "grid-cols-1"
              } gap-8`}
            >
              <div className="space-y-6">
                <RadioGroup
                  value={selectedOption}
                  onValueChange={handleOptionChange}
                  className={`${
                    activeQuestion.image
                      ? "space-y-[2px] md:space-y-2"
                      : "grid md:grid-cols-2 gap-4 md:gap-4"
                  }`}
                >
                  {Object.entries(activeQuestion.options || {}).map(
                    ([key, value]) => (
                      <button
                        key={key}
                        onClick={() => handleOptionChange(key)}
                        className={`flex items-center space-x-5 md:space-x-3 px-5 py-4 rounded-lg border bg-white hover:scale-[1.005] hover:shadow-md transition-all duration-300
                        ${
                          selectedOption === key
                            ? "border-[3px] md:border-[3px] border-[var(--MainLight-color)] scale-[1.005] shadow-sm"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="radio"
                          value={key}
                          id={`${activeQuestionId}-${key}`}
                          checked={key === selectedOption}
                          className="accent-[var(--MainLight-color)] h-4 w-4"
                          readOnly
                        />

                        <label
                          htmlFor={`${activeQuestionId}-${key}`}
                          className="cursor-pointer text-left leading-6"
                        >
                          {value}
                        </label>
                      </button>
                    )
                  )}
                </RadioGroup>
              </div>
              {activeQuestion.image && (
                <div className="relative rounded-lg h-64">
                  <Image
                    src={activeQuestion.image || "/img/test/leaf_img_test.png"}
                    alt="Question image"
                    width={400}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row sm:flex-row gap-3 justify-between pt-4 mt-10">
              <button
                onClick={goToPreviousQuestion}
                className={`${
                  currentQuestionIndex === 0 ? "cursor-default opacity-0" : ""
                } bg-white border-2 border-[var(--MainLight-color)] text-[var(--MainLight-color)] font-[500] w-full sm:w-40 py-2 rounded-lg flex items-center justify-center gap-2`}
              >
                <span className="pr-3 md:pr-4 flex items-center justify-center gap-2">
                  <MdNavigateBefore className="h-6 w-6" /> Previous
                </span>
              </button>
              <button
                onClick={goToNextQuestion}
                className="bg-[var(--MainLight-color)] w-full sm:w-40 py-2 rounded-lg font-[500] hover:scale-105 transition-all duration-300"
              >
                <span className="pl-3 md:pl-4 flex items-center justify-center gap-2">
                  {currentQuestionIndex === questions.questions.length - 1
                    ? "Submit"
                    : "Next"}
                  {currentQuestionIndex === questions.questions.length - 1 ? (
                    <MdNavigateNext className="h-2 w-2 opacity-0" />
                  ) : (
                    <MdNavigateNext className="h-6 w-6" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <PassDialogPopup
        openPassModel={openPassModel}
        setOpenPassModel={setOpenPassModel}
      />
      <FailDialogPopup
        openFailModel={openFailModel}
        setOpenFailModel={setOpenFailModel}
        handleRetryQuiz={handleRetryQuiz}
      />

      <style jsx>{`
        @keyframes ping-clock {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
        .animate-ping-clock {
          animation: ping-clock 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          background-color: #ff6b6b;
          color: white;
        }
      `}</style>
    </div>
  );
}
