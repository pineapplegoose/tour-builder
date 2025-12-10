import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getSteps = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    return await ctx.db
      .query("steps")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .order("asc")
      .collect()
  },
})

export const createStep = mutation({
  args: {
    tourId: v.id("tours"),
    stepId: v.string(),
    title: v.string(),
    description: v.string(),
    targetElement: v.string(),
    position: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }
    const stepId = await ctx.db.insert("steps", args)
    return stepId
  },
})

export const updateStep = mutation({
  args: {
    id: v.id("steps"),
    title: v.string(),
    description: v.string(),
    targetElement: v.string(),
    position: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }
    const { id, ...updates } = args
    await ctx.db.patch(id, updates)
  },
})

export const deleteStep = mutation({
  args: { id: v.id("steps") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }
    await ctx.db.delete(args.id)
  },
})

export const reorderSteps = mutation({
  args: {
    updates: v.array(
      v.object({
        id: v.id("steps"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }
    for (const update of args.updates) {
      await ctx.db.patch(update.id, { order: update.order })
    }
  },
})
