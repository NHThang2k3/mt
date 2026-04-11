/* eslint-disable @typescript-eslint/no-require-imports */
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

async function test() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Key:", apiKey ? apiKey.substring(0, 5) + "..." : "none");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
  try {
    const result = await model.generateContent("hello");
    console.log("Success:", result.response.text());
  } catch (e) {
    console.error("Error generating content:", e.message);
  }
}
test();
