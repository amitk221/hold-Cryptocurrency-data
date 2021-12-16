// online Packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fetch = require('node-fetch');
const schedule = require('node-schedule');


//Port
const port = process.env.PORT || 3000;

//config env file
require('dotenv').config();


// databse model
const HoldData = require('./models/holdinfoModel');
// connection path url
require("./dbConnection/connection");


// midleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set path for page
app.use(express.static(path.resolve(__dirname, './views')));
// app.use(express.static(static_path));



// set view page ejs
app.set("view engine","ejs");

// fetch Api and return data
async function getData() {
    const holdAllData = await fetch(
        "https://api.wazirx.com/api/v2/tickers"
    );

    let response = await holdAllData.json();
    var result = Object.keys(response).map((key) => response[key]);
    return result;
}

// scheduler for every mintues update data to database into first 10 data
schedule.scheduleJob('* * * * *', async()=> {
    try{
    var data = await getData();
    await HoldData.deleteMany();
    data = data.slice(0, 10);
    const saveData = await HoldData.insertMany(data);
    console.log('suc');
    }
    catch(err){
        console.log(err);
    }
});

// get home page and show cryptocurrency data
app.get("/",async (req,res)=>{ 
    try{
        const data = await HoldData.find();
        //  res.render("index",{data});
         res.render('index', {title: "assignment", data: data})
    }catch(e){
        console.log(`Please try after sometime.
            error :
            ${e}`
        );
    }
});


// get all url at  home page and show cryptocurrency data
app.get("*",async (req,res)=>{ 
    try{
        const data = await HoldData.find();
        //  res.render("index",{data});
         res.render('index', {title: "assignment", data: data})
    }catch(e){
        console.log(`Please try after sometime.
            error :
            ${e}`
        );
    }
});

// server listen
app.listen( port ,() => {
    console.log("server started ");
})



