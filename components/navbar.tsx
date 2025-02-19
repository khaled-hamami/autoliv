import { SignOutButton } from "./SignoutButton"
import { auth } from "@/auth"
import { format } from "date-fns"
import Link from "next/link"

export const Navbar = async () => {
  const session = await auth()
  const today = format(new Date(), "yyyy-MM-dd")

  return (
    <header className="bg-white shadow-2xl  sticky top-0 z-20">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font- font-bold text-primary">
            Autoliv
          </Link>
          <div className="flex space-x-4">
            <Link href="/">
              <button className="font-bold text-lg hover:underline">
                Accueil
              </button>
            </Link>
            {!session?.user && (
              <Link href="/sign-in">
                <button className="font-bold text-lg hover:underline">
                  Connexion
                </button>
              </Link>
            )}
            <Link href={`/Planification/${today}`}>
              <button className="font-bold text-lg hover:underline">
                Planification
              </button>
            </Link>
            {session?.user.role === "ADMIN" && (
              <Link href="/dashboard">
                <button className="font-bold text-lg hover:underline">
                  Dashboard
                </button>
              </Link>
            )}
          </div>
          {session?.user && <SignOutButton />}
        </div>
      </nav>
    </header>
  )
}
