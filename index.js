const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


const model = genAI.getGenerativeModel({ model: "gemini-pro"});

console.log(model);

