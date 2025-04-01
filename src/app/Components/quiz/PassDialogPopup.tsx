"use client"; 
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdNavigateNext } from "react-icons/md";
import { useRouter } from "next/navigation";

function PassDialogPopup({
  openPassModel,
  setOpenPassModel,
  score,totalQuestions
}: {
  openPassModel: boolean;
  setOpenPassModel: (open: boolean) => void;
  score: number;
  totalQuestions: number;
}) {
  const router = useRouter();
  return (
    <Dialog open={openPassModel} onOpenChange={setOpenPassModel}>
      <DialogContent className="w-[90%] sm:max-w-md p-6 rounded-xl">
        <div className="flex justify-center mt-4">
          <img
            src="/img/test/check_circle.png"
            alt="Release Alert"
            className="h-16 w-auto"
          />
        </div>
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl text-center mb-4 text-green-700">
            Congrats! You&apos;ve Mastered This Topic!
          </DialogTitle>
          <DialogDescription className="text-center text-small md:text-regular font-[400]">
            You&apos;ve successfully passed the test and can now skip this
            chapter. Keep up the great work!
            <br/>
            <span className='tracking-wide'>Score: {score}/{totalQuestions} </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 mt-4">
          <Button
            className="flex-1 h-10 md:h-12 text-small md:text-regular bg-[var(--MainLight-color)] hover:bg-[var(--MainLight-color)] text-black hover:scale-[1.02] transition-all duration-300"
            onClick={() => {
              setOpenPassModel(false);
              router.push("/classroom");
            }}
          >
            Continue to Next Topic <MdNavigateNext className="h-8 w-8" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PassDialogPopup;
