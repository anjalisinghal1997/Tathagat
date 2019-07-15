var express=require("express");
var app = express();
var router = express.Router();
app.use("/admin",router);
var mysql  = require('mysql');
var querystring = require("querystring");
var flag=0;
var cat;
var connection = mysql.createConnection
 (
    {
        host:'localhost',
        user:'root',
        password:'anjali',
        database:'intern',
        port:3307
    }
);
app.listen(7070,function()
{
    console.log("we starting express at 7070");
});

app.get("/",function(request,respond)
{
    respond.sendFile(__dirname+"/my_login.html");
  //respond.write("Hello");
  //respond.end();
  //  respond.sendFile(__dirname+"/index.html");
});
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
router.post("/my_login1",function(req,res)
{
  req.on("data", function(query)
     {

         console.log(query.toString());
         var q = querystring.parse(query.toString());
         console.log(q);

  //console.log("name is"+req.body.t1);
  connection.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    for(var i=0;i<result.length;i++)
    {
      //res.write("ID is: "+result[i].id+" and name is: "+result[i].name+"\n");
      if(result[i].id==q.t1 && result[i].name==q.t2)
      {
        flag=1;
        cat=result[i].role;
        console.log("Role: "+cat);
        break;
      }
      else {
        flag=2
      }
    }
    if(flag==1){
    if(cat=='student')
    {
      res.write("Student");
    }
    if(cat=='uploader')
    {
      res.write("Uploader");
    }
    if(cat=='creator')
    {
    res.write("Creator");
    }
    if(cat=='accounts')
    {
      res.write("Accounts");
    }
  }
    else {
      res.write("UnSuccessful");
    }
    res.end();
  });
});
});
/*connection.query("SELECT * FROM user", function (err, result, fields) {
  if (err) throw err;
  console.log(result);
  for(var i=0;i<result.length;i++)
  {
    respond.write("ID is: "+result[i].id+" and name is: "+result[i].name+"\n");
    if(result[i].id=="1" && result[i].name=="Jai")
    {
      respond.write("LOgged in!");
      exit();
    }
  }
  respond.end();
});*/

