import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/categorize", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
     messages: [
  {
    role: "system",
    content: `
You are an expense categorization system.

Return ONLY one of:
Food, Shopping, Travel, Entertainment, Education, Miscellaneous.

Rules:
- Food includes: pizza, pasta, biryani, kebab, chips, snacks, lunch, dinner, breakfast, groceries, restaurant, cafe, meal.
- Travel includes: uber, ola, bus, train, flight, taxi.
- Entertainment: movie, netflix, games.
- Education: books, course, fees.
- Shopping: clothes, amazon, electronics.

If unsure, pick the closest category (DO NOT default to Miscellaneous).

Output exactly one word from the list.
`,
  },
  { role: "user", content: text },
]
    });

    const category = response.choices[0].message.content.trim();

    res.json({ category });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
