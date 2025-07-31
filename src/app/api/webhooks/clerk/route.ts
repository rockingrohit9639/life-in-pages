import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import prisma from '~/lib/db'
import { env } from '~/lib/env'

export async function POST(req: Request) {
  const wh = new Webhook(env.CLERK_SIGNING_SECRET)
  const body = await req.text()
  const headerPayload = await headers()

  const event = wh.verify(body, {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  }) as WebhookEvent

  switch (event.type) {
    case 'user.created': {
      const { id, email_addresses, first_name, last_name } = event.data

      await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`,
        },
      })
      break
    }

    case 'user.updated': {
      const { id, email_addresses, first_name, last_name } = event.data

      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`,
        },
      })

      break
    }

    case 'user.deleted': {
      const { id } = event.data

      await prisma.user.delete({
        where: { clerkId: id },
      })

      break
    }

    default: {
      return new Response('OK')
    }
  }

  return new Response('OK', { status: 200 })
}
