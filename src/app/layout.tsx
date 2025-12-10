import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ConvexsProviderWithClerk } from "./ConvexProviderWithClerk"
import { AuthProvider } from "../lib/AuthContext"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Tour Builder Dashboard",
  description: "Create and manage interactive onboarding tours",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexsProviderWithClerk>
        <AuthProvider>
          <html lang="en">
            <body className={`${montserrat.variable} antialiased`}>
              {children}
            </body>
          </html>
        </AuthProvider>
      </ConvexsProviderWithClerk>
    </ClerkProvider>
  )
}
