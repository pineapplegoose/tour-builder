import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Get or create a user based on their Clerk authentication
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return null
    }

    // Look up user by tokenIdentifier
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique()

    return user
  },
})

// Ensure user exists in database (call this after authentication)
export const ensureUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Not authenticated")
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique()

    if (existingUser) {
      return existingUser._id
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      email: args.email,
      name: args.name,
      passwordHash: "", // Not used with Clerk auth
      createdAt: Date.now(),
    })

    return userId
  },
})
