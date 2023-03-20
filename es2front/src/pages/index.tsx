import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full lg:w-screen h-screen flex flex-col">
        <h1 className="text-4xl text-center uppercase pt-5">Trabalho Eng Software 2 - Rodrigo e Henrique</h1>
        <div className="grow flex flex-col justify-center gap-5 items-center align-middle">
          <Link href="/create" className="w-32 bg-sky-400 hover:bg-sky-700 rounded-full text-white text-xl text-center select-none">
            Criar
          </Link>
          <Link href="/read" className="w-32 bg-sky-400 hover:bg-sky-700 rounded-full text-white text-xl text-center select-none">
            Ler & deletar
          </Link>
          <Link href="/update" className="w-32 bg-sky-400 hover:bg-sky-700 rounded-full text-white text-xl text-center select-none">
            Atualizar
          </Link>
          {/* <Link href="/delete" className="w-32 bg-sky-400 hover:bg-sky-700 rounded-full text-white text-xl text-center select-none">
            Deletar
          </Link> */}
        </div>
      </main>
    </>
  );
} 