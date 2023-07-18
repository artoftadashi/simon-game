import express from "express";
import path  from 'path';

const __dirname = path.resolve();

const app = express();

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});



app.listen("3000", function(){
    console.log("server started on port 3000");
});