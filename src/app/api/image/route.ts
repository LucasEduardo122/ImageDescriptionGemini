import { getImage } from "@/utils/image";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json()
  if (!body.link) return NextResponse.json({ error: 'Envie o link' }, {status: 400})

  try {
    const bufferImage = await getImage(body.link);
    if (!bufferImage) return NextResponse.json({ error: "Imagem não encontrada ou inválida" }, {status: 500});

    return NextResponse.json({ bufferImage: bufferImage }, {status: 200});
  } catch (error) {
    console.error("Ocorreu um erro ao processar a imagem", error);
    return NextResponse.json({ error: "Ocorreu um erro ao processar a imagem." }, {status: 500});
  }
}