import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const data = {
    q: "Voici une question test",
    answers: ["Réponse 1", "Réponse 2"],
    correct: 0,
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Bienvenue sur l&apos;application de révision</CardTitle>
          <CardDescription>
            Créer par Yulian pour Dylan le nullosse.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            Pour démarrer, il suffit de coller les questions en format json :
          </p>
          <pre className="border border-gray-200 p-2 rounded-md">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>

        <CardFooter>
          <Link
            href="/session"
            className={buttonVariants({
              variant: "default",
              className: "w-full",
            })}
          >
            Réviser
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
