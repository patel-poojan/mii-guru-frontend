// import { useRef, useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import DynamicInput from "../common/common/DynamicInput";

// interface FormData {
//   name: string;
//   dob: string;
//   email: string;
//   phone: string;
//   father_name: string;
//   mother_name: string;
//   address: string;
//   city: string;
//   country: string;
//   school_name: string;
//   board: string;
//   medium_of_study: string;
//   class_grade: string;
//   major: string;
//   subjects: Record<string, boolean>;
//   other_subjects: string;
//   activities: string;
//   availability: Record<string, boolean>;
//   time_availability_day: string;
//   time_to_finish: string;
// }

// export default function OnBoardingForm() {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     dob: "",
//     email: "",
//     phone: "",
//     father_name: "",
//     mother_name: "",
//     address: "",
//     city: "",
//     country: "",
//     school_name: "",
//     board: "",
//     medium_of_study: "",
//     class_grade: "",
//     major: "",
//     subjects: {
//       mathematics: false,
//       physics: false,
//       chemistry: false,
//       biology: false,
//     },
//     other_subjects: "",
//     activities: "",
//     availability: {
//       monday: false,
//       tuesday: false,
//       wednesday: false,
//       thursday: false,
//       friday: false,
//       saturday: false,
//       sunday: false,
//     },
//     time_availability_day: "",
//     time_to_finish: "",
//   });

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // const handleCheckboxChange = (field: keyof FormData, subfield: string) => {
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [field]: {
//   //       ...prev[field],
//   //       [subfield]: !prev[field][subfield],
//   //     },
//   //   }));
//   // };

//   return (
//     <form onSubmit={handleSubmit} className="w-[92%] md:w-[90%] mx-auto mt-24 md:mt-36 mb-12 space-y-4 md:space-y-8">
//       <div className="flex flex-col space-y-6 md:space-y-8 bg-gray-100 p-4 md:p-12 rounded-xl">
//         <h1 className="text-xl md:text-2xl font-semibold border-b-2 pb-3 border-gray-300">Personal Details</h1>
//         <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_0.4fr] gap-4">
//           <div className="space-y-4">
//             <DynamicInput label="Name*" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter Name" required />
//             <DynamicInput label="Email*" id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email" required />
//           </div>
//           <div className="space-y-4">
//             <DynamicInput label="Date of Birth*" id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
//             <DynamicInput label="Phone*" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Enter Number" required />
//           </div>
//           <div className="flex bg-white rounded-xl justify-end">
//             <button type="button" onClick={handleFileUpload} className="relative h-full w-full mx-auto rounded-full flex items-center justify-center">
//               <FaUserCircle className="h-2/3 w-2/3 text-gray-400" />
//               <input ref={fileInputRef} type="file" className="absolute z-10 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col space-y-6 md:space-y-8 bg-gray-100 p-4 md:p-12 rounded-xl">
//         <h1 className="text-xl md:text-2xl font-semibold border-b-2 pb-3 border-gray-300">Parents Details</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <DynamicInput label="Father Name*" id="father_name" name="father_name" value={formData.father_name} onChange={handleInputChange} placeholder="Enter Father Name" required />
//           <DynamicInput label="Mother Name*" id="mother_name" name="mother_name" value={formData.mother_name} onChange={handleInputChange} placeholder="Enter Mother Name" required />
//         </div>
//       </div>
//       <div className="flex flex-col space-y-6 md:space-y-8 bg-gray-100 p-4 md:p-12 rounded-xl">
//         <h1 className="text-xl md:text-2xl font-semibold border-b-2 pb-3 border-gray-300">Educational Information</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <DynamicInput label="School Name*" id="school_name" name="school_name" value={formData.school_name} onChange={handleInputChange} placeholder="Enter School Name" required />
//           <DynamicInput label="Board*" id="board" name="board" value={formData.board} onChange={handleInputChange} placeholder="Enter Board" required />
//         </div>
//       </div>
//       <div className="flex justify-end">
//         <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-8">Submit</Button>
//       </div>
//     </form>
//   );
// }

import React from 'react'

function onBoardingForm() {
  return (
    <div>onBoardingForm</div>
  )
}

export default onBoardingForm