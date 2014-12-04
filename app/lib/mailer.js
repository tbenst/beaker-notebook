var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: "Mandrill",
  auth:{
    user: process.env.MANDRILL_USER,
    pass: process.env.MANDRILL_PASSWORD
  }
})

exports.sendPasswordResetEmail = function(data, cb) {

  var mailOptions = {
    from: process.env.MAIL_FROM,
    to: data.to,
    subject: 'Reset Bunsen Password'
  };
  mailOptions.html = "<p>You recently requested a link to reset your Bunsen password.</br>Please set a new password by following the link below:</br></p>" +
   "<a href=http://"+ process.env.HOSTNAME +"/#/change_password?id=" + data.requestId + "> Reset Bunsen Password </a>"

  transporter.sendMail(mailOptions, function(err, info) {
    if(err){
      cb(err, err);
    } else {
      cb(undefined, info);
    }
  });
}
