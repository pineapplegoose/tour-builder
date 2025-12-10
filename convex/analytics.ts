import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const trackEvent = mutation({
  args: {
    tourId: v.id("tours"),
    sessionId: v.string(),
    stepId: v.string(),
    event: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analytics", {
      ...args,
      timestamp: Date.now(),
    })
  },
})

export const getTourAnalytics = query({
  args: {
    tourId: v.id("tours"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const tour = await ctx.db.get(args.tourId)
    if (!tour || tour.userId !== args.userId) {
      throw new Error("Tour not found or access denied")
    }

    const events = await ctx.db
      .query("analytics")
      .withIndex("by_tour", (q) => q.eq("tourId", args.tourId))
      .collect()

    const uniqueSessions = new Set(events.map((e) => e.sessionId))
    const sessions = uniqueSessions.size

    const completedSessions = new Set(
      events.filter((e) => e.event === "completed").map((e) => e.sessionId)
    ).size

    const skippedCount = events.filter((e) => e.event === "skipped").length

    const stepBreakdown: Record<
      string,
      { started: number; completed: number; skipped: number }
    > = {}

    events.forEach((event) => {
      if (!stepBreakdown[event.stepId]) {
        stepBreakdown[event.stepId] = { started: 0, completed: 0, skipped: 0 }
      }
      if (event.event === "started") stepBreakdown[event.stepId].started++
      if (event.event === "completed") stepBreakdown[event.stepId].completed++
      if (event.event === "skipped") stepBreakdown[event.stepId].skipped++
    })

    const now = Date.now()
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
    const recentEvents = events.filter((e) => e.timestamp > sevenDaysAgo)

    const dailyStats: Record<string, number> = {}
    recentEvents.forEach((event) => {
      const date = new Date(event.timestamp).toLocaleDateString()
      dailyStats[date] = (dailyStats[date] || 0) + 1
    })

    return {
      totalSessions: sessions,
      completedSessions,
      completionRate:
        sessions > 0 ? Math.round((completedSessions / sessions) * 100) : 0,
      skippedCount,
      stepBreakdown,
      dailyStats,
      recentEvents: events
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 50),
    }
  },
})

export const getAllToursAnalytics = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const tours = await ctx.db
      .query("tours")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect()

    let totalSessions = 0
    let totalCompleted = 0

    for (const tour of tours) {
      const events = await ctx.db
        .query("analytics")
        .withIndex("by_tour", (q) => q.eq("tourId", tour._id))
        .collect()

      const sessions = new Set(events.map((e) => e.sessionId)).size
      const completed = new Set(
        events.filter((e) => e.event === "completed").map((e) => e.sessionId)
      ).size

      totalSessions += sessions
      totalCompleted += completed
    }

    return {
      totalTours: tours.length,
      totalSessions,
      totalCompleted,
      overallCompletionRate:
        totalSessions > 0
          ? Math.round((totalCompleted / totalSessions) * 100)
          : 0,
    }
  },
})
