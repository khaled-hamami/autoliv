import { signUp } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"

const Page = async () => {
  const session = await auth()
  if (session) redirect("/")

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto space-y-6 p-16 shadow-lg bg-white rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Créer un compte</h1>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Autoliv
            </span>
          </div>
        </div>

        {/* Email/Password Sign Up */}
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server"
            const res = await signUp(formData)
            if (res.success) {
              redirect("/sign-in")
            }
          }}
        >
          <Input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          <Input
            name="password"
            placeholder="Mot de passe"
            type="password"
            required
            autoComplete="new-password"
          />
          <Button className="w-full" type="submit">
            Créer un compte
          </Button>
        </form>

        <div className="text-center">
          <Button asChild variant="link" className="text-black">
            <Link href="/sign-in">J&apos;ai déjà un compte? Se connecter</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
