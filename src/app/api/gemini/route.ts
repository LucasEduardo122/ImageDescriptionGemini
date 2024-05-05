import { NextResponse } from 'next/server'
import geminiService from "@/service/gemini";

export async function POST(req: Request) {
  const body = await req.json()
  if (!body.bufferImage) return NextResponse.json({ error: 'Envie o buffer da imagem' }, { status: 400 })
  try {
    const responseGemini = await geminiService(body.bufferImage, process.env.API_KEY);
    if (!responseGemini) return NextResponse.json({ error: "Ocorreu um problema na IA!" }, { status: 500 })

    return NextResponse.json({ responseGemini: responseGemini }, {status: 200});
  } catch (error) {
    console.error("Ocorreu um erro ao chamar a API do Gemini:", error);
    return NextResponse.json({ error: "Ocorreu um erro ao processar a imagem." }, { status: 500});
  }
}