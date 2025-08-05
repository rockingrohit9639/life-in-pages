import { auth } from '@clerk/nextjs/server'
import Sidebar from './sidebar'
import { redirect } from 'next/navigation'
import prisma from '~/lib/db'
import OnboardUser from './onboard-user'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { isOnboarded: true },
  })

  if (!user?.isOnboarded) {
    return <OnboardUser />
  }

  return (
    <div>
      <Sidebar />
      <div className="md:ml-14">{children}</div>
    </div>
  )
}
