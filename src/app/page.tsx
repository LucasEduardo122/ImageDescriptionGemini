'use client'

import axios from "axios";
import { useState } from "react";
import { verifyImageLink } from "../utils/image";

export default function Home() {
  const [link, setLink] = useState("");
  const [responseIA, setResponseIA] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmitPrompt() {
    setIsLoading(true)
    if (!link) {
      setIsLoading(false)
      return alert("Informe um link")
    }

    if (!verifyImageLink(link)) {
      setIsLoading(false)
      return alert("Link inválido!")
    }

    try {
      const { data } = await axios.post('/api/image', {
        link: link
      }, {
        headers: {
          'Content-Type': 'apllication/json'
        }
      });

      if (!data.bufferImage) {
        setIsLoading(false)
        return alert("Imagem não encontrada ou inválida")
      }

      const { data: dataResponse } = await axios.post('/api/gemini',
        {
          bufferImage: Buffer.from(data.bufferImage).toString('base64')
        }
      ,  {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!dataResponse.responseGemini) {
        setIsLoading(false)
        return alert("Ocorreu um problema ao processar a imagem!")
      }

      setResponseIA(dataResponse.responseGemini)

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      return alert("Ocorreu um problema ao processar a imagem!")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div id="imagem" className="w-72 h-52 mx-auto mb-4 bg-cover bg-center rounded-full" style={{ backgroundImage: "url('https://ppc.land/content/images/size/w1200/2023/12/Google-Gemini-AI-2.webp')" }}></div>
        <input onChange={(item) => setLink(item.target.value)} id="prompt" type="text" className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4" placeholder="Informe o link para a imagem" />
        <button disabled={isLoading ? true : false} onClick={handleSubmitPrompt} id="transcrever" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {isLoading ? 'Carregando...' : 'Descrever'}
        </button>
        <div id="resposta" className="mt-8 p-4 bg-gray-100 rounded shadow-md">
          {responseIA ? responseIA : ''}
        </div>
      </div>
    </div>


  );
}
