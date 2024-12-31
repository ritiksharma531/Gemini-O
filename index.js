const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const app = express();

const genAI = new GoogleGenerativeAI("AIzaSyBtL33xeB261Owcn8EjkLYUOjRi_HliAs8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});
app.post("/", async(req,res)=>{
    const prompt = req.body.prompt;
    const result = await model.generateContent(prompt);
    
    res.render("index.ejs", {result: result.response.text()});
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
