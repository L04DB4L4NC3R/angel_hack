const crypto = require("crypto");


class Block{
    constructor(index,previousHash,timestamp,hash,data){
        this.index = index;
        this.timestamp = timestamp;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
    }
}



var calcHash = (index,previousHash,data,timestamp)=>{
    return crypto.createHmac('sha256',process.env.SALT)
    .update(index.toString()+previousHash+timestamp+data)
    .digest('hex');
}



exports.genesisInit = (chain)=>{
    return new Block(0,"GENESIS PREVIOUS HASH",new Date.getTime()/1000,calcHash(0,"PH","GD",new Date.getTime()/1000),"GD")
}




exports.createBlock = (index,data,timestamp,latestBlock)=>{

    let thisIndex = latestBlock.index+1;

    let thisHash = calcHash(nextIndex,latestBlock.hash,data,timestamp);

    return new Block(thisIndex,latestBlock.hash,timestamp,thisHash,data);

}



exports.validateChain = (newBlock,oldBlock)=>{
    if(newBlock.index!=oldBlock.index+1)
        return false;
    if(newBlock.previousHash!=oldBlock.hash)
        return false;
    if(calcHash(newBlock.index,newBlock.previousHash,newBlock.timestamp,newBlock.data)!=newBlock.hash)
        return false;
    return true;
}