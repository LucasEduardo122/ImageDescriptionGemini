import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'

export default async function geminiService(buffer: string, key: string) {
    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const prompt = "Transcribe the image. Reply in Portuguese.";
        const image = {
            inlineData: {
                data: buffer,
                mimeType: "image/png",
            },
        };

        const result = await model.generateContent([prompt, image]);
        return result.response.text();
    } catch (error) {
        console.error("Ocorreu um erro no gemini. ", error)
        return null;
    }
}