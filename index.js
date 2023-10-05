import express from "express";
import bodyParser from "body-parser"


const app=express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

const list=["work","play","chill"];

app.get("/",(req,res)=>{
    res.render("index.ejs",{List:list});
})

app.post("/",(req,res)=>{
    const newItem=req.body.newTodo;
    //console.log(req.body)
    list.push(newItem);
    //console.log(list);
    res.redirect("/");
})




app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})