const { MongoClient } = require('mongodb');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function parseUserPrompt(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log("Response from AI:", response); // Log the response for inspection
        return JSON.parse(response.text);
    } catch (error) {
        throw new Error("Error occurred while parsing the user prompt: " + error.message);
    }
}

async function executeQuery(operation, collectionName, document, uri, dbName) {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Define a mapping of operation names to MongoDB collection methods
        const operationMap = {
            insert: 'insertOne',
            update: 'updateOne',
            delete: 'deleteOne'
            // Add more operations as needed
        };

        // Check if the operation is supported
        if (!operationMap.hasOwnProperty(operation)) {
            throw new Error("Unsupported operation: " + operation);
        }

        // Get the corresponding MongoDB collection method
        const collectionMethod = operationMap[operation];

        // Execute the operation dynamically
        const result = await collection[collectionMethod](document);

        console.log(`${operation} operation executed successfully.`);
        console.log("Result:", result);

        await client.close();
    } catch (error) {
        throw new Error("Error occurred while executing the query: " + error.message);
    }
}

async function run() {
    try {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const askQuestion = (query) => new Promise((resolve) => readline.question(query, resolve));

        const userPrompt = await askQuestion("Please enter the query prompt: ");
        const parsedData = await parseUserPrompt(userPrompt);

        const operation = parsedData.operation.toLowerCase();
        const collectionName = parsedData.collectionName;
        const document = parsedData.document;

        console.log("Operation:", operation);
        console.log("Collection Name:", collectionName);
        console.log("Document:", document);

        const uri = process.env.DB;
        const dbName = "rag_doc"; // Set database name to "rag_doc"
        await executeQuery(operation, collectionName, document, uri, dbName);

        readline.close();
    } catch (error) {
        console.error(error.message);
    }
}

if (!module.parent) {
    run();
}
