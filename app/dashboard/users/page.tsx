"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getSession, useSession } from "next-auth/react"
import { User, UserRole } from "@prisma/client"

export default function Page() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    getSession()
  }, [])
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users/getAllUsers")
      const data = await response.json()
      setUsers(data)
    }

    fetchUsers()
  }, [])

  if (!session?.user || session?.user.role === "USER") {
    return <div>Non autorisé</div>
  }

  const handleRoleChange = async (userId: string, currentRole: UserRole) => {
    let newRole: UserRole
    if (currentRole === "USER") {
      newRole = "VERIFIEDUSER"
    } else if (currentRole === "VERIFIEDUSER") {
      newRole = "ADMIN"
    } else {
      newRole = "USER"
    }

    // Store previous state for optimistic update
    const previousUsers = [...users]

    // Optimistic update
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    )

    // API call to change role
    const response = await fetch("/api/users/changeRole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, newRole }),
    })

    if (!response.ok) {
      // Revert to previous state if API call fails
      setUsers(previousUsers)
    }
  }

  const translateRole = (role: UserRole) => {
    switch (role) {
      case "USER":
        return "Utilisateur"
      case "VERIFIEDUSER":
        return "Utilisateur vérifié"
      case "ADMIN":
        return "Administrateur"
      default:
        return role
    }
  }

  return (
    <div className="p-4 ml-64">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Utilisateur</th>
            <th className="py-2 px-4 border-b">Rôle</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            if (session?.user?.email === user.email) {
              return null
            }
            return (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role ? translateRole(user.role) : "Role non défini"}</td>
                <td className="py-2 px-4 border-b">
                  <form
                    method="POST"
                    className="flex items-center"
                    onSubmit={async (e) => {
                      e.preventDefault()
                      if (user.role !== null) {
                        // Type guard to ensure role is not null
                        await handleRoleChange(user.id, user.role)
                      }
                    }}
                  >
                    <input type="hidden" name="userId" value={user.id} />
                    <Button type="submit">Changer de rôle</Button>
                  </form>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}