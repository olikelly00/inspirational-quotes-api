
import express from 'express';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

import {
    getQuotes,
    addQuote,
    deleteQuote,
    getRandomQuote,
    editQuote
} from "./models/quote.js"

app.use(express.json());

app.use(helmet());

/* 
This handler function sets up a welcome message to display on our landing page
*/

app.get('/', (req, res) => {
    res.send("Hi there! Welcome to InspireMe - the API behind all of your favourite inspirational quotes.")
});


/* 
This listener tells our Express.js app to start listening for incoming requests on a specific port.
*/

app.listen(port, () => {
    console.log(`We are now listening on port ${port}`)
})

/* 
This handler function returns either:
• the array of all activities 
• an error message including a status code and explanation 
*/

app.get("/quotes", async (req, res) => {
    try {
        const payload = await getQuotes();
        res.status(200).json({
            "success": true,
            "payload": payload
        });
        } catch (error) {
            res.status(404).json({
                "error": error.message
            });
        }
    });


/* 
This handler function returns either:
• a random quote from the list of quotes the user has stored
• an error message including a status code and explanation 
*/

app.get("/quotes/random", async (req, res) => {
    try {
        const payload = await getRandomQuote();
        res.status(200).json({
            "success": true,
            "payload": payload
        });
        } catch (error) {
            res.status(404).json({
                "error": error.message
            });
        }
    });
    

/* 
This handler function takes a new quote text from the callers's input, passes it into the addQuote function, and returns either:
• a new quote object with a unique id attached 
• an error message including a status code and explanation 
*/

app.post("/quotes", async (req, res) => {
    const newQuote = req.body.quoteText
    
    try {
        const payload = await addQuote(newQuote);
        res.status(200).json({
            "success": true,
            "new_quote": payload
        });
    } catch (error) {
        res.status(404).json({
            "error": error.message
        });
    }
});

/* 
This handler function takes an existing quote id from the callers's input and some new text for that quote, passes it into the updateQuote function, and returns either:
• a success message with the newly updated quote object
• an error message including a status code and explanation 
*/

app.put("/quotes", async (req, res) => {
    const quoteId = req.body.id
    const quoteNewText = req.body.quoteText
    try {
        const payload = await editQuote(quoteId, quoteNewText);
        res.status(201).json({
            "success": true,
            "updated_quote": payload
        });
    } catch (error) {
        res.status(404).json({
            "error": error.message
        });
    }
});

/* 
This handler function takes a quote ID from the callers's input, passes it into the deleteQuote function, and returns
either:
• the deleted quote associated with that id
• an error message including a status code and explanation 
*/

app.delete("/quotes", async (req, res) => {
    const quoteId = req.body.id
    try {const payload = await deleteQuote(quoteId);
    res.status(200).json({
        "success": true,
        "deleted_quote": payload
    });
} catch (error) {
    res.status(404).json({
        "error": error.message
    });
}
});