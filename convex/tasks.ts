import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks
export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const userId = user.subject;
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const getTaskByID = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");

    const userId = user.subject;

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== userId) return null;
    return task;
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
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const userId = user.subject;
    await ctx.db.insert("tasks", {
      userId: userId,
      title: args.title,
      description: args.description,
      daysLeft: args.daysLeft,
      priority: args.priority,
      completed: false,
      subtasks: [],
    });
  },
});

// Toggle task completion
export const markAsComplete = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const userId = user.subject;
    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== userId) return;
    await ctx.db.patch(args.id, { completed: !task.completed });
  },
});

// delete
export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const userId = user.subject;
    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== userId) return;
    await ctx.db.delete(args.id);
  },
});

// Add a subtask (pushing into array)
export const addSubtask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const userId = user.subject;
    const task = await ctx.db.get(args.taskId);
    if (!task || task.userId !== userId) return;
    const newSubtask = {
      id: crypto.randomUUID(),
      title: args.title,
      completed: false,
    };
    const newSubtasks = [...task.subtasks, newSubtask];
    await ctx.db.patch(args.taskId, { subtasks: newSubtasks });
  },
});

export const deleteSubTask = mutation({
  args: {
    taskId: v.id("tasks"),
    subtaskId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const userId = user.subject;
    const task = await ctx.db.get(args.taskId);
    if (!task || task.userId !== userId) return;
    const newSubtasks = task.subtasks.filter((s) => s.id !== args.subtaskId);
    await ctx.db.patch(args.taskId, { subtasks: newSubtasks });
  },
});

// Toggle subtask completion
export const toggleSubtask = mutation({
  args: { taskId: v.id("tasks"), subtaskId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const userId = user.subject;
    const task = await ctx.db.get(args.taskId);
    if (!task || task.userId !== userId) return;
    const updatedSubtasks = task.subtasks.map((s) =>
      s.id === args.subtaskId ? { ...s, completed: !s.completed } : s
    );
    await ctx.db.patch(args.taskId, { subtasks: updatedSubtasks });
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("high"), v.literal("medium"), v.literal("low")),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Not authenticated");
    const userId = user.subject;
    const { id, ...updates } = args;
    const task = await ctx.db.get(id);
    if (!task || task.userId !== userId) return;
    await ctx.db.patch(id, updates);
  },
});
