// File: api/gemini-handler.js (Đã sửa)

// Thay thế dòng 'const { ... } = require("...");'
// Bằng cú pháp 'import { ... } from "..."'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Lấy API Key đã giấu trên Vercel
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cấu hình an toàn (safety settings) - Giữ nguyên
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

export default async function handler(req, res) {
  // Toàn bộ phần còn lại giữ nguyên
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { question } = req.body;
    // ... (logic xử lý còn lại)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(question);
    const response = await result.response;
    
    // ... (logic kiểm tra chặn và trả về)
    const text = response.text();
    res.status(200).json({ text });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}