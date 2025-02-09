"use client";
import {
  MessageSquare,
  Users,
  Hand,
  SmilePlus,
  LayoutGrid,
  Video,
  Split,
  Grid,
  MoreHorizontal,
} from "lucide-react";

import {
    Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Topic {
  id: number;
  title: string;
  content: string;
}

export default function Index() {

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
    }
  ];

  return (
    <>

      {/* <div className="w-[94%] md:w-[90%] mx-auto flex flex-col relative bg-white min-h-lvh mt-[86px] md:mt-32"> */}
      <div className="w-[94%] md:w-[90%] mx-auto flex flex-col relative bg-white min-h-lvh mt-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.4fr] md:gap-6 h-full">
          <div className="relative h-full bg-transparent rounded-xl">
            <img
              src="/img/classroom/classroom_img_1.png"
              alt="Chemistry formulas on blackboard"
              className="w-full h-72 md:h-auto object-cover rounded-xl"
            />
          </div>

          <div className="flex-1 h-full">
            <div className="max-w-3xl mx-auto  ">
              <div className="flex items-center gap-4 my-2 md:my-6 md:mt-0 mb-6 w-full rounded-xl">
                <img className="w-full h-52 object-cover rounded-xl" src="/img/classroom/classroom_avtar_dummy_img.png" alt="Classroom" />
              </div>
              <div className="flex items-center gap-4 mb-6">
                {/* <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg" alt="Instructor" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar> */}
                <h1 className="text-2xl font-bold">Biology - Day 12</h1>
              </div>

              <div className="space-y-2 border p-4 rounded-xl mb-28 md:mb-0 h-96 overflow-y-scroll">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">Topics</h2>
                <Accordion type="single" collapsible className="w-full">
                  {topics.map((topic) => (
                    <AccordionItem key={topic.id} value={`topic-${topic.id}`}>
                      <AccordionTrigger className="text-left text-lg  md:text-lg ">
                        {topic.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-base md:text-lg">{topic.content}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Btns  */}
        <div className="fixed bottom-5 w-[94%] md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-[1fr_0.4fr] md:gap-6">
        <div className="border-t  w-full mx-auto rounded-lg bg-[var(--Secondary-color)]">
          <nav className="max-w-3xl mx-auto px-4 py-3 md:py-4 w-full">
            <ul className="flex flex-wrap justify-between md:items-center">
              <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-500 "
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-xs">Chat</span>
                </button>
              </li>
              <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-500 "
                >
                  {" "}
                  <Users className="h-5 w-5" />
                  <span className="text-xs">People</span>
                </button>
              </li>
              <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-500"
                >
                  {" "}
                  <Hand className="h-5 w-5" />
                  <span className="text-xs">Raise</span>
                </button>
              </li>
              <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-500"
                >
                  {" "}
                  <SmilePlus className="h-5 w-5" />
                  <span className="text-xs">React</span>
                </button>
              </li>
              <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-500"
                >
                  {" "}
                  <LayoutGrid className="h-5 w-5" />
                  <span className="text-xs">View</span>
                </button>
              </li>
              <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-500"
                >
                  {" "}
                  <Video className="h-5 w-5" />
                  <span className="text-xs">Rooms</span>
                </button>
              </li>
              <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-500"
                >
                  {" "}
                  <Split className="h-5 w-5" />
                  <span className="text-xs">Copilot</span>
                </button>
              </li>
              <li>
                <button
                  className="flex flex-col items-center gap-1 hover:scale-110 transition-all duration-500"
                >
                  {" "}
                  <Grid className="h-5 w-5" />
                  <span className="text-xs">Apps</span>
                </button>
              </li>
              <li>
                <button
                  className="flex flex-col items-center gap-1"
                >
                  {" "}
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="text-xs">More</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        </div>
      </div>
    </>
  );
}
