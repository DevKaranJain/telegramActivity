'use strict';

// Deps
console.log("in the index file ");
var activity = require('./activity');

/*
 * GET home page.
 exports.index = function(req, res){
    if( !req.session.token ) {
        res.render( 'index', {
            title: 'Unauthenticated',
            errorMessage: 'This app may only be loaded via Salesforce Marketing Cloud',
        });
    } else {
        res.render( 'index', {
            title: 'Journey Builder Activity',
            results: activity.logExecuteData,
        });
    }
};

exports.login = function( req, res ) {
    console.log( 'req.body: ', req.body );
    console.log('hello login function called');
    res.redirect( '/' );
};

exports.logout = function( req, res ) {
    req.session.token = '';
};
*/
const https = require('https')
const querystring = require('querystring')

module.exports = {
  sendMessage,
  sendMessageFor,
  sendRequest
}

function sendMessage (token, channel, message) {
  return sendMessageFor(token, channel)(message)
}

function sendMessageFor (token, channel) {
  const baseUrl = `https://api.telegram.org/bot${token}`

  return message => {
    const urlParams = querystring.stringify({
      chat_id: channel,
      text: 'hello i am onii bot and hit from journey builderr',
      parse_mode: 'HTML'
    })

    return sendRequest(`${baseUrl}/sendMessage?${urlParams}`)
  }
}

function sendRequest (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => res.statusCode === 200 ? resolve(res) : reject(res))
      .on('error', reject)
  })
}
