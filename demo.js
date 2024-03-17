const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateDatabaseQuery(userPrompt, databaseType) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `I need a ${databaseType} query for the prompt (${userPrompt}) give me a ${databaseType} query`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const query = await response.text();
        return query;
    } catch (error) {
        console.error("Error occurred while generating the query:", error);
        return null;
    }
}

async function run() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askQuestion = (query) => new Promise((resolve) => readline.question(query, resolve));

    const userPrompt = await askQuestion("Please enter the query prompt: ");
    const databaseType = await askQuestion("Please enter the type of database: ");
    const query = await generateDatabaseQuery(userPrompt, databaseType);

    if (query) {
        console.log("Generated Query:");
        console.log(query);
    } else {
        console.log("Failed to generate query. Please try again.");
    }
    readline.close();
}

if (!module.parent) {
    run();
}
