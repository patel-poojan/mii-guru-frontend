"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// import { Description } from "@radix-ui/react-dialog"

const questions = [
  {
    id: 1,
    question: "Match the structure responsible for gas exchange in leaves",
    description:
      "The diagram below shows the cross-section of a leaf. Label the following parts:",
    image: "/img/test/leaf_structure.png",
    options: [
      { id: "stomata", label: "Stomata" },
      { id: "xylem", label: "Xylem" },
      { id: "phloem", label: "Phloem" },
      { id: "cuticle", label: "Cuticle" },
      { id: "epidermis", label: "Epidermis" },
    ],
    answer: "stomata",
  },
  {
    id: 2,
    question: "Identify the tissue that conducts water in plants",
    options: [
      { id: "xylem", label: "Xylem" },
      { id: "phloem", label: "Phloem" },
      { id: "cambium", label: "Cambium" },
      { id: "cortex", label: "Cortex" },
      { id: "pith", label: "Pith" },
    ],
    answer: "xylem",
  },
  {
    id: 3,
    question: "Which structure is responsible for photosynthesis in leaves?",
    description:
      "The diagram below shows the cross-section of a leaf. Label the following parts:",

    image: "/img/test/leaf_cross_section.png",
    options: [
      { id: "palisade", label: "Palisade Mesophyll" },
      { id: "epidermis", label: "Epidermis" },
      { id: "guard_cells", label: "Guard Cells" },
      { id: "vascular_bundle", label: "Vascular Bundle" },
      { id: "cuticle", label: "Cuticle" },
    ],
    answer: "palisade",
  },
  {
    id: 4,
    question: "Identify the protective outer layer of the leaf",
    description:
      "The diagram below shows the cross-section of a leaf. Label the following parts:",
    image: "/img/test/leaf_surface.png",
    options: [
      { id: "cuticle", label: "Cuticle" },
      { id: "mesophyll", label: "Mesophyll" },
      { id: "vein", label: "Vein" },
      { id: "chloroplast", label: "Chloroplast" },
      { id: "cell_wall", label: "Cell Wall" },
    ],
    answer: "cuticle",
  },
  {
    id: 5,
    question: "Which structure transports sugar in plants?",
    image: "/img/test/plant_transport.png",
    options: [
      { id: "phloem", label: "Phloem" },
      { id: "xylem", label: "Xylem" },
      { id: "epidermis", label: "Epidermis" },
      { id: "cortex", label: "Cortex" },
      { id: "pith", label: "Pith" },
    ],
    answer: "phloem",
  },
  {
    id: 6,
    question: "Identify the cell layer that controls gas exchange",
    image: "/img/test/stomata_structure.png",
    options: [
      { id: "guard_cells", label: "Guard Cells" },
      { id: "epidermal_cells", label: "Epidermal Cells" },
      { id: "mesophyll_cells", label: "Mesophyll Cells" },
      { id: "companion_cells", label: "Companion Cells" },
      { id: "bundle_sheath", label: "Bundle Sheath" },
    ],
    answer: "guard_cells",
  },
  {
    id: 7,
    question: "Which structure contains the most chloroplasts?",
    image: "/img/test/leaf_cells.png",
    options: [
      { id: "palisade", label: "Palisade Mesophyll" },
      { id: "spongy", label: "Spongy Mesophyll" },
      { id: "epidermis", label: "Epidermis" },
      { id: "vascular", label: "Vascular Tissue" },
      { id: "guard_cells", label: "Guard Cells" },
    ],
    answer: "palisade",
  },
  {
    id: 8,
    question: "Identify the tissue responsible for support in plants",
    image: "/img/test/plant_support.png",
    options: [
      { id: "sclerenchyma", label: "Sclerenchyma" },
      { id: "parenchyma", label: "Parenchyma" },
      { id: "epidermis", label: "Epidermis" },
      { id: "phloem", label: "Phloem" },
      { id: "xylem", label: "Xylem" },
    ],
    answer: "sclerenchyma",
  },
  {
    id: 9,
    question: "Which structure allows for cell expansion in plants?",
    image: "/img/test/plant_cell.png",
    options: [
      { id: "vacuole", label: "Vacuole" },
      { id: "nucleus", label: "Nucleus" },
      { id: "mitochondria", label: "Mitochondria" },
      { id: "chloroplast", label: "Chloroplast" },
      { id: "cell_wall", label: "Cell Wall" },
    ],
    answer: "vacuole",
  },
  {
    id: 10,
    question: "Identify the structure where most CO2 absorption occurs",
    image: "/img/test/leaf_gas_exchange.png",
    options: [
      { id: "spongy", label: "Spongy Mesophyll" },
      { id: "palisade", label: "Palisade Mesophyll" },
      { id: "epidermis", label: "Epidermis" },
      { id: "vein", label: "Vein" },
      { id: "cuticle", label: "Cuticle" },
    ],
    answer: "spongy",
  },
  {
    id: 11,
    question: "Which structure produces ATP in plant cells?",
    image: "/img/test/plant_cell_energy.png",
    options: [
      { id: "mitochondria", label: "Mitochondria" },
      { id: "chloroplast", label: "Chloroplast" },
      { id: "nucleus", label: "Nucleus" },
      { id: "vacuole", label: "Vacuole" },
      { id: "golgi", label: "Golgi Apparatus" },
    ],
    answer: "mitochondria",
  },
  {
    id: 12,
    question: "Identify the site of protein synthesis in plant cells",
    image: "/img/test/cell_protein.png",
    options: [
      { id: "ribosome", label: "Ribosome" },
      { id: "nucleus", label: "Nucleus" },
      { id: "vacuole", label: "Vacuole" },
      { id: "chloroplast", label: "Chloroplast" },
      { id: "mitochondria", label: "Mitochondria" },
    ],
    answer: "ribosome",
  },
  {
    id: 13,
    question: "Which structure stores genetic information in plants?",
    image: "/img/test/cell_nucleus.png",
    options: [
      { id: "nucleus", label: "Nucleus" },
      { id: "vacuole", label: "Vacuole" },
      { id: "chloroplast", label: "Chloroplast" },
      { id: "mitochondria", label: "Mitochondria" },
      { id: "golgi", label: "Golgi Apparatus" },
    ],
    answer: "nucleus",
  },
  {
    id: 14,
    question: "Identify the structure that packages and modifies proteins",
    image: "/img/test/cell_protein_transport.png",
    options: [
      { id: "golgi", label: "Golgi Apparatus" },
      { id: "er", label: "Endoplasmic Reticulum" },
      { id: "vacuole", label: "Vacuole" },
      { id: "nucleus", label: "Nucleus" },
      { id: "lysosome", label: "Lysosome" },
    ],
    answer: "golgi",
  },
  {
    id: 15,
    question: "Which structure is responsible for cell division in plants?",
    image: "/img/test/plant_growth.png",
    options: [
      { id: "meristem", label: "Meristem" },
      { id: "epidermis", label: "Epidermis" },
      { id: "cortex", label: "Cortex" },
      { id: "pith", label: "Pith" },
      { id: "vascular", label: "Vascular Tissue" },
    ],
    answer: "meristem",
  },
  {
    id: 16,
    question: "Identify the structure that absorbs water in roots",
    image: "/img/test/root_structure.png",
    options: [
      { id: "root_hair", label: "Root Hair" },
      { id: "cortex", label: "Cortex" },
      { id: "endodermis", label: "Endodermis" },
      { id: "pericycle", label: "Pericycle" },
      { id: "stele", label: "Stele" },
    ],
    answer: "root_hair",
  },
  {
    id: 17,
    question: "Which structure controls water movement in roots?",
    image: "/img/test/root_transport.png",
    options: [
      { id: "endodermis", label: "Endodermis" },
      { id: "epidermis", label: "Epidermis" },
      { id: "cortex", label: "Cortex" },
      { id: "pericycle", label: "Pericycle" },
      { id: "xylem", label: "Xylem" },
    ],
    answer: "endodermis",
  },
  {
    id: 18,
    question: "Identify the structure where lateral roots originate",
    image: "/img/test/root_development.png",
    options: [
      { id: "pericycle", label: "Pericycle" },
      { id: "cortex", label: "Cortex" },
      { id: "endodermis", label: "Endodermis" },
      { id: "epidermis", label: "Epidermis" },
      { id: "stele", label: "Stele" },
    ],
    answer: "pericycle",
  },
  {
    id: 19,
    question: "Which structure produces secondary xylem and phloem?",
    image: "/img/test/stem_growth.png",
    options: [
      { id: "vascular_cambium", label: "Vascular Cambium" },
      { id: "cork_cambium", label: "Cork Cambium" },
      { id: "pith", label: "Pith" },
      { id: "cortex", label: "Cortex" },
      { id: "epidermis", label: "Epidermis" },
    ],
    answer: "vascular_cambium",
  },
  {
    id: 20,
    question: "Identify the structure that produces bark in woody plants",
    image: "/img/test/stem_protection.png",
    options: [
      { id: "cork_cambium", label: "Cork Cambium" },
      { id: "vascular_cambium", label: "Vascular Cambium" },
      { id: "pith", label: "Pith" },
      { id: "xylem", label: "Xylem" },
      { id: "phloem", label: "Phloem" },
    ],
    answer: "cork_cambium",
  },
];

