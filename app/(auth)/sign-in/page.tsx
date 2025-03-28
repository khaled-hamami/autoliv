import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { executeAction } from "@/lib/executeAction"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth, signIn } from "@/auth"

const Page = async () => {
  const session = await auth()
  if (session) redirect("/")

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto space-y-6 p-16 shadow-lg bg-white rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Se connecter</h1>

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

        {/* Email/Password Sign In */}
        <form
          className="space-y-4"
          action={async (formData) => {
            "use server"
            await executeAction({
              actionFn: async () => {
                await signIn("credentials", formData)
              },
            })
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
            autoComplete="current-password"
          />
          <Button className="w-full" type="submit">
            Se connecter
          </Button>
        </form>

        <div className="text-center">
          <Button asChild variant="link" className="text-black">
            <Link href="/sign-up">
              Je n&apos;ai pas un compte? Créer un compte
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
