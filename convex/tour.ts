import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getTours = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first()

    if (!user) {
      throw new Error("User not found")
    }

    const tours = await ctx.db
      .query("tours")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect()

    // Add step count to each tour
    const toursWithSteps = await Promise.all(
      tours.map(async (tour) => {
        const steps = await ctx.db
          .query("steps")
          .withIndex("by_tour", (q) => q.eq("tourId", tour._id))
          .collect()

        return {
          ...tour,
          stepCount: steps.length,
        }
      })
    )

    return toursWithSteps
  },
})

export const getTour = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first()

    if (!user) {
      throw new Error("User not found")
    }

    const tour = await ctx.db.get(args.tourId)
    if (!tour) {
      throw new Error("Tour not found")
    }

    if (tour.userId !== user._id) {
      throw new Error("Unauthorized")
    }

    return tour
  },
})

export const createTour = mutation({
  args: {
    name: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first()

    if (!user) {
      throw new Error("User not found")
    }

    const tourId = await ctx.db.insert("tours", {
      name: args.name,
      description: args.description,
      userId: user._id,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })

    return tourId
  },
})

export const updateTour = mutation({
  args: {
    tourId: v.id("tours"),
    name: v.string(),
    description: v.string(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first()

    if (!user) {
      throw new Error("User not found")
    }

    const tour = await ctx.db.get(args.tourId)
    if (!tour) {
      throw new Error("Tour not found")
    }

    if (tour.userId !== user._id) {
      throw new Error("Unauthorized")
    }

    const { tourId, ...updates } = args
    await ctx.db.patch(tourId, {
      ...updates,
      updatedAt: Date.now(),
    })
  },
})

export const deleteTour = mutation({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .first()

    if (!user) {
      throw new Error("User not found")
    }

    const tour = await ctx.db.get(args.tourId)
    if (!tour) {
      throw new Error("Tour not found")
    }

    if (tour.userId !== user._id) {
      throw new Error("Unauthorized")
    }

    // Delete all steps
    const steps = await ctx.db
      .query("steps")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect()

    for (const step of steps) {
      await ctx.db.delete(step._id)
    }

    // Delete all analytics
    const analytics = await ctx.db
      .query("analytics")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect()

    for (const analytic of analytics) {
      await ctx.db.delete(analytic._id)
    }

    // Delete the tour
    await ctx.db.delete(args.tourId)
  },
})
