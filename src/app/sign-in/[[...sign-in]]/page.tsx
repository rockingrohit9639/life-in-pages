import { SignIn } from '@clerk/nextjs'

export default function SigninPage() {
  return (
    <div className="bg-primary relative flex h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
