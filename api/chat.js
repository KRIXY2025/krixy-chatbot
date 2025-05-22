import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const userMessage = req.body.message;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: `Du bist KRIXY, ein freundlicher, zuvorkommender und verständnisvoller Chatbot der KRIX Academy. Du sprechen die Nutzer immer mit "Sie" an. Du hilfst bei Fragen zu Kursinhalten, Angeboten und Kontaktmöglichkeiten.`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.5,
    });

    res.status(200).json({ reply: chatResponse.choices[0].message.content });
  } catch (error) {
    console.error("Fehler bei OpenAI:", error);
    res.status(500).json({ error: "Interner Fehler beim KI-Zugriff" });
  }
}
