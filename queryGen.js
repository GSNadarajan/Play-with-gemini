async function parseUserPrompt(userPrompt) {
    try {
        // Regular expressions to extract operation, collection name, and document details
        const operationRegex = /(insert|update|delete)/gi;
        const collectionNameRegex = /collection\s*name\s*is\s*'([^']+)'/gi;
        const documentRegex = /([^,\n]+)\s*is\s*([^,\n]+)/gi;

        // Executing regular expressions on the user prompt
        const operationMatch = operationRegex.exec(userPrompt);
        const collectionNameMatch = collectionNameRegex.exec(userPrompt);
        const documentMatches = Array.from(userPrompt.matchAll(documentRegex));

        // Checking if all necessary details are found
        if (!operationMatch || !collectionNameMatch || documentMatches.length === 0) {
            throw new Error("Unable to parse user prompt. Please provide a valid prompt.");
        }

        // Extracting operation, collection name, and document details
        const operation = operationMatch[1].toLowerCase();
        const collectionName = collectionNameMatch[1];
        const document = documentMatches.reduce((acc, match) => {
            const key = match[1].trim();
            const value = match[2].trim();
            acc[key] = value;
            return acc;
        }, {});

        return { operation, collectionName, document };
    } catch (error) {
        throw new Error("Error occurred while parsing user prompt: " + error.message);
    }
}

// Example usage
async function run() {
    try {
        const userPrompt = "Please insert the following data into the 'userProfile' collection: Name is Nattu, email is nattu31@gmail.com, and age is 21.";
        const { operation, collectionName, document } = await parseUserPrompt(userPrompt);

        console.log("Operation:", operation);
        console.log("Collection Name:", collectionName);
        console.log("Document:", document);
    } catch (error) {
        console.error("Error occurred:", error.message);
    }
}

// Running the example
if (!module.parent) {
    run();
}
