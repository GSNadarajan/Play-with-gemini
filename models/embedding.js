const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // For embeddings, use the embedding-001 model
  const model = genAI.getGenerativeModel({ model: "embedding-001"});

  const text = "The quick brown fox jumps over the lazy dog."

  const result = await model.embedContent(text);
  const embedding = result.embedding;
  console.log(embedding.values);
}

run();
