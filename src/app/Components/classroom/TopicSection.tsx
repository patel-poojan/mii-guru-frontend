"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
// import { CgSandClock } from "react-icons/cg";
import { GoDotFill } from "react-icons/go";
import { Skeleton } from "@/components/ui/skeleton";

interface Topic {
  id: number;
  title: string;
  content: string;
}
interface TopicsList {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}
// interface ProgressData {
//   subjects: {
//     subject_name: string;
//     total_topics: number;
//     completed_topics: number;
//     completion_percentage: number;
//     last_activity: string;
//   }[];
// }
interface SubjectProgress {
  subject_name: string;
  total_topics: number;
  completed_topics: number;
  completion_percentage: number;
  last_activity: string;
}

function TopicSection({
  topics,
  open,
  setOpen,
  baseUrl,
  AUTH_TOKEN,
  subjectName = "biology",
}: {
  topics: Topic[];
  open: boolean;
  setOpen: (open: boolean) => void;
  baseUrl: string;
  AUTH_TOKEN: string;
  subjectName?: string;
}) {
  const router = useRouter();
  const [topicsList, setTopicsList] = useState<TopicsList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/user/progress`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        const data = response.data;
        if (!data) {
          console.error("No progress data found");
          return;
        }

        if (data) {
          const subjectProgress = data?.data?.subjects?.find(
            (subject: SubjectProgress) =>
              subject.subject_name.toLowerCase() ===
              subjectName.toLowerCase().trim()
          );
          const newTopicsList = topics?.map((topic, idx) => {
            if (idx < subjectProgress?.completed_topics) {
              return {
                ...topic,
                completed: true,
              };
            }
            return {
              ...topic,
              completed: false,
            };
          });
          setTopicsList(newTopicsList);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [topics]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 z-[200]">
        <h1 className="text-2xl font-bold">Biology - Day 12</h1>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              {loading?<Skeleton className="h-9 md:h-9 w-24 rounded-lg bg-primary/20" />:<Button
                variant="outline"
                className="h-9 md:h-9 text-base font-[500] bg-[var(--MainLight-color)] font-[500] float-right px-4 rounded-lg hover:bg-[var(--MainLight-color)]"
              >
                Skip Topic
              </Button>}
            </DialogTrigger>
            <DialogContent className="w-[90%] sm:max-w-lg p- md:x-10 rounded-xl">
              <div className="flex justify-center">
                <Image
                  src="/img/classroom/release_alert.png"
                  alt="Release Alert"
                  width={500}
                  height={500}
                  className="h-12 md:h-16 w-auto"
                />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl text-center mb-6 tracking-normal">
                  Prove Your Mastery to Skip!
                </DialogTitle>
                <DialogDescription className="text-center text-small md:text-regular font-[400]">
                  Take a quick test to skip this chapter/topic. Show your
                  understanding and move ahead!
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-4 mt-4">
                <Button
                  className="flex-1 h-10 md:h-12 text-small md:text-regular bg-[var(--MainLight-color)] hover:bg-[var(--MainLight-color)] text-black hover:scale-[1.02] transition-all duration-300 rounded-lg"
                  onClick={() => {
                    setOpen(false);
                    router.push(`/test`);
                  }}
                >
                  Start Test
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-2 border p-4 rounded-xl mb-10 md:mb-0 max-h-[35rem] overflow-y-scroll">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Topics</h2>
        <Accordion type="single" collapsible className="w-full">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-2 py-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))
            : topicsList.map((topic) => {
                return (
                  <AccordionItem key={topic.id} value={`topic-${topic.id}`}>
                    <AccordionTrigger
                      className={`text-left text-lg md:text-lg font-[500] md:font-semibold`}
                    >
                      <span className="flex gap-2 place-items-start">
                        {topic.completed ? (
                          <FaCheck className="text-[var(--MainLight-color)] mt-1" />
                        ) : (
                          <GoDotFill className="size-4 text-black/20 mt-1" />
                        )}{" "}
                        {topic.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-base md:text-base text-gray-600">
                      {topic.content}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
        </Accordion>
      </div>
    </>
  );
}

export default TopicSection;
