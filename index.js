const { GoogleGenerativeAI } = require("@google/generative-ai");
const { MongoClient } = require('mongodb');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function processUserPrompt(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;

        const { operation, fields, collectionName, dbName, mongoURL } = parseUserPrompt(response.text);

        if (operation === "insert") {
            await insertDocument(fields, collectionName, mongoURL, dbName);
        } else if (operation === "update") {
            await updateDocument(fields, collectionName, mongoURL, dbName);
        } else if (operation === "delete") {
            await deleteDocuments(fields, collectionName, mongoURL, dbName);
        } else {
            console.error("Unsupported operation:", operation);
        }
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

function parseUserPrompt(prompt) {
    // Logic to parse the user prompt and extract operation, fields, collection name, db name, and mongo URL
    // For demonstration, let's assume the extraction logic
    return {
        operation: "insert", // or "update", "delete"
        fields: { name: "nattu", age: 69 , email : "nattu@gmail.com" }, // Example fields extracted from prompt
        collectionName: "profile", // Example collection name extracted from prompt
        dbName: "rag_doc", // Example db name extracted from prompt
        mongoURL: "mongodb+srv://Nattu:dEGBZBiEpR3Xyr0k@cluster0.0yeuk36.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" // Example MongoDB URL extracted from prompt
    };
}

async function insertDocument(fields, collectionName, mongoURL, dbName) {
    // Insert document into MongoDB collection
    // Use MongoClient to connect to MongoDB and insert the document
    // Example implementation
    const client = new MongoClient(mongoURL);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.insertOne(fields);
        console.log("Document inserted successfully.");
    } catch (error) {
        console.error("Error occurred while inserting document:", error);
    } finally {
        await client.close();
    }
}

async function updateDocument(fields, collectionName, mongoURL, dbName) {
    // Update document in MongoDB collection
    // Use MongoClient to connect to MongoDB and update the document
    // Example implementation
    // Adjust the filter and update parameters based on your requirements
    const filter = { name: fields.name }; // Example filter based on the "name" field
    const update = { $set: fields }; // Update the document with the provided fields
    const client = new MongoClient(mongoURL);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        await collection.updateOne(filter, update);
        console.log("Document updated successfully.");
    } catch (error) {
        console.error("Error occurred while updating document:", error);
    } finally {
        await client.close();
    }
}

async function deleteDocuments(fields, collectionName, mongoURL, dbName) {
    // Delete documents in MongoDB collection
    // Use MongoClient to connect to MongoDB and delete the documents
    // Example implementation
    // Adjust the filter based on your requirements
    const filter = fields; // Example filter based on the provided fields
    const client = new MongoClient(mongoURL);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.deleteMany(filter);
        console.log(`${result.deletedCount} document(s) deleted.`);
    } catch (error) {
        console.error("Error occurred while deleting documents:", error);
    } finally {
        await client.close();
    }
}

// Example usage
const userPrompt = "add two fields one is name: 'nattu' and another one is age : 33 and the collection name is demo and the db name is rag_doc and the mongo_url is 'httaps://wgewwgnwongrwgwelg'";
processUserPrompt(userPrompt);
