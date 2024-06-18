import mongoose from "mongoose";


export const databaseconnection = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: "new7" })
        .then(() => console.log('Database Connection Successfuly'))
    .catch((e)=>console.log(`Error While Database Connection ${e}`))
}