"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";

export const Question = ({
  data,
  isVisible,
  increase,
}: {
  data: { q: string; answers: string[]; correct: number };
  isVisible: boolean;
  increase: () => void;
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [btnClicked, setBtnClicked] = useState<number | null>(null);

  const onSubmit = (index: number) => {
    setIsSubmitted(true);
    setBtnClicked(index);
    if (index === data.correct) {
      increase();
    }
  };

  return (
    <div className={cn("flex-col gap-4", isVisible ? "flex" : "hidden")}>
      <p>{data.q}</p>
      <div className="flex flex-col gap-2">
        {data.answers.map((answer, i) => {
          return (
            <Button
              onClick={() => onSubmit(i)}
              variant="secondary"
              key={`button-${i}`}
              className={cn(
                "",
                isSubmitted &&
                  i === data.correct &&
                  "bg-green-400 hover:bg-green-500",
                btnClicked === i &&
                  btnClicked !== data.correct &&
                  "bg-red-400 hover:bg-red-500"
              )}
            >
              {answer}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
