var nodemailer = require('nodemailer');

module.exports = {
    send_email: function (emailUser, nameUser, token) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'byhy54@gmail.com',
              pass: 'rrgotxgrqttyywrm'
            }
        });
          
        var mailOptions = {
            from: 'byhy54@gmail.com',
            to: emailUser,
            subject: 'Sending Email using Node.js',
            text: 'Hi ' + nameUser + '\nThanks for creating an account\nTo continue, please confirm your email address by clicking the link below.\n' 
            + 'http://localhost:8081/verification-user/' + token
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }); 
    },

    send_email_forgot_password: function (emailUser, token) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'byhy54@gmail.com',
              pass: 'rrgotxgrqttyywrm'
            }
        });

        var mailOptions = {
            from: 'byhy54@gmail.com',
            to: emailUser,
            subject: 'Sending Email using Node.js',
            text: 'Hi a request has been received to change the password for your account\n'
            + 'http://localhost:8081/forgot-password/' + token
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }); 
    }
};