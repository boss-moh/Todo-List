import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks
export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

// Add a task
export const addTask = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    daysLeft: v.number(),
    priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("tasks", {
      title: args.title,
      description: args.description,
      daysLeft: args.daysLeft,
      priority: args.priority,
      completed: false,
      subtasks: [], // start empty
    });
  },
});

// Toggle task completion
export const toggleTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) return;
    await ctx.db.patch(args.id, { completed: !task.completed });
  },
});

// Add a subtask (pushing into array)
export const addSubtask = mutation({
  args: {
    taskId: v.id("tasks"),
    subtaskId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    if (!task) return;

    const newSubtasks = [
      ...task.subtasks,
      { id: args.subtaskId, title: args.title, completed: false },
    ];

    await ctx.db.patch(args.taskId, { subtasks: newSubtasks });
  },
});

// Toggle subtask completion
export const toggleSubtask = mutation({
  args: { taskId: v.id("tasks"), subtaskId: v.string() },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    if (!task) return;

    const updatedSubtasks = task.subtasks.map((s) =>
      s.id === args.subtaskId ? { ...s, completed: !s.completed } : s
    );

    await ctx.db.patch(args.taskId, { subtasks: updatedSubtasks });
  },
});
