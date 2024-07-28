import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "./libs/quotes.json";

export async function getQuotes() {
    try {
        //Fetch all quotes from the file and store them in an array
        const data = await fs.readFile(fileName, 'utf8');
        //Convert the existing quotes into a Javascript object, so it can be logged to the console
        let quotes = JSON.parse(data)
        return quotes
    } catch (error) {
        //if unsuccessful, log an error to the console for debugging
        console.error('Error reading file:', error);
        throw error;
    }
};


export async function addQuote(quoteText) {
    //Create a new Quote object with a uuid and the text passed into the function.
    let newQuoteObject = {
        id: uuidv4(),
        quoteText: quoteText
    }
    try {
        //Fetch all quotes from the file and store them in an array
        let data = await fs.readFile(fileName, 'utf8');
        //Convert the existing quotes into a Javascript object, so a new quote can be added to it.
        let quotes = [];
        if (data) {
            quotes = JSON.parse(data);
        }
        quotes.push(newQuoteObject)
        //Write the updated array back to the file
        await fs.writeFile(fileName, JSON.stringify(quotes, null, 2), 'utf8');
        return newQuoteObject
    } catch (error) {
        //if unsuccessful, log an error to the console for debugging
        console.error('Error writing file:', error);
        throw error;
    }
}


export async function getRandomQuote() {
    //Fetch all quotes from the file and store them in an array
    let quotes = await getQuotes(fileName)
    //call helped function to generate a random number between 0 and the length of the array.
    let randomInt = await generateRandomInt(quotes.length)
    //call the item from the array at random number's index
    let randomQuote = quotes[randomInt]
    //return that item
    return randomQuote

}

export async function generateRandomInt(max) {
    let randomInt = Math.floor(Math.random() * max);
    console.log(randomInt)
    return randomInt
}

export async function editQuote(id, quoteText) {
    //Fetch all quotes from the file and store them in an array
    let quotes = await getQuotes()
    //Find the quote that matches your specified id. Return null and exit function if not found.
    let quoteIndex = quotes.findIndex(quote => quote.id === id)
    console.log(quoteIndex)
    if (quoteIndex === -1) {
        return null;
    }
    //Update the quoteText of the specified item with the new quoteText

    quotes[quoteIndex].quoteText = quoteText;

    try {
        //Write the updated array back to the file
        await fs.writeFile(fileName, JSON.stringify(quotes), 'utf8');
        return quotes[quoteIndex]
    } catch (error) {
        //if unsuccessful, log an error to the console for debugging
        console.error('Error writing quotes file:', error);
        return null;
    }
}





export async function deleteQuote(id) {
    //Fetch all quotes from the file and store them in an array
    let quotes = await getQuotes()
    //Find the quote that matches your specified id. Return null and exit function if not found.
    let quoteIndex = quotes.findIndex(quote => quote.id === id)
    if (quoteIndex === -1) {
        return null;
    }
    //Remove item with specified id from array 
    let removedItem = quotes.splice(quoteIndex, 1)[0]

    try {
        //Write the updated array back to the file
        await fs.writeFile(fileName, JSON.stringify(quotes), 'utf8');
        return removedItem
    } catch (error) {
        //if unsuccessful, log an error to the console for debugging
        console.error('Error writing quotes file:', error);
        return null;
    }
}
