require("dotenv").config();

const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const path = require("path");

const app = express();
const port = 3000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const interaction = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input: userMessage
        });

        res.json({
            reply: interaction.output_text
        });

    } catch (error) {
        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            reply: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`AI Chatbot running at http://localhost:${port}`);
});