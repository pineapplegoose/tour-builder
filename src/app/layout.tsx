import "@/app/globals.css";
import type { Metadata } from "next";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  title: "TourMaster",
  description: "Create and manage interactive onboarding tours",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
