import { auth } from "@/auth"
import { Sidebar } from "@/components/sidebar"
import React from "react"
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user || session?.user.role === "USER") {
    return <div>Non autorisé</div>
  }
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  )
}
