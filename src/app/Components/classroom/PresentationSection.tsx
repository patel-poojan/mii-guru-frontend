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
  presentationTrigger, // New prop for triggering re-renders
}: {
  isPptOpen: boolean;
  setIsPptOpen: (value: boolean) => void;
  presentationData?: PresentationData;
  isLoading: boolean;
  presentationTrigger?: number; // Optional trigger value
}) {
  const [loading, setLoading] = useState(isLoading);
  const [content, setContent] = useState<string | null>(null);

  // Use presentationTrigger in the dependency array to force re-render
  useEffect(() => {
    if (presentationData?.data?.html_content) {
      const cleanedContent = presentationData.data.html_content
        .replace("```html", "")
        .replace("```", "");
      setContent(cleanedContent);
    }
  }, [presentationData, presentationTrigger]); // Added presentationTrigger

  // Loading effect also depends on presentationTrigger
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [presentationData, presentationTrigger]); // Added presentationTrigger
  // const highlightCurrentWord = (content: string, wordTimestamps: WordTimestamp[], currentTime: number) => {
  //   return content.split(" ").map((word, index) => {
  //     const timestamp = wordTimestamps.find(
  //       (w) => currentTime >= w.start && currentTime <= w.end
  //     );
  //     return (
  //       <span key={index} className={timestamp ? "highlight" : ""}>
  //         {word}{" "}
  //       </span>
  //     );
  //   });
  // };
  return (
    <Dialog open={isPptOpen} onOpenChange={setIsPptOpen}>
      <DialogTrigger asChild>
        <div className="w-full h-[25rem] overflow-auto rounded-xl outline md:outline-none outline-[6px] md:border-[6px] outline-gray-50 border-gray-50 cursor-pointer" title="click to open in fullscreen">
          {loading ? (
            <Skeleton className="w-full h-full bg-primary/10" />
          ) : (
            <div 
              key={presentationTrigger} // Added key to force re-render
              dangerouslySetInnerHTML={{
                __html: content || '',
              }} 
            />
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="w-[95%] md:w-[98%] h-[97%] md:h-[95%] bg-white border-none -p-6 rounded-2xl md:rounded-3xl">
        <div className="overflow-auto rounded-3xlxl">
          {loading ? (
            <Skeleton className="w-full bg-red-300 h-[30rem]" />
          ) : (
            <div 
              key={presentationTrigger} // Added key to force re-render
              dangerouslySetInnerHTML={{
                __html: content || '',
              }} 
            />
          )}
        </div>
        <DialogTitle className="text-center h-0 w-0 hidden"></DialogTitle>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(PresentationSection);