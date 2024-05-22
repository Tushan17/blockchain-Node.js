const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();


const bc1 ={
    "chain": [
    {
    "index": 1,
    "timestamp": 1677683933248,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "previousBlockHash": "0"
    },
    {
    "index": 2,
    "timestamp": 1677683943448,
    "transactions": [
    {
    "amount": 70,
    "sender": "FTHFHMOFMHSSOFMSOFSOFNSONSG",
    "recipient": "SGSINOGNSOGNNTUGE",
    "transactionId": "e9a7f660b86511ed8c06edb6379ea088"
    },
    {
    "amount": 70,
    "sender": "FTHFHMOFMHSSOFMSOFSOFNSONSG",
    "recipient": "SGSINOGNSOGNNTUGE",
    "transactionId": "ea3409c0b86511ed8e9a8ee2acd1dd26"
    },
    {
    "amount": 70,
    "sender": "FTHFHMOFMHSSOFMSOFSOFNSONSG",
    "recipient": "SGSINOGNSOGNNTUGE",
    "transactionId": "ea7f6aa0b86511ed82826147d95bc6e2"
    }
    ],
    "nonce": 7980,
    "hash": "00007a8a665684d075d281e26605b87efef9db50b6159899b586a7a3b7c2f471",
    "previousBlockHash": "0"
    }
    ],
    "pendingTransactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "e7702ed0b86511ed8b133a8a2e562632",
    "transactionId": "ed8c0e60b86511ed87ab6bab097c9735"
    }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }


    console.log('VALID: ',bitcoin.chainIsValid(bc1.chain));


