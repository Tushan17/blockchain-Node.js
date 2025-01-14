const sha256 = require('sha256');
const uuid = require('uuidv1');

const currentNodeUrl = process.argv[3];

function Blockchain() {
	this.chain =[];
	this.pendingTransactions=[];

	this.currentNodeUrl=currentNodeUrl;
	this.networkNodes = [];

	this.createNewBlock(100,'0','0');

}


Blockchain.prototype.createNewBlock = function(nonce,previousBlockHash,Hash){
	const newBlock ={
		index: this.chain.length+1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce,
		hash: Hash,
		previousBlockHash: previousBlockHash
	};

	this.pendingTransactions=[];
	this.chain.push(newBlock);

	return newBlock;
}


Blockchain.prototype.getLastBlock = function(){
	return this.chain[this.chain.length-1];
}


Blockchain.prototype.createNewTransaction =function(amount, sender,recipient){
	const newTransaction={
		amount: amount,
		sender: sender,
		recipient: recipient,
		transactionId : uuid().split('-').join('')
	};

	return newTransaction;

};
Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj){
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock()['index']+1;
};

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData,nonce){
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);
	return hash;	
}

Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){
	let nonce = 0;
	let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
	while(hash.substring(0,4) !== '0000'){
		nonce++;
		hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
		// console.log(hash);
	}
	// console.log("Nonce is: "+nonce);

	return nonce;
}

Blockchain.prototype.chainIsValid = function(blockchain) {
	let validChain = true;

	for(var i =1; i<blockchain.length;i++){
		const currentBlock = blockchain[i];
		const prevBlock = blockchain[i-1];
		const blockHash = this.hashBlock(prevBlock['hash'],{ transactions:currentBlock['transactions'],index: currentBlock['index']}, currentBlock['nonce']);
		if(blockHash.substring(0,4)!=='0000') validChain =false;
		if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain =false;
		console.log('previousBlockHash =>', prevBlock['hash']);
		console.log('currentBlockHash =>', currentBlock['hash']);

	};
	const genesisBlock = blockchain[0];
	const CorrectNonce = genesisBlock['nonce'] ===100;
	const CorrectPreviousBlockHash = genesisBlock['previousBlockHash']==='0';
	const CorrectHash = genesisBlock['hash']==='0';
	const CorrectTransactions = genesisBlock['transactions'].length ===0;

	if(!CorrectNonce || !CorrectPreviousBlockHash || !CorrectHash || !CorrectTransactions) validChain=false;


	return validChain;
};


Blockchain.prototype.getBlock = function (blockHash) {
	let CorrectBlock = null;
	this.chain.forEach(block => {
		if(block.hash === blockHash) CorrectBlock = block;
	});
	return CorrectBlock;
};


Blockchain.prototype.getTransaction = function (transactionId) {
	let CorrectTransaction = null;
	let CorrectBlock =null;
	this.chain.forEach(block=>{
		block.transactions.forEach(transaction =>{
			if(transaction.transactionId === transactionId){
				CorrectTransaction = transaction;
				CorrectBlock = block;
			}
		});
	});
	return {
		transaction: CorrectTransaction,
		block: CorrectBlock
	};
};

Blockchain.prototype.getAddressData =  function (address) {
	const addressTransactions =[];
	this.chain.forEach(block=>{
		block.transactions.forEach(transaction=>{
			if(transaction.sender === address || transaction.recipient ===address){
				addressTransactions.push(transaction);
			};
		});
	});
	let balance = 0;
	addressTransactions.forEach(transaction=>{
		if(transaction.recipient===address) balance+=transaction.amount;
		else if(transaction.sender === address) balance-=transaction.amount;
	});
	return{
		addressTransactions: addressTransactions,
		addBalance :balance
	};
};


module.exports = Blockchain;