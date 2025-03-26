import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface PresentationData {
  success: boolean;
  status: number;
  message: string;
  data: {
    topic_id: string;
    topic_name: string;
    subject_name: string;
    class_name: string;
    html_content: string;
  };
} 

function PresentationSection({
  isPptOpen,
  setIsPptOpen,
  presentationData,
  isLoading,
}: {
  isPptOpen: boolean;
  setIsPptOpen: (value: boolean) => void;
  presentationData?: PresentationData;
  isLoading: boolean;
}) {
  const [loading, setLoading] = useState(isLoading);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Change the delay as needed
    return () => clearTimeout(timer);
  }, []);
  return (
    <Dialog open={isPptOpen} onOpenChange={setIsPptOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-[25rem] overflow-auto rounded-xl outline md:outline-none outline-[6px] md:border-[6px] outline-gray-50 border-gray-50 cursor-pointer">
          {loading ? (
            <Skeleton className="w-full h-full bg-primary/20" />
          ) : (
            <div dangerouslySetInnerHTML={{
              __html: `${presentationData?.data?.html_content?.replace("```html", "").replace("```", "")}`,
            }} />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:w-[98%] h-[97%] md:h-[95%] bg-white border-none -p-6 rounded-2xl md:rounded-3xl">
        <div className="overflow-auto rounded-3xlxl">
          {loading ? (
            <Skeleton className="w-full bg-red-300 h-[30rem]" />
          ) : (
            <div dangerouslySetInnerHTML={{
              __html: `${presentationData?.data?.html_content?.replace("```html", "").replace("```", "")}`,
            }} />
          )}
        </div>
        <DialogTitle className="text-center h-0 w-0 hidden"></DialogTitle>
      </DialogContent>
    </Dialog>
  );
}

export default PresentationSection;