"use client"; 
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import {  } from "react-icons/md";
import { useRouter } from 'next/navigation';

function FailDialogPopup({openFailModel, setOpenFailModel,handleRetryQuiz,score,totalQuestions}:{
  openFailModel: boolean;
  setOpenFailModel: (open: boolean) => void;
  handleRetryQuiz: () => void;
  score: number;
  totalQuestions: number;
}) {
  const router = useRouter();
  return (
    <Dialog open={openFailModel} onOpenChange={setOpenFailModel}>
        <DialogContent className="w-[90%] sm:max-w-md p-6 rounded-xl">
          <div className="flex justify-center mt-4">
            <img
              src="/img/classroom/release_alert.png"
              alt="Release Alert"
              className="h-16 w-auto"
            />
          </div>
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl text-center mb-4">
              Keep Learning!
            </DialogTitle>
            <DialogDescription className="text-center text-small md:text-regular font-[400]">
              <span className='text-red-400 font-[500]'>You didn&apos;t pass this test, but don&apos;t worry! Review the
              topic and try again to move ahead.</span>
              <br/>
              <span className='tracking-wide'>Score: {score}/{totalQuestions} </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-4">
            <Button
              className="flex-1 h-10 md:h-12 text-small bg-white hover:bg-white border-2 md:text-regular text-[var(--MainLight-color)] border-[var(--MainLight-color)] hover:scale-[1.02] transition-all duration-300"
              onClick={() => {
                setOpenFailModel(false);
                router.push("/classroom");
              }}
            >
              Back to Study
            </Button>
            <Button
              className="flex-1 h-10 md:h-12 text-small md:text-regular bg-[var(--MainLight-color)] hover:bg-[var(--MainLight-color)] text-black hover:scale-[1.02] transition-all duration-300"
              onClick={handleRetryQuiz}
            >
              Retry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  )
}

export default FailDialogPopup