import { auth } from "@/auth"
import Link from "next/link"

export const Sidebar = async () => {
  const session = await auth()
  if (!session?.user || session?.user.role === "USER") {
    return null
  }

  return (
    <div className="fixed h-[calc(100vh-64px)] top-[64px] left-0 w-64 bg-white text-black flex flex-col shadow-lg z-10 outline outline-[1px] outline-gray-300">
      <div className="p-4 text-2xl font-bold border-b border-gray-300">
        DASHBOARD
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          <Link
            href="/dashboard"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Générale
          </Link>
          <Link
            href="/dashboard/amc"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Gestion des AMC
          </Link>
          <Link
            href="/dashboard/users"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Gestion des utilisateurs
          </Link>
          <Link
            href="/dashboard/addReference"
            className="block p-2 rounded hover:bg-gray-200"
          >
            Gestion des références
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-300"></div>
      <div className="p-4 border-t border-gray-300"></div>
    </div>
  )
}
