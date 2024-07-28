# InspireMe API

Welcome to the InspireMe API! This API allows you to manage a collection of inspirational quotes. You can retrieve all quotes, get a random quote, add a new quote, edit an existing quote, and delete a quote. Below are the details on how to set up and use the API.

## Overview
The InspireMe API provides the following functionalities:

* Get all quotes: Retrieve a list of all stored quotes.
* Get a random quote: Retrieve a random quote from the list.
* Add a new quote: Add a new quote to the collection.
* Edit an existing quote: Update the text of an existing quote.
* Delete a quote: Remove a quote from the collection.

## Setup Instructions

1) Clone the repository:

```bash
git clone repository-name
cd repository-name
```

2) Install dependencies:

```bash
npm install
```

3) Start the server:


```bash
npm start
```


The server will start listening on port 3000.

## Endpoints

#### Get All Quotes

URL: /quotes
Method: GET
Description: Retrieve a list of all stored quotes.

##### Response

###### Success:

```json

{
    "success": true,
    "payload": [
        {
            "id": "uuid",
            "quoteText": "Quote text"
        },
        ...
    ]
}
```

###### Error:

```json

{
    "error": "Error message"
}
```

#### Get a Random Quote

URL: /quotes/random
Method: GET
Description: Retrieve a random quote from the list.
Response:

###### Success

```json

{
    "success": true,
    "payload": {
        "id": "uuid",
        "quoteText": "Random quote text"
    }
}
```

###### Error:

```json

{
    "error": "Error message"
}
```

#### Add a New Quote

URL: /quotes
Method: POST
Description: Add a new quote to the collection.

##### Request Body:

```json

{
    "quoteText": "New quote text"
}
```

##### Response:

###### Success

```json

{
    "success": true,
    "new_quote": {
        "id": "uuid",
        "quoteText": "New quote text"
    }
}
```

###### Error:
```json

{
    "error": "Error message"
}
```

#### Edit an Existing Quote

URL: /quotes
Method: PUT
Description: Update the text of an existing quote.

##### Request Body:

```json

{
    "id": "quote_id",
    "quoteText": "Updated quote text"
}
```

##### Response:

###### Success

```json
{
    "success": true,
    "updated_quote": {
        "id": "quote_id",
        "quoteText": "Updated quote text"
    }
}
```

###### Error:

```json
{
    "error": "Error message"
}
```

#### Delete a Quote

URL: /quotes
Method: DELETE
Description: Remove a quote from the collection.

##### Request Body:

```json

{
    "id": "quote_id"
}
```

##### Response:

###### Success

```json
{
    "success": true,
    "deleted_quote": {
        "id": "quote_id",
        "quoteText": "Deleted quote text"
    }
}
```

###### Error:

```json
{
    "error": "Error message"
}
```
Author: Oli Kelly
GitHub: olikelly00

Feel free to contribute to this project by submitting issues or pull requests. Enjoy using the InspireMe API!