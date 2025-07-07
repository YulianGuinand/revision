"use client";
import { useRef, useState } from "react";
import { toast } from "sonner";
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
    if (textRef.current.value.length <= 10) return;
    try {
      setData(JSON.parse(textRef.current.value));
    } catch {
      toast.error("Une erreur est survenue");
    }
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

  const ExampleData = [
    {
      q: "Quelle est la capitale de l'Australie ?",
      answers: ["Sydney", "Canberra", "Melbourne"],
      correct: 1,
    },
    {
      q: "Qui a peint la Joconde ?",
      answers: ["Vincent Van Gogh", "Pablo Picasso", "Léonard de Vinci"],
      correct: 2,
    },
    {
      q: "Combien de continents y a-t-il sur Terre ?",
      answers: ["5", "6", "7"],
      correct: 2,
    },
    {
      q: "Quel est l'élément chimique dont le symbole est O ?",
      answers: ["Or", "Oxygène", "Osmium"],
      correct: 1,
    },
    {
      q: "Quelle est la langue officielle du Brésil ?",
      answers: ["Espagnol", "Portugais", "Français"],
      correct: 1,
    },
  ];

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
              placeholder={JSON.stringify(ExampleData, null, 2)}
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
