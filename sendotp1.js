const SendOtp = require('sendotp');
//var n1=require('./sendotp.js')
const express=require('express');

var app=express();
const sendOtp = new SendOtp('283822AbTyKROGPCv5d1dde78');
var n1;

var bodyparser=require("body-parser");//convert data into string

app.use(bodyparser.urlencoded({extended:true}));//encode the data
app.use(bodyparser.json());



//otp is optional if not sent it'll be generated automatically
app.post("/otp",function(req,res)
{
  n1=req.body.number;
  sendOtp.send(n1, "OTPSMS", function (error, data) {
    console.log(data);
    console.log("success");
    res.sendFile(__dirname+"/smsotpverify.html");
  });
});


app.post("/otpverify",function(req,res)
{
  var n=req.body.otp;
  sendOtp.verify(n1,n, function (error1, data1) {
    console.log(data1); // data object with keys 'message' and 'type'
    if(data1.type == 'success') req.send("success");
    if(data1.type == 'error') req.send("unsuccess");
  });
  });



app.listen(7070,function(req,res)
{
    console.log("starting server")
}
);






