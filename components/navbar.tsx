import { SignOutButton } from "./SignoutButton";
import { auth } from "@/auth";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-4xl font- font-bold text-gray-800">
            Autoliv
          </Link>
          <div className="flex space-x-4">
            <Link href="/">
              <button className="font-bold text-lg hover:underline">Accueil</button>
            </Link>
            {!session?.user && (
              <Link href="/sign-in">
                <button className="font-bold text-lg hover:underline">Connexion</button>
              </Link>
            )}
            <Link href="/preview">
              <button className="font-bold text-lg hover:underline">Planification</button>
            </Link>
          </div>
          {session?.user && <SignOutButton />}
        </div>
      </nav>
    </header>
  );
};
