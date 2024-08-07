import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: req.body.prompt }],
    model: "llama3-8b-8192",
  });
  res.status(200).json(chatCompletion.choices[0]?.message?.content || "");
                       }
