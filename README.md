
# PrivaTo-Do

Create a To-Do list API where the tasks and all their history of changes are stored on a Blockchain.

Your childhood friend, Clay, is the biggest fan of all things related to the Blockchain technology. You've been listening to him for months and years talking non-stop about cryptocurrencies and the security of decentralized data storage.

Despite Clay's insistence on you investing in cryptos, the truth is that what you've always been interested in how the Blockchain can be applied in other applications beyond cryptocurrencies. So, as a software developer, you decide to create your own project with this technology: a to-do list app that stores all the tasks and their history of changes in Blockchain.

How it works?
This API has to allow the user to add new notes and mark them as completed. The flow will be always the same: first you need to add a new note/task and then you save it on the Blockchain. In order to make the Blockchain data persistent, we need to store the Blockchain in a file.



## Tech Stack

**Back-end:** Node, Express, MongoDB, Javascript, jest and Supertest


## How it works?


This API has to allow the user to add new notes and mark them as completed. The flow will be always the same: first you need to add a new note/task and then you save it on the Blockchain. In order to make the Blockchain data persistent, we need to store the Blockchain in a file.

## Workflow

    1. Send request to the API to add or mark as completed any task

    2. Load the Blockchain data from the file, if exists

    3. Create a Block with the new to-do/task data

    4. Add the new Block to the Blockchain

    5. Save the Blockchain with the new data on a file
## Installation




```bash
  1. Clone the repository
  2. In the PrivaTo-Do folder run 'npm i'
  3. To run the server 'npm start'
  4. The application will be available at 'http://localhost:3000'
  5. To run the tests first start the server and then 'npm test'
```
    