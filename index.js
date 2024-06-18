import { config } from "dotenv"
import express from "express"
import { databaseconnection } from "./data/database.js"
import { errorMiddlewares } from "./middlewares/error.MIddlewares.js"
import router from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
config({ path: "./config/.env" })
const app = express()


//Middlewares
databaseconnection()
app.use(express.json())
app.use(cookieParser())



//Routes

app.use("/api/user",router)


//Server

app.use(errorMiddlewares)

app.listen(process.env.PORT, () => {
    console.log(`Server is Working on http://localhost:${process.env.PORT}`);
})