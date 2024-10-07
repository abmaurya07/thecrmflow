import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main(userInput) {
  const chatCompletion = await getGroqChatCompletion(userInput);
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");

  return chatCompletion.choices[0]?.message?.content || "AI ERROR";
}

export async function getGroqChatCompletion(userInput) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a business assistant AI tasked with extracting essential contact and company details from pitch decks. Your job is to accurately identify the following details:
        - Business/Company Name
        - Contact Person's Name
        - Email Address
        - Phone Number
        
        The information provided may come from documents, images, or text. Extract the relevant details with precision.
        
        Generate your response as a JSON list. Items in json should be business, contact, email, and phone.
        `,
      },
      {
        role: "user",
        content: `Extract the name of a person, company name, phone number, and email from the following content: ${userInput}.`,
      },
    ],
    model: "llama3-8b-8192",
  });
}

