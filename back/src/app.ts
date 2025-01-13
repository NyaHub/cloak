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

app.use("/api/v1", api.router)

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
const host = process.env.HOST || "localhost"

app.listen(port, host, async () => {
    console.log("app listen on ", port)
    sequelize.sync({ alter: !true })
})
/*
test user
{
    "id": "d837490a-9cea-4307-ba48-ec5ed7ff2235",
    "name": "b192187ff673dace9284e1484ee955356e079af6164f8d69096061f2cd1e15ad",
    "token": "daf25c407f690c4a-e16e6f32dee093a4-44bb6d2f05fc9165-129b169f08715ffa",
    "allowance": 1,
    "balance": 0,
    "email": "user@test.test",
    "updatedAt": "2024-10-17T19:34:26.833Z",
    "createdAt": "2024-10-17T19:34:26.833Z"
}

authToken: eyJ1dWlkIjoiZDgzNzQ5MGEtOWNlYS00MzA3LWJhNDgtZWM1ZWQ3ZmYyMjM1In0=.MEQCIB33SxzkHBIWOcTopDBbCyMLbS3s1WSB8RFg4wOKj0YyAiBwy7YjuXda0U7Pvc7vGTzaq9A/ieGYASCQEIww89sIpw==

test admin
{
    "id": "6148945b-9da5-42f1-87f8-d3c433beabea",
    "email": "admin@test.test",
    "name": "324036e7290ce95f699971a6a389d5ee9e6c7546a344477199adb0b3c8664ff4",
    "token": "5c14975ded147e9b-af6ff5f407d45cf0-f0d9371abaf43e6d-d03e4b63d9299b64",
    "allowance": 0,
    "balance": 0,
    "createdAt": "2024-10-17T19:38:22.476Z",
    "updatedAt": "2024-10-17T19:41:41.753Z"
}

authToken: eyJ1dWlkIjoiNjE0ODk0NWItOWRhNS00MmYxLTg3ZjgtZDNjNDMzYmVhYmVhIn0=.MEUCIQCiEBUR7TDzsbfJtB9g919JCwZgKXm6Wh9J1tmE8shYVAIgC/6GVpwKkJzx7Fn6C6us2OztdyJKbkO1xl6/VnK+h4k=
*/