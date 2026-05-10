import Link from "next/link";

interface TextoBotao{
  textoBotao: String;
}

export function Button(app: TextoBotao) {
  return (
    <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      {app.textoBotao}
    </Link>
  );
}
