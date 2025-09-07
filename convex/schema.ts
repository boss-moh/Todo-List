import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    daysLeft: v.number(),
    priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
    completed: v.boolean(),
    subtasks: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        completed: v.boolean(),
      })
    ),
  }),
});
