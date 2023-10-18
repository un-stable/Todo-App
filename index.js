import express from "express";
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose";
import { config } from 'dotenv';

config({ path: './ignore.env' });

const app=express();
const port=process.env.PORT;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
console.log(process.env.PORT);

const mongoAtlasUri = process.env.DATABASE_URL;
console.log(mongoAtlasUri)

try {
    // Connect to the MongoDB cluster
    mongoose.connect(mongoAtlasUri,{ useNewUrlParser: true});
  } catch (e) {
    console.log("could not connect");
  }
  
  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => console.log("Connected to DB!"));

const list=[];

const workSchema=mongoose.Schema({
    title:String,
    detail:String
})

const work = mongoose.model('work', workSchema);

const work1 = new work(
  { workTitle: 'wash dishes',
    detail:'wash utensils everyday '
  }
  );

app.get("/",async (req,res)=>{
   
  const data=await work.find();
console.log(data);
  for(let i=0;i<data.length ;i++){
    list[i]=data[i].title;
  }
    res.render("index.ejs",{List:list});
})

app.post("/",(req,res)=>{
  
    const newWork=new work({
      title:req.body.newTodo,
      detail:"some work detail"
    })
    // list.push(newItem);
    newWork.save().then(()=>console.log("work saved"));
    //console.log(list);
    res.redirect("/");
})

app.post("/delete", async (req,res)=>{
    const name=req.body.listName;
    const q= await  work.deleteOne({title:name})
    const getIndex=list.findIndex((each)=>{each===name});
    list.splice(getIndex,1);
    res.redirect("/");
})




app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})