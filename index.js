import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { OpenAI } from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
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

    res.json({ reply: chatResponse.choices[0].message.content });
  } catch (error) {
    console.error("Fehler bei OpenAI:", error);
    res.status(500).json({ error: "Interner Fehler beim KI-Zugriff" });
  }
});

app.listen(port, () => {
  console.log(`KRIXY Backend läuft auf http://localhost:${port}`);
});
