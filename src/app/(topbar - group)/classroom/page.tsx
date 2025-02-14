"use client";

import {
  MdOutlineChat,
  MdOutlinePeopleAlt,
  MdOutlineAddReaction,
  MdGridView,
  MdOutlineMoreHoriz,
} from "react-icons/md";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { SlScreenDesktop } from "react-icons/sl";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import Image from "next/image";
interface Topic {
  id: number;
  title: string;
  content: string;
}

export default function Index() {
  const [open, setOpen] = useState(false);
  const [isPptOpen, setIsPptOpen] = useState(false);
  const router = useRouter();

  const topics: Topic[] = [
    {
      id: 1,
      title: "Topic 1",
      content:
        "Lorem ipsum dolor sit amet consectetur. Risus vehicula venenatis in senectus tincidunt in locus. Molestuda at tincidunt condititur tellus volutpat proin.",
    },
    {
      id: 2,
      title: "Topic 2",
      content:
        "Lorem ipsum dolor sit amet consectetur. Risus vehicula venenatis in senectus tincidunt in locus. Molestuda at tincidunt condititur tellus volutpat proin.",
    },
    {
      id: 3,
      title: "Topic 3",
      content:
        "Lorem ipsum dolor sit amet consectetur. Risus vehicula venenatis in senectus tincidunt in locus. Molestuda at tincidunt condititur tellus volutpat proin.",
    },
    {
      id: 4,
      title: "Topic 4",
      content:
        "Lorem ipsum dolor sit amet consectetur. Risus vehicula venenatis in senectus tincidunt in locus. Molestuda at tincidunt condititur tellus volutpat proin.",
    },
    {
      id: 5,
      title: "Topic 5",
      content:
        "Lorem ipsum dolor sit amet consectetur. Risus vehicula venenatis in senectus tincidunt in locus. Molestuda at tincidunt condititur tellus volutpat proin.",
    },
    {
      id: 6,
      title: "Topic 6",
      content:
        "Lorem ipsum dolor sit amet consectetur. Risus vehicula venenatis in senectus tincidunt in locus. Molestuda at tincidunt condititur tellus volutpat",
    },
    {
      id: 7,
      title: "Topic 7",
      content:
        "Lorem ipsum dolor sit amet consectetur. Risus vehicula venenatis in senectus tincidunt in locus. Molestuda at tincidunt condititur tellus volutpat proin.",
    },
  ];

  return (
    <div className="w-full flex flex-col relative text-small md:text-regular max-h-lvh ">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.4fr] md:gap-6 h-full">
        <div className="relative h-full bg-transparent rounded-xl flex flex-col gap-4">
          <Dialog open={isPptOpen} onOpenChange={setIsPptOpen}>
            <DialogTrigger asChild>
              <Image
                src="/img/classroom/classroom_img_1.png"
                alt="Chemistry formulas on blackboard"
                width={500}
                height={500}
                className="w-full h-72 md:h-auto object-cover rounded-xl cursor-pointer"
              />
            </DialogTrigger>
            <DialogContent className="w-[90%] h-fit md:h-[80%] bg-white border-none rounded-xl overflow-auto">
              <div className="flex justify-center">
                <Image
                  src="/img/classroom/classroom_img_1.png"
                  alt="Chemistry formulas on blackboard"
                  width={500}
                  height={500}
                  fill={false}
                  className="w-auto h-full  object-contain rounded-xl cursor-pointer"
                />
              </div>
              <DialogTitle className=" text-center h-0 w-0 hidden">
                {/* Prove Your Mastery to Skip! */}
              </DialogTitle>
              {/* <DialogHeader>
                        <DialogTitle className="text-xl md:text-2xl text-center mb-6 tracking-normal">
                          Prove Your Mastery to Skip!
                        </DialogTitle>
                        <DialogDescription className="text-center text-small md:text-regular font-[400]">
                          Take a quick test to skip this chapter/topic. Show
                          your understanding and move ahead!
                        </DialogDescription>
                      </DialogHeader> */}
              {/*  */}
            </DialogContent>
          </Dialog>
          {/* <img
              src="/img/classroom/classroom_img_1.png"
              alt="Chemistry formulas on blackboard"
              className="w-full h-72 md:h-auto object-cover rounded-xl"
            /> */}
            <div className="md:hidden block w-full rounded-xl">
              <Image
                className="w-full h-52 object-cover rounded-xl"
                src="/img/classroom/classroom_avtar_dummy_img.png"
                width={500}
                height={500}
                fill={false}
                alt="Classroom"
              />
            </div>
          <div className="bg-gray-200 h-40 md:h-60 mb-10 md:mb-10 w-full rounded-xl"></div>
        </div>

        <div className="flex-1 h-full">
          <div className="max-w-3xl mx-auto  ">
            <div className="hidden md:flex items-center gap-4 my-2 md:my-6 md:mt-0 mb-6 w-full rounded-xl">
              <Image
                className="w-full h-52 object-cover rounded-xl"
                src="/img/classroom/classroom_avtar_dummy_img.png"
                width={500}
                height={500}
                fill={false}
                alt="Classroom"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold">Biology - Day 12</h1>
              <div>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 md:h-10 text-lg md:text-regular bg-[var(--MainLight-color)] font-[500] float-right px-4 rounded-lg hover:bg-[var(--MainLight-color)]"
                    >
                      Skip Topic
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%] sm:max-w-lg p- md:x-10 rounded-xl">
                    <div className="flex justify-center">
                      <Image
                        src="/img/classroom/release_alert.png"
                        alt="Release Alert"
                        width={500}
                        height={500}
                        fill={false}
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
                      {/* <Button
                          variant="outline"
                          className="flex-1 h-10 md:h-12 text-small md:text-regular border-[var(--MainLight-color)] hover:bg-white hover:scale-[1.03] transition-all duration-300 rounded-lg"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </Button> */}
                      <Button
                        className="flex-1 h-10 md:h-12 text-small md:text-regular bg-[var(--MainLight-color)] hover:bg-[var(--MainLight-color)] text-black hover:scale-[1.02] transition-all duration-300 rounded-lg"
                        onClick={() => {
                          setOpen(false);
                          router.push("/test");
                        }}
                      >
                        Start Test
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="space-y-2 border p-4 rounded-xl mb-10 md:mb-0 h-96 overflow-y-scroll">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Topics</h2>
              <Accordion type="single" collapsible className="w-full">
                {topics.map((topic) => (
                  <AccordionItem key={topic.id} value={`topic-${topic.id}`}>
                    <AccordionTrigger className="text-left text-lg  md:text-lg ">
                      {topic.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-base md:text-lg">
                      {topic.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Btns  */}
      <div className="sticky z-20 bottom-5 w-full grid grid-cols-1 md:grid-cols-[1fr_0.4fr] md:gap-6">
        <div className="border-t w-full mx-auto rounded-lg bg-[var(--Secondary-color)]">
          <nav className="max-w-3xl mx-auto px-4 py-3 md:py-4 w-full">
            <ul className="flex flex-wrap justify-between md:items-center">
              <li>
                <button className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300 ">
                  <MdOutlineChat className="h-5 w-5" />
                  <span className="text-xs">Chat</span>
                </button>
              </li>
              <li>
                <button className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300 ">
                  {" "}
                  <MdOutlinePeopleAlt className="h-5 w-5" />
                  <span className="text-xs">People</span>
                </button>
              </li>
              <li>
                <button className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300">
                  {" "}
                  <HiOutlineHandRaised className="h-5 w-5" />
                  <span className="text-xs">Raise</span>
                </button>
              </li>
              <li>
                <button className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300">
                  {" "}
                  <MdOutlineAddReaction className="h-5 w-5" />
                  <span className="text-xs">React</span>
                </button>
              </li>
              <li>
                <button className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300">
                  {" "}
                  <MdGridView className="h-5 w-5" />
                  <span className="text-xs">View</span>
                </button>
              </li>
              <li>
                <button className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300">
                  {" "}
                  <SlScreenDesktop className="h-5 w-5" />
                  <span className="text-xs">Rooms</span>
                </button>
              </li>
              {/* <li>
                  <button className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300">
                    {" "}
                    <HiMiniCursorArrowRipple className="h-5 w-5" />
                    <span className="text-xs">Copilot</span>
                  </button>
                </li>
                <li>
                  <button className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-300">
                    {" "}
                    <FaRegPlusSquare className="h-5 w-5" />
                    <span className="text-xs">Apps</span>
                  </button>
                </li> */}
              <li>
                <button className="flex flex-col items-center gap-1">
                  {" "}
                  <MdOutlineMoreHoriz className="h-5 w-5" />
                  <span className="text-xs">More</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div></div>
      </div>
      <div className="fixed bottom-0 z-10 h-[105px] md:h-28 w-full bg-transparent grid grid-cols-1 md:grid-cols-[1fr_0.4fr]">
        <div className="bg-white w-full h-full"></div>
      </div>
    </div>
  );
}
