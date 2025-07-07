import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "fixed top-4 left-4",
        })}
        href="/"
      >
        Retour Accueil
      </Link>
      {children}
    </div>
  );
}
