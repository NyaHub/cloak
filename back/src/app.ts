import "dotenv/config"

import express from "express"
import cookieparser from "cookie-parser"
import multer from "multer"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"
import { session } from "./core/session"
import { API } from "./core/api/api"
import { sequelize } from "./core/database"

const app = express()

const upload = multer({
    dest: "user_files/"
})

app.set('trust proxy', 1)
app.use(cors())
app.use(morgan("combined"))
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieparser())
app.use(session(process.env.SESSION_PK, "JWT"))

const api = new API()

app.use("/api", api.router)

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
const host = process.env.HOST || "localhost"

app.listen(port, host, async () => {
    console.log("app listen on ", port)
    sequelize.sync()
})