'use client'

import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ReactNode, useMemo } from 'react'

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL

export function ConvexsProviderWithClerk({ children }: { children: ReactNode }) {
    const convex = useMemo(() => {
        if (!convexUrl) return null
        return new ConvexReactClient(convexUrl)
    }, [])

    if (!convex) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] p-6">
                <section className="w-full max-w-xl rounded-2xl border border-[#fbfbfb] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                    <p className="text-[12px] font-bold uppercase leading-4 tracking-[0.6px] text-[#0050cb]">
                        Convex setup required
                    </p>
                    <h1 className="mt-3 text-3xl font-bold tracking-[-0.5px] text-[#191c1e]">
                        Add your Convex URL
                    </h1>
                    <p className="mt-3 text-[16px] leading-6 text-[#424656]">
                        Create a <code className="rounded bg-[#f2f4f6] px-1.5 py-0.5">.env.local</code> file and set <code className="rounded bg-[#f2f4f6] px-1.5 py-0.5">NEXT_PUBLIC_CONVEX_URL</code>, then restart the dev server.
                    </p>
                    <pre className="mt-6 overflow-auto rounded-xl bg-[#001543] p-4 text-sm leading-6 text-white">
                        {`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_real_key
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev`}
                    </pre>
                </section>
            </main>
        )
    }

    return (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    )
}
