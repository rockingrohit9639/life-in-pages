import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '~/lib/db';
import OnboardUser from './onboard-user';
import { Navbar } from '~/components/navbar';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    throw redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { isOnboarded: true },
  });

  if (!user?.isOnboarded) {
    return <OnboardUser />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
