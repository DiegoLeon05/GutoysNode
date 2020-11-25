const request = require('request');
const log = require('./log');
const enumerator = require('./Enumerators');
const className = 'functionsUtil'
const urlServer = 'http://192.168.1.3:1234/';

const executeAjax = (attribute, callback) => {
    request( 
        {
            // url: urlServer + attribute.url,
            url: attribute.url,
            json:true
        }, 
        (error, response) => {
            if (error){
                log.Write({class:className, method: 'request', message:error});
            }else if (response.statusCode !== 200){
                log.Write({class:className, method: 'request', message:response.statusCode + ' ' + response.statusMessage + ': ' + response.request.req.path });
            }else if (response.body === undefined){
                log.Write({class:className, method: 'request', message:'The request don\'t return any value: ' + response.request.req.path });
            }else{
                callback(response.body);
            };
    });
}

module.exports = {
    executeAjax: executeAjax
}