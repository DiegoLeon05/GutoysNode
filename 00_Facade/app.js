const fs = require('fs');
const validator = require('validator');
const colors = require('colors');
const chalk = require('chalk');
const yargs = require('yargs');
const log = require('./log.js');

debugger

yargs.command({
    command:'user',
    describe:'Email from user and login in the system',
    handler: function(){
        fileWrite("Email from user received");
    }
})

// // yargs.command({
// //     command:'pass',
// //     describe:'Password from user and login in the system',
// //     handler: function(){
// //         fileWrite("Password from user received");
// //     }
// // })


// yargs.command({
//     command:'add',
//     describe:'sum values',
//     builder:{
//         title:{
//             describe:'title in the screen',
//             demandOption:true,
//             type:'string'
//         },
//         body:{
//             describe:'Body in the HTML',
//             demandOption:true,
//             type:'string'
//         }
//     },
//     handler: function(argv){
//         fileWrite("Title: " + argv.title);
//         fileWrite("Body: " + argv.body);
//     }
// });

let email = yargs.argv['user'],
    message = '';
if (validator.isEmail(email)){
    console.log(chalk.green.inverse.bold('Success!'));
    message = 'the email ' + email + ' is correct';
    console.log( message .green);
}else{
    console.log(chalk.red.inverse.bold('Error!'));
    message = 'the email ' + email + ' is incorrect';
    console.log(message .red);
}
log.Write(message);
