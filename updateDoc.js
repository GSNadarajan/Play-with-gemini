const { MongoClient } = require('mongodb');
require('dotenv').config();

async function executeUpdate(collectionName, filter, update, uri, dbName) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.updateOne(filter, update);

        console.log("Update operation executed successfully.");
        console.log("Matched Count:", result.matchedCount);
        console.log("Modified Count:", result.modifiedCount);

    } catch (error) {
        console.error("Error occurred while executing the update query:", error);
    } finally {
        await client.close();
    }
}

// Test function
async function test() {
    const collectionName = "user";
    const filter = { /* specify the filter for the document to update */ };
    const update = {
        $set: {
            Name: "Esakkiraja",
            email: "esakki@skillrank.com",
            age: 22
        }
    };
    const uri = "mongodb+srv://Nattu:dEGBZBiEpR3Xyr0k@cluster0.0yeuk36.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const dbName = "rag_doc";

    await executeUpdate(collectionName, filter, update, uri, dbName);
}

test(); // Run the test function
