/*********************************
 * BACKEND CARDIOASISTENTE
 * Render + Gemini
 *********************************/

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

// ===============================
// CONFIGURACIÓN BÁSICA
// ===============================
const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ===============================
// VALIDACIÓN DE API KEY
// ===============================
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY no está definida");
}

// ===============================
// ENDPOINT PRINCIPAL DEL CHAT
// ===============================
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({
      reply: "El mensaje está vacío."
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Eres un asistente de salud cardiovascular.
Reglas importantes:
- NO diagnostiques enfermedades
- NO recetes medicamentos
- Da información preventiva, educativa y segura
- Recomienda acudir a un profesional si hay síntomas

Mensaje del usuario:
"${message}"
                  `
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No se pudo generar una respuesta en este momento.";

    res.json({ reply });

  } catch (error) {
    console.error("❌ Error al conectar con Gemini:", error);
    res.status(500).json({
      reply: "Error al comunicarse con el asistente. Intenta más tarde."
    });
  }
});

// ===============================
// INICIO DEL SERVIDOR
// ===============================
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en puerto ${PORT}`);
});
