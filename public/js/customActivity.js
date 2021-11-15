define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';
    console.log("in the custom activity ");
    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [ // initialize to the same value as what's set in config.json for consistency
        { "label": "Create SMS Message", "key": "step1" },
        { "label": "Choose Chat id destination ", "key": "step2" }
    ];
    var currentStep = steps[0].key;

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

  function initialize(data) {
        console.log("Initializing data data: "+ JSON.stringify(data));
        if (data) {
            payload = data;
        }    

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
         );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log('Has In arguments: '+JSON.stringify(inArguments));

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {

                if (key === 'accountSid') {
                    $('#accountSID').val(val);
                }

                if (key === 'authToken') {
                    $('#authToken').val(val);
                }

                // if (key === 'messagingService') {
                //     $('#messagingService').val(val);
                // }

                if (key === 'body') {
                    $('#messageBody').val(val);
                }                                                               

            })
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'next',
            visible: true
        });

    }
    function onGetTokens (tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        console.log("Tokens function: "+JSON.stringify(tokens));
        //authTokens = tokens;
    }

    function onGetEndpoints (endpoints) {
         //Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
        console.log("Get End Points function: "+JSON.stringify(endpoints));
    }
    
    function onClickedNext(){
        console.log('in the onclick function ');
        var errorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please fill Account SID and Auth Token </h2> <div class="slds-notify__close"><button class="slds-button slds-button_icon slds-button_icon-small slds-button_icon-inverse" title="Close"><svg class="slds-button__icon" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg><span class="slds-assistive-text">Close</span></button></div></div>';
        if((currentStep.key)=== 'step1'){
            var authToken = $('#authToken').val();

            if(authToken != null)
              { 
                console.log('in the auth token if ');
                document.getElementById("error").innerHTML= errorSlds;
                connection.trigger('prevStep');
              }
              else
              {
                document.getElementById("error").innerHTML= "";
                connection.trigger('nextStep');
              }
        }
        else if(currentStep.key === 'step2'){
            var recipient = $("#recipient").val();
            connection.trigger('nextStep');
        } 
        else if ((currentStep.key === 'step3' && steps[3].active === false))
            {
            save();
        } 
              
    }
    function onClickedBack () {
        connection.trigger('prevStep');
    }

    function onGotoStep (step) {
        showStep(step);
        connection.trigger('ready');
    }
    function showStep(){
        if (stepIndex && !step) {
            step = steps[stepIndex-1];
        }
        currentStep = step;

        $('.step').hide();

        switch(currentStep.key) {
            case 'step1':
                $('#step1').show();
                console.log("---------------------------------------------------------------------------------------------------------------->This is step 1");
                 connection.trigger('updateButton', {
                  button: 'next',
                     text: 'next',
                  visible: true
                    //enabled: Boolean(getMessage())
                });
                break;
            case 'step2': 
            $('#step2').show();
        //     connection.trigger('updateButton', {
        //         button: 'back',
        //         visible: true
        //    });
           connection.trigger('updateButton', {
            button: 'next',
            text: 'Done',
            visible: true
        });
        break;
        }
    }
    

    function save() {

        var accountSid = $('#accountSid').val();
        var authToken = $('#authToken').val();
    //    var messagingService = $('#messagingService').val();
        var body = $('#messageBody').val();
       // console.log("in the save option "+ body);
        
        payload['arguments'].execute.inArguments = [{
            "accountSid": accountSid,
            "authToken": authToken,
    //        "messagingService": messagingService,
            "body": body,
            "to": "{{Contact.Attribute.telegramActivity.chatid}}" ,//<----This should map to your data extension name and phone number column
           
        }];       
        payload['metaData'].isConfigured = true;
        console.log("Payload on SAVE function: "+JSON.stringify(payload));
        connection.trigger('updateActivity', payload);

    }  
                    

});

// //function sendMessageFor (token, channel) {
//     console.log('in the function of sendmessage for ')
//     const baseUrl = `https://api.telegram.org/bot${token}`

//     return message => {
//     const urlParams = querystring.stringify({
//         chat_id: channel,
//         text: 'hello i am bot hit by journey builder',
//         parse_mode: 'HTML'
//     })

//     return sendRequest(`${baseUrl}/sendMessage?${urlParams}`)
//     }
// }-->