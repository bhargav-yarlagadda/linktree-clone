// lib/mongo.js
import { MongoClient } from "mongodb";


const connectToDatabase = async ()=>{
    const uri = process.env.MONGO_URI;
    if (!uri) {
    throw new Error("Please define the MONGO_URI environment variable.");
    }
    try{
        const client = new MongoClient(uri)
        console.log('connected to dp successfully')
    await client.connect()
    }catch(err){
        console.log('error in connecting to db',err)
    }
}
export default connectToDatabase