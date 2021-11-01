'use strict';
var util = require('util');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');
var request = require('request');
var express     = require('express');
var bodyParser  = require('body-parser');

const { JsonWebTokenError } = require('jsonwebtoken');


exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path, 
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + req.headers);
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {

    console.log("5 -- For Edit");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Edited: "+req.body.inArguments[0]);    
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    console.log("coming in exports of edit");
    logData(req);
    res.send(200, 'Edit');
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    
    console.log("5 -- For Save");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Saved: "+req.body.inArguments[0]);
    
    // Data from the req and put it in an array accessible to the main app.
  //  console.log( req.body );
    console.log("in the save function ");
    logData(req);
    res.send(200, 'Save');
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {

    console.log("5 -- For Execute");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
      console.log("Executed: "+req.body.inArguments[0]);


    var requestBody = req.body.inArguments[0];
    var uniqueEmail = req.body.keyValue;
   // console.log(uniqueEmail);
    const accountSid = requestBody.accountSid;
    const authToken = requestBody.authToken;
    const to = requestBody.to;
//    const from = requestBody.messagingService;
    const body = requestBody.body;


    // const { sendMessageFor } = require('')
    // const sendMessage = sendMessageFor('2026995123:AAFoPkUc8NklMF-xfO-VZVj-bcV0zQlsNP8', '-526739583')
    // sendMessage(`Hi from bot!`)
    
    //this line is responsible for userName is required  error 
    // const { sendMessageFor }  = require('simple-telegram-message')
    // const sendMessage = sendMessageFor('2026995123:AAFoPkUc8NklMF-xfO-VZVj-bcV0zQlsNP8','-526739583')
    // sendMessage('hello i am bot ')
    //    .then(message => console.log(message.sid)) 
    //    .catch(Console.err)
    //    .done();
    // console.log('hello in the activity file ');
    // const Telegrambot =require('node-telegram-bot-api');
    // console.log('hello i am below the require function');
    // const token = '2026995123:AAFoPkUc8NklMF-xfO-VZVj-bcV0zQlsNP8';
    // const bot = new TelegramBot(token , {polling: true});
    // bot.onText(/\/echo (.+)/, (msg,match)=>{
    //     const chatId = msg.chat.Id;
    //     const resp = match[1];
    //     bot.sendMessage(chatid , resp);
    // });
    // bot.on('message' , (msg)=> {
    //     const chatId = msg.chat.id;
    //     bot.sendMessage(chatid , 'heelloo message coming ');
    // })

    const client = require('simple-telegram-api')('2026995123:AAHkGMzSm-Ebj6WAYAT5ScrQs_meXGaThHU','-526739583');
    client.messages
        .create({
            body: body,
        //    statusCallback: 'http://postb.in/1234abcd',
            from: '992164535',
            to: '-526739583'
        })
        .then(message => { 
            console.log(message)});
    // FOR TESTING

    logData(req);
    res.send(200, 'Publish');

    // Used to decode JWT
    // JWT(req.body, process.env.jwtSecret, (err, decoded) => {

    //     // verification error -> unauthorized request
    //     if (err) {
    //         console.error(err);
    //         return res.status(401).end();
    //     }

    //     if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            
    //         // decoded in arguments
    //         var decodedArgs = decoded.inArguments[0];
            
    //         logData(req);
    //         res.send(200, 'Execute');
    //     } else {
    //         console.error('inArguments invalid.');
    //         return res.status(400).end();
    //     }
    // });
};


/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {

    console.log("5 -- For Publish");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    //console.log("Published: "+req.body.inArguments[0]);        
    
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
     logData(req);
     res.send(200, 'Publish');
     console.log("coming to publish");
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    
    console.log("5 -- For Validate");	
    console.log("4");	
    console.log("3");	
    console.log("2");	
    console.log("1");	
    console.log("Validated: "+req.body.inArguments);       
    console.log('in the validate function ');
    // Data from the req and put it in an array accessible to the main app.
    //console.log( req.body );
    logData(req);
    res.send(200, 'Validate');
    
};
