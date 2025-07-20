const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const {connectDb,User} = require("../src/mongodb");
const hbs = require("hbs");


const app = express();
connectDb();

const port = process.env.PORT || 3000;

const templatePath = path.join(__dirname, '../templates');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Added this
app.set("view engine", "hbs");
app.set("views", templatePath);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {
        const data = {
            name1: req.body.firstname,
            name2: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            flatno: req.body.flatno
        };

          //insert data into mongodb
        await User.create(data);

        res.status(201).send("User registered successfully!");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
    }
});

app.post("/login", async (req, res) => {
    try {
        const check=await User.findOne({username:req.body.username})
        //here we will get the content from username textfiled using req.body.username and after that findOne command will help to check if the data is there or not
        
        //to check if the password is same
        if(check.password==req.body.password && check.username==req.body.username)
        {
           res.render("home")
        }
        else
        {
            res.send("The entered credentials are wrong");
        }
        
        
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("User not existing!!");
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
