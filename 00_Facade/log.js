const fs = require('fs');
require('colors');
const logFile = '.log';
const enumerator = require('./Enumerators');
let adjustValue = (atributtes)=>{
    atributtes.value = atributtes.value.toString();
    atributtes.valuerepeat = atributtes.valuerepeat.toString();
    if (atributtes.value.length <= atributtes.size){
        return atributtes.valuerepeat.repeat(atributtes.size - atributtes.value.length) + atributtes.value;
    }else{
        return atributtes.value;
    }
};

let dateSystem = ()=> {
    var date = new Date();
    return date.getFullYear() + '/' + 
            adjustValue ({value: date.getMonth(), size:2, valuerepeat: '0' }) + '/' + 
            adjustValue ({value: date.getDate(), size:2, valuerepeat: '0' }) + ' ' + 
            adjustValue ({value: date.getHours(), size:2, valuerepeat: '0' }) + ':' + 
            adjustValue ({value: date.getMinutes(), size:2, valuerepeat: '0' })  + ':' + 
            adjustValue ({value: date.getSeconds(), size:2, valuerepeat: '0' }) + ' '
}

const fileWrite = (atributtes)=>{
    let date = dateSystem();
    const message = date.split(' ')[1] +  ' ' + atributtes.method + ' ' + atributtes.message;
    let logFileName = 'D:/GIT/' + atributtes.class + '_' + date.substr(0,10).replace('/','').replace('/','') + logFile;
    console.log(logFileName);
    if (!fs.existsSync(logFileName)){
        fs.writeFileSync(logFileName, message);
    }else{
        fs.appendFileSync(logFileName, '\n' +  message);
    }
    switch (atributtes.TypeMessage) {
        case enumerator.TypeMessage.Info:
            console.log(message .blue);
            break;
        case enumerator.TypeMessage.Warning:
            console.log(message .yellow);
            break;
        case enumerator.TypeMessage.Success:
            console.log(message .green);
            break;
        case enumerator.TypeMessage.Error:
            console.log(message .red);
            break;
        default:
            console.log(message .red);
            break;
    }
}

const fileget = ()=>{
    return fs.readFileSync(logFile).toString();
}

module.exports = {
    Write: fileWrite,
    Read: fileget
};