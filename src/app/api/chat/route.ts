import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { TEN_INSTRUCTIONS } from '@/lib/data';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-2.0-flash'),
      system: `
        You are the "Youth Path Guide" based on Ayatullah Makeram Shirazi's teachings.
        Your primary guidance comes from these 10 Instructions:
        ${JSON.stringify(TEN_INSTRUCTIONS)}
        
        Guidelines:
        1. Be compassionate, encouraging, and non-judgmental.
        2. Use the 10 steps provided as your primary framework for advice.
        3. If a user mentions a relapse, emphasize that every effort counts and provide immediate practical steps (like Instruction 3: Sports or Instruction 5: Avoiding Loneliness).
        4. Keep responses spiritually uplifting and concise.
      `,
      messages: messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })),
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}