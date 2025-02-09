"use client";

import { useState } from "react";
import Image from "next/image";

interface FacultyMember {
  id: number;
  name: string;
  subject: string;
  imageUrl: string;
}

export default function Index() {
  // const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  // const [faculty, setFaculty] = useState<FacultyMember[]>([
  const [faculty] = useState<FacultyMember[]>([
    {
      id: 1,
      name: "Mrs Anna",
      subject: "Maths",
      imageUrl: "/img/meet-teachers/mrs_anna.png",
    },
    {
      id: 2,
      name: "Miss Rashmi",
      subject: "Physics",
      imageUrl: "/img/meet-teachers/miss_rohini.png",
    },
    {
      id: 3,
      name: "Mr David",
      subject: "Biology",
      imageUrl: "/img/meet-teachers/mr_ankit.png",
    },
    {
      id: 4,
      name: "Mrs Anna",
      subject: "Maths",
      imageUrl: "/img/meet-teachers/mrs_anna.png",
    },
    // {
    //   id: 5,
    //   name: "Mrs Anna",
    //   subject: "Maths",
    //   imageUrl: "/img/meet-teachers/mrs_anna.png",
    // },
    // {
    //   id: 6,
    //   name: "Miss Rashmi",
    //   subject: "Physics",
    //   imageUrl: "/img/meet-teachers/miss_rohini.png",
    // },
    // {
    //   id: 7,
    //   name: "Mr David",
    //   subject: "Biology",
    //   imageUrl: "/img/meet-teachers/mr_ankit.png",
    // },
    // {
    //   id: 8,
    //   name: "Mrs Anna",
    //   subject: "Maths",
    //   imageUrl: "/img/meet-teachers/mrs_anna.png",
    // },
  ]);

  return (
    <>
      {/* <Header isNavbarOpen={isNavbarOpen} setIsNavbarOpen={setIsNavbarOpen} /> */}
      {/* <div className="w-[90%] mx-auto mt-24 md:mt-32"> */}
      <div className="w-[90%] mx-auto mt-10">
        <h1 className="text-2xl md:text-4xl font-bold opacity-80 text-gray-700 mb-10">
          Meet your teachers
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-10">
          {faculty.map((member) => (
            <button key={member.id} className="flex flex-col items-center ">
              <div className="relative w-full aspect-[4/5]">
                <div className="relative h-full w-full">
                  <Image
                    src={member.imageUrl || "/placeholder.svg"}
                    alt={`${member.name}'s profile`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-full bg-[var(--Secondary-color)] mt-0 p-4 text-center space-y-1">
                <h3 className="font-semibold text-xl md:text-2xl">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.subject}</p>
              </div>
            </button>
          ))}
        </div>

        <h1 className="text-lg md:text-xl opacity-80 text-gray-800 my-10">
          You can have a conversation with her and introduce yourself and brief
          her about your study plans.
        </h1>
      </div>
    </>
  );
}
