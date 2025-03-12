import { auth } from "@/auth"
import { prisma } from "@/prisma"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Page() {
  const session = await auth()
  if (!session?.user || session?.user.role === "USER") {
    return <div>Non autorisé</div>
  }

  // Récupérer les données directement en utilisant Prisma
  const referenceCount = await prisma.references.count()
  const userCount = await prisma.user.count()
  const dbSizeResult = await prisma.$queryRaw<{ size: string }[]>`
    SELECT pg_size_pretty(pg_database_size(current_database())) AS size
  `
  const dbSize = dbSizeResult[0]?.size

  return (
    <div className="ml-64 p-8 flex justify-evenly w-full flex-col">
      <h1 className="text-2xl font-bold mb-4">Générale</h1>
      <div className=" flex justify-evenly w-full">
        <div className="grid grid-cols-2 w-full gap-4">
          <div>
            <Card className="min-h-[100px] m-1 w-full">
              <CardHeader>
                <CardTitle>Nombre de Références</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{referenceCount}</p>
              </CardContent>
            </Card>
            <Card className="min-h-[100px] m-1 w-full">
              <CardHeader>
                <CardTitle>Nombre d&apos;Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{userCount}</p>
              </CardContent>
            </Card>
            <Card className="min-h-[100px] m-1 w-full">
              <CardHeader>
                <CardTitle>Taille de la Base de Données</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{dbSize}</p>
              </CardContent>
              <CardFooter>
                <form action="/api/amc/deleteAmc" method="post">
                  <Button variant="destructive" type="submit">
                    <Link href="/dashboard">nettoyer la base de données</Link>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
          <Card className="w-full max-h-[390px]">
            <CardHeader>
              <CardTitle>Date Actuelle</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar selected={new Date()} />
            </CardContent>
          </Card>
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  )
}
