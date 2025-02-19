import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
export const Footer = () => {
  const router = useRouter()
  ;<footer className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t h-16">
    <div className="container mx-auto px-6 h-full flex justify-between items-center">
      <Button
        variant="outline"
        className="font-bold"
        onClick={() => router.push("addReference")}
      >
        Ajouter une Référence +
      </Button>
      <p className="text-sm text-gray-600">
        &copy; 2025 Autoliv. All rights reserved.
      </p>
    </div>
  </footer>
}
