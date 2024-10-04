import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_SECRET_KEY });

export async function main(userInput) {
  const chatCompletion = await getGroqChatCompletion(userInput);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(userInput) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Extract the name of a person, comany name, phone number and email from following content: ${userInput}. `,
      },
    ],
    model: "llama3-8b-8192",
  });
}
