const dotenv = require('dotenv')
dotenv.config()

const mongoose = require("mongoose")
mongoose.connect(process.env.DB)

const express = require("express")
const {v4: uniqueId} = require('uuid')
const cors = require('cors')

const multer = require("multer")
const  storage = multer.diskStorage({
    destination : (req, file, next)=>{
        next(null,'files/')
    },
    filename : (req, file, next) =>{
        const nameArr = file.originalname.split('.')
        const ext = nameArr.pop()
        const name = `${uniqueId()}.${ext}`
        next(null,name)
    }
})
const upload =multer({storage: storage})


const { signup, login } = require('./controller/user.controller')
const { createFile, deleteFiles, fetchFiles, downloadFile } = require('./controller/file.controller')
const { populate } = require('./model/user.model')
const { fetchDashboard } = require('./controller/dashboard.controller')
const { compareSync } = require('bcrypt')
const { verifyToken } = require('./controller/token.controller')
const app = express()
app.listen(process.env.PORT || 8080)

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("view"))
app.use(cors({
    origin:'*'
}))

app.post("/signup",signup)
app.post("/login",login)
app.post("/file",upload.single('Resume'),createFile)
app.get('/file',fetchFiles)
app.delete("/file/:id", deleteFiles)
app.get("/file/download/:id", downloadFile)
app.get("/dashboard",fetchDashboard)
app.post("/token/verify",verifyToken)