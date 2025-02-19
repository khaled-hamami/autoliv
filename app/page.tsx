import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-6 text-primary">Bienvenue chez Autoliv</h1>
          <p className="text-xl mb-8">
            Votre source fiable pour des pièces automobiles de haute qualité.
            Améliorez les performances et la sécurité de votre véhicule avec nos
            composants premium.
          </p>
          <Button size="lg">Découvrez Nos Produits</Button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Image
            src="/Home.jpg"
            alt="Car parts showcase"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Pourquoi Choisir Autoliv ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Qualité Assurée</h3>
            <p>
              Toutes nos pièces répondent ou dépassent les spécifications OEM
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Large Sélection</h3>
            <p>
              Trouvez des pièces pour toutes les grandes marques et modèles de
              voitures
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Support Expert</h3>
            <p>
              Notre équipe est là pour vous aider à trouver les bonnes pièces
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
