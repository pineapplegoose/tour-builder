export const dynamic = "force-dynamic";

import { ClerkProvider } from '@clerk/nextjs'
import { ConvexsProviderWithClerk } from '../ConvexProviderWithClerk'
import { AuthProvider } from '../../lib/AuthContext'


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
