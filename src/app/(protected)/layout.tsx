import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import prisma from '~/lib/db'
import OnboardUser from './onboard-user'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import { AppSidebar } from '~/components/app-sidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    throw redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: { isOnboarded: true },
  })

  if (!user?.isOnboarded) {
    return <OnboardUser />
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
