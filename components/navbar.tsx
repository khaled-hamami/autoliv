import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { auth } from "@/auth";
import { SignOutButton } from "./SignoutButton";

export const Navbar = async () => {
  const session = await auth();
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Autoliv
          </Link>
          <Tabs defaultValue="home">
            <TabsList>
              <Link href="/">
                <TabsTrigger value="home">Home</TabsTrigger>
              </Link>
              <Link href="/sign-in">
                {!session?.user && (
                  <TabsTrigger value="Login">Login</TabsTrigger>
                )}
              </Link>
              <Link href="/preview">
                <TabsTrigger value="preview">View</TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
          {session?.user && <SignOutButton />}
        </div>
      </nav>
    </header>
  );
};
