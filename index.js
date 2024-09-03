import axios from "axios"
import express from "express"
import bodyParser  from "body-parser"

const port = 3000 ; 
const app=express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.listen(port , ()=>{
    console.log(`server runing from ${port} port`);
});

const config = {
    headers: {
      'x-rapidapi-host': 'cat-facts12.p.rapidapi.com',
      'x-rapidapi-key': '4b574031f9msh365fae317765148p1070d3jsnf53c58533317'
    },  
};

app.get("/" ,async  (req , res)=>{
    try{
        res.render("index.ejs");
    }catch(error){
        res.json(error); // to get the error from the API we use error.response.message 
    }
});

app.get("/fact" , async (req , res )=>{
    try{
        const response = await axios.get("https://cat-facts12.p.rapidapi.com/Fact" , config);
        const image = await axios.get("https://api.thecatapi.com/v1/images/search");
        const factResult =  response.data;
        const catImage = image.data ;
        res.render("index.ejs" , {data:{url : catImage[0].url , fact:factResult.Fact}});
    }catch(error){
        res.status(404).json("error");
    }
});