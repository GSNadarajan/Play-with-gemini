const { MongoClient } = require('mongodb');
require('dotenv').config();

async function executeQuery(operation, collectionName, document, uri, dbName) {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const operationMap = {
            insert: 'insertOne',
            update: 'updateOne',
            delete: 'deleteOne'
            // Add more operations as needed
        };

        if (!operationMap.hasOwnProperty(operation)) {
            throw new Error("Unsupported operation: " + operation);
        }

        const collectionMethod = operationMap[operation];

        const result = await collection[collectionMethod](document);

        console.log(`${operation} operation executed successfully.`);
        console.log("Result:", result);

        await client.close();
    } catch (error) {
        throw new Error("Error occurred while executing the query: " + error.message);
    }
}

// Test function
async function test() {
    const operation = "insert";
    const collectionName = "user";
    const document = {
        Name: "Esakkiraja",
        email: "esakkiraja21@gmail.com",
        age: 21
    };
    const uri = "mongodb+srv://Nattu:dEGBZBiEpR3Xyr0k@cluster0.0yeuk36.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const dbName = "rag_doc";

    try {
        await executeQuery(operation, collectionName, document, uri, dbName);
    } catch (error) {
        console.error(error.message);
    }
}

test(); // Run the test function
