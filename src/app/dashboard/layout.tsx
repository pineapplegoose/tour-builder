import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexsProviderWithClerk } from '../ConvexProviderWithClerk'
import { AuthProvider } from '../../lib/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Tour Builder Dashboard | Create Interactive Onboarding Tours',
    description: 'Build, manage, and analyze interactive onboarding tours for your website',
    keywords: 'onboarding, tours, user guide, tutorials, product tours',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <ConvexsProviderWithClerk>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ConvexsProviderWithClerk>
        </ClerkProvider>
    )
}