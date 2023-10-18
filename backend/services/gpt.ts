import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

/**
 * Returns of a summary of a string of text.
 * @param text String of text to summarize.
 */
async function summarize(text: string) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Produce a summar of the following piece of text: ${text}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion.choices);
}

const gpt = { summarize };
export default gpt;
