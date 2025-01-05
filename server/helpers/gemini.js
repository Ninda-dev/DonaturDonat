// Make sure to include these imports:
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { text } = require("express");
require('dotenv').config()

const gemini = async (askRandom) => {
    // console.log(askRandom, '====ini ask');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = askRandom;

    const result = await model.generateContent(prompt);
    // console.log(result.response.text, "==== ini result dari gemini");

    return result.response.text()
}

module.exports = gemini
