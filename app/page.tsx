import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">

        <Image
          src="/encantinha-logo.png"
          alt="Encantinha"
          width={350}
          height={350}
          className="mx-auto mb-8"
        />

        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-6">
          Estamos preparando algo especial ✨
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Nosso novo site está passando pelos últimos ajustes para oferecer uma
          experiência ainda mais encantadora.
        </p>

        <p className="text-lg text-gray-700 mb-8">
          Enquanto isso, nossa equipe continua atendendo normalmente pelo
          WhatsApp.
        </p>

        <a
          href="https://wa.me/5511976379103"
          target="_blank"
          className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-4 rounded-full transition"
        >
          Falar no WhatsApp 💖
        </a>

        <div className="mt-10">
          <a
            href="https://instagram.com/encantartspapelaria"
            target="_blank"
            className="text-pink-600 font-medium hover:underline"
          >
            @encantartspapelaria
          </a>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Encantart's Papelaria Criativa
          <br />
          Criando momentos especiais através da papelaria personalizada.
        </p>

      </div>
    </main>
  );
}
