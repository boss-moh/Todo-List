"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.getTasks);
  console.log("Tasks:", tasks);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, title }) => (
        <div key={_id}>{title}</div>
      ))}
    </main>
  );
}
