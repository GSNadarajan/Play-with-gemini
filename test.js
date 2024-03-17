const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testInsertion() {
    try {
        const uri = "mongodb+srv://Nattu:dEGBZBiEpR3Xyr0k@cluster0.0yeuk36.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        const dbName = "rag_doc";
        
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("userProfile");
        
        // Sample data to insert
        const data = {
            name: "Nattu",
            email: "nattu31@gmail.com",
            age: 21
        };

        // Inserting sample data
        await collection.insertOne(data);
        console.log("Sample data inserted successfully.");

        await client.close();
        console.log("Connection closed.");
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

// Calling the testInsertion function
testInsertion();
