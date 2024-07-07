// app/auth/login/page.js
import AuthForm from '@/components/auth/AuthForm'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  )
}
