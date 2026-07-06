"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { ConvexsProviderWithClerk } from "./ConvexProviderWithClerk";
import { AuthProvider } from "../lib/AuthContext";

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function MissingClerkConfig() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fb] p-6">
      <section className="w-full max-w-xl rounded-2xl border border-[#fbfbfb] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <p className="text-[12px] font-bold uppercase leading-4 tracking-[0.6px] text-[#0050cb]">
          Clerk setup required
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.5px] text-[#191c1e]">
          Add your Clerk publishable key
        </h1>
        <p className="mt-3 text-[16px] leading-6 text-[#424656]">
          Create a <code className="rounded bg-[#f2f4f6] px-1.5 py-0.5">.env.local</code> file and set <code className="rounded bg-[#f2f4f6] px-1.5 py-0.5">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>, then restart the dev server.
        </p>
        <pre className="mt-6 overflow-auto rounded-xl bg-[#001543] p-4 text-sm leading-6 text-white">
          {`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_real_key
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev`}
        </pre>
      </section>
    </main>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  if (!clerkPublishableKey) {
    return <MissingClerkConfig />;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <ConvexsProviderWithClerk>
        <AuthProvider>{children}</AuthProvider>
      </ConvexsProviderWithClerk>
    </ClerkProvider>
  );
}
