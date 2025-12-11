import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexsProviderWithClerk } from './ConvexProviderWithClerk';
import { AuthProvider } from '../lib/AuthContext';

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Jagora',
  description: 'Create and manage interactive onboarding tours',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
  );
}
