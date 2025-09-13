import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Taskly - Your Personal Task Manager",
  description:
    "Become focused, organized, and calm with Taskly. The world's #1 task manager and to-do list app designed to bring clarity to your workflow.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-5xl font-bold  leading-tight tracking-tight">
            Organize your work and life, finally.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Become focused, organized, and calm with Taskly. The world&apos;s #1
            task manager and to-do list app designed to bring clarity to your
            workflow.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href={"/main"}>Get Started</Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href={"/main"}>Learn more</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="w-full py-4 mt-16">
        <div className="container mx-auto px-6 text-center text-muted">
          <p>© 2025 Taskly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
