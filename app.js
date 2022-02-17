const User = require("./models/User"); 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const XLSX = require('xlsx');

const app = express();
//template engine
app.set("view engine", "ejs");
//middleware
app.use(express.static("public"));
app.use(express.json());
const dbURI = "mongodb+srv://Arun_Siddardha:*p9z2kmdUKGBNp%40@cluster0.iqqhw.mongodb.net/CA_data"
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    UseUNifiedTopology: true,
  })
  .then((result) => {
    app.listen(process.env.PORT || 3000);
    console.log("connected");
  })
  .catch((err) => console.log(err));
  app.get('/',(req,res)=>
  {
      User.find((err,data)=>
      {
          if(err)
          {
              console.log(err);
          }
          else{
              if(data!='')
              {
                  res.render('home',{data:data})
              }
          }
      })
  })

app.post('/exportdata',(req,res)=>
{
    var wb= XLSX.utils.book_new();
    User.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/public/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
})