import { SignIn } from '@clerk/nextjs'

export default function SigninPage() {
  return (
    <div className="relative flex h-screen items-center justify-center bg-amber-200">
      <SignIn />
    </div>
  )
}
