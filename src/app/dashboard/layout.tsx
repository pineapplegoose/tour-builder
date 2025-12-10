
export const dynamic = "force-dynamic";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tour Builder Dashboard | Create Interactive Onboarding Tours',
  description: 'Build, manage, and analyze interactive onboarding tours for your website',
  keywords: 'onboarding, tours, user guide, tutorials, product tours',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