export default function Page() {
  const [activeQuestionId, setActiveQuestionId] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(
    questions.find((question) => question.id === activeQuestionId)
  );
  useState(() => {
    setActiveQuestion(() =>
      questions.find((question) => question.id === activeQuestionId)
    );
  }, [activeQuestionId]);
  console.log("activeQuestion", activeQuestion);
  console.log("activeQuestionId", activeQuestionId);
  const [selectedOption, setSelectedOption] = useState("stomata");
  const [timeLeft, setTimeLeft] = useState(58);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-[92%] md:w-[90%]  mx-auto  mt-10 mb-10 border-none outline-none text-lg md:text-xl">
      <div>
        <div id="question" key={activeQuestion.id} className=" rounded-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Biology Mock Test</h1>
              <p className="text-gray-600">
                Question {activeQuestionId} of {questions.length}
              </p>
            </div>
            <div className="bg-[var(--MainLight-color)] pl-4 md:pl-5 pr-5 md:pr-7 h-[44px] md:h-14 rounded-2xl flex items-center gap-3 md:gap-5 text-lg md:text-xl">
              <span className="mb-3 md:mb-4 w-4 h-4 scale-110 md:scale-125">⏱️</span>
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="relative bg-[var(--Secondary-color)]  p-4 md:p-10 rounded-2xl overflow-hidden">
            {" "}
            <div>
              <p className=" font-semibold mb-4">
                {activeQuestion.question}
              </p>
              <p className="text-gray-600 mb-10">
                {activeQuestion.description}
              </p>
            </div>
            <div
              className={`grid  ${
                activeQuestion.image
                  ? "md:grid-cols-[1fr_0.6fr]"
                  : "grid-cols-1"
              } gap-8`}
            >
              <div className="space-y-6">
                <RadioGroup
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                  className={` ${
                    activeQuestion.image
                      ? "space-y-[2px] md:space-y-2"
                      : "grid md:grid-cols-2 gap-2 md:gap-4   "
                  }`}
                >
                  {activeQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedOption(option.id)}
                      className={`flex items-center space-x-3 md:space-x-4 px-5 h-14 rounded-lg border bg-white
                      ${
                        selectedOption === option.id
                          ? "border-[3px] md:border-4 border-[var(--MainLight-color)]"
                          : "border-gray-200"
                      }`}
                    >
                      <input type="radio" value={option.id} id={option.id} checked={option.id==selectedOption} className="accent-[var(--MainLight-color)]  h-4 w-4" />
                      
                      <label
                        htmlFor={option.id}
                        className=" cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </button>
                  ))}
                </RadioGroup>
              </div>

              {activeQuestion.image && (
                <div className="relative rounded-lg">
                  <Image
                    src="/img/test/leaf_img_test.png"
                    alt="Leaf cross-section diagram"
                    fill
                    className="object-contain w-full h-auto"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-2 justify-between pt-4 mt-10">
              <button
              
                //   disabled={activeQuestionId==1}
                onClick={() => {
                 activeQuestionId > 1 && setActiveQuestionId((prev) => prev - 1)
                    setActiveQuestion(() =>
                        questions.find(
                        (question) => question.id === activeQuestionId
                        ))
                }}
                className={`${
                  activeQuestionId == 1 ? "cursor-not-allowed disabled" : ""
                } bg-white border-2 border-[var(--MainLight-color)] text-[var(--MainLight-color)] font-[500] w-full sm:w-40 py-2 rounded-lg`}
              >
                Previous
              </button>
              <button
                onClick={() => {
                    activeQuestionId < questions.length && setActiveQuestionId((prev) => prev + 1);
                  setActiveQuestion(() =>
                    questions.find(
                      (question) => question.id === activeQuestionId
                    )
                  );
                }}
                className="bg-[var(--MainLight-color)] border-2 border-[var(--MainLight-color)] w-full sm:w-40 py-2 rounded-lg font-[500]"
              >
                {activeQuestionId === questions.length ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
