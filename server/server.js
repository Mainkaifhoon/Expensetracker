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
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `
You are an expense categorization system.

Return ONLY one category from:
Food, Shopping, Travel, Entertainment, Education, Miscellaneous.

STRICT RULES:

Food:
pizza, pasta, biryani, sushi, noodles, burger, fries, chips, snacks, groceries, milk, curd, beans, meal, lunch, dinner, breakfast, restaurant, cafe

Shopping:
clothes, jeans, shoes, amazon, flipkart, electronics, gadgets

Travel:
uber, ola, taxi, bus, train, flight, fuel, petrol

Entertainment:
movie, netflix, games, subscriptions

Education:
books, course, fees, tuition

IMPORTANT:
- ALWAYS match keywords strongly
- NEVER randomly choose category
- DO NOT return explanations
- DO NOT return multiple words
- If unsure → choose closest match (not Miscellaneous unless truly unknown)

Return only one word.
          `,
        },
        { role: "user", content: text },
      ],
    });

    const category = response.choices[0].message.content.trim();

    res.json({ category });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));