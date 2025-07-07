"use client";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Question } from "./Question";

export const SessionComp = () => {
  const [nbCorrect, setNbCorrect] = useState<number>(0);
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [data, setData] = useState<
    { q: string; answers: string[]; correct: number }[] | null
  >(null);

  const onClick = () => {
    if (!textRef.current) return;
    setData(JSON.parse(textRef.current.value));
  };

  const onSubmit = () => {
    setIndex((prev) => prev + 1);
  };

  const onRestart = () => {
    setIndex(0);
    setNbCorrect(0);
    const prevData = data;
    setData(null);
    setTimeout(() => {
      setData(prevData);
    }, 100);
  };

  const onStop = () => {
    setIndex(0);
    setNbCorrect(0);
    setData(null);
  };

  return (
    <Card className="w-full max-w-md">
      {!data ? (
        <>
          <CardHeader>
            <CardTitle>Rentrer vos questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              ref={textRef}
              placeholder="Entrez vos questions."
              className="w-sm max-h-96"
            />
          </CardContent>
          <CardFooter className="w-full flex justify-end">
            <Button onClick={onClick}>C&apos;est parti !</Button>
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>
              {index < data.length ? "C'est parti !" : "Fini !"}
            </CardTitle>
            {index >= data.length && (
              <CardDescription>
                Vous avez {nbCorrect} corrects réponses sur {data.length}{" "}
                questions.
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="text-sm">
            {data.map((el, i) => {
              return (
                <Question
                  key={`question-${i}`}
                  data={el}
                  isVisible={i === index}
                  increase={() => setNbCorrect((prev) => prev + 1)}
                />
              );
            })}
          </CardContent>
          <CardFooter>
            {index < data.length ? (
              <div className="w-full flex justify-end">
                <Button onClick={onSubmit}>Suivant</Button>
              </div>
            ) : (
              <div className="w-full flex gap-2">
                <Button
                  onClick={onStop}
                  variant="destructive"
                  className="w-1/2"
                >
                  Arrêter
                </Button>
                <Button onClick={onRestart} variant="default" className="w-1/2">
                  Recommencer
                </Button>
              </div>
            )}
          </CardFooter>
        </>
      )}
    </Card>
  );
};
