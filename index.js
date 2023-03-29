const express = require('express')
const ds = require("./service/dataService")

const jwt = require("jsonwebtoken")

const app = express();
app.use(express.json());



//middleware creation
const jwtMiddleware = (req, res, next) => {

    try {
        const token = req.headers['access_token'];
        const data = jwt.verify(token, "mykey")
        // console.log(data)
        
        //used to get the server out of this  method
        next()
    }
    catch {
        res.status(422).json({
            status: false,
            message: "please login",
            statusCode: 422
        })
    }
}

app.post("/register", (req, res) => {
    const result = ds.register(req.body.acno, req.body.uname, req.body.psw)

    res.status(result.statusCode).json(result)
})

app.post("/login", (req, res) => {
    const result = ds.login(req.body.acno2, req.body.pass2)
    res.status(result.statusCode).json(result)
})

app.post("/deposit", jwtMiddleware, (req, res) => {
    const result = ds.deposit(req.body.acno, req.body.pass, req.body.amt)
    res.status(result.statusCode).json(result)
})

app.post("/withdraw", jwtMiddleware, (req, res) => {
    const result = ds.withdraw(req.body.acno, req.body.pass, req.body.amt)
    res.status(result.statusCode).json(result)
})

app.get("/getTransactions", jwtMiddleware, (req, res) => {
    const result = ds.getTransactions(req.body.acno)
    res.status(result.statusCode).json(result)
})

app.listen(3000, () => {
    console.log("Server running...")
})