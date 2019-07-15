const SendOtp = require('sendotp');
const sendOtp = new SendOtp('283822AbTyKROGPCv5d1dde78');



//otp is optional if not sent it'll be generated automatically



  sendOtp.verify("918076153976", false, function (error, data, response) {
    console.log(response)
  if(data.msgType == 'success') console.log('OTP verified successfully')
  if(data.msgType == 'error') console.log('OTP verification failed')
  });