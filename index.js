const express = require("express")
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express ();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.zncbail.mongodb.net/registrationFormDB`);

//registration schema
const registrationSchema = new mongoose.Schema({
  name :String,
  email : String,
  password :String   
});

//model of registration schema
const Registration = mongoose.model("Registration",registrationSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(bodyParser.urlencoded ({ extended: true}));
// app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/pages/index.html");

})

app.post("/register", async (req, res) => {
    try{
        const { name,email,password} = req.body;
        
        const registrationData = new Registration ({
            name,
            email,
            password
        });
        await registrationData.save();
        res.redirect("/success");
    }
    catch (error) {
        console.log(error)
        res.redirect("/error");
    }
   
})

app.get("/success", (req, res)=>{
    res.sendFile (__dirname+"/pages/success.html");
})

app.get("/error", (req, res)=>{
    res.sendFile (__dirname+"/pages/error.html");
})
app.listen(port,()=>{ 
    console.log(`server is running on port ${port}`);
})


// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// const app = express();
// dotenv.config();

// const port = process.env.PORT || 3000;

// const username = process.env.MONGODB_USERNAME;
// const password = process.env.MONGODB_PASSWORD;

// mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.zncbail.mongodb.net/registrationFormDB`)
//   .then(() => console.log('Database connected successfully'))
//   .catch(err => console.log('Database connection error:', err));

// // Registration schema
// const registrationSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String   
// });

// // Model of registration schema
// const Registration = mongoose.model("Registration", registrationSchema);

// // Middleware to parse incoming requests
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/pages/index.html");
// });

// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const registrationData = new Registration({
//       name,
//       email,
//       password
//     });
//     await registrationData.save();
//     res.redirect("/success");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/error");
//   }
// });

// app.get("/success", (req, res) => {
//   res.sendFile(__dirname + "/pages/success.html");
// });

// app.get("/error", (req, res) => {
//   res.sendFile(__dirname + "/pages/error.html");
// });

// app.listen(port, () => { 
//   console.log(`Server is running on port ${port}`);
// });
