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
    { "label": "Telegram Authentication Token", "key": "step1" },
    { "label": "Recipient", "key": "step2" },
    { "label": "Create Message", "key": "step3" },
    { "label": "Summary", "key": "step4" }  
    ];
    var currentStep = steps[0].key;

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);

    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);
        //============== start costomization =========

        // connection.on('requestedInteraction', function(settings){
        //     eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
        //     console.log( " eventDefinitionKey----->" + eventDefinitionKey);
        // });
        // connection.on('requestedSchema', function (data) {
        //     // save schema
        //     console.log('*** Schema ***', JSON.stringify(data['schema']));
        // });

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        // connection.trigger('requestInteraction');
        // connection.trigger('requestSchema');
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

                // if (key === 'accountSid') {
                //     $('#accountSID').val(val);
                // }
                if (key === 'authToken') {
                    $('#authToken').val(val);
                    console.log('in the authtoken if --------------------------');
                   
                }

                // if (key === 'messagingService') {
                //     $('#messagingService').val(val);
                // }

                if (key === 'body') {
                    console.log('in the message if --------------------------');
                    $('#messageBody').val(val);
                   
                }                                                               

            })
        });
        console.log('======----------------------------hello');
        connection.trigger('updateButton', {
            button: 'next',
            text: 'next',
            visible: true
        });
        console.log('======----------------------------hello');

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
    
        function onClickedNext (){
            var errorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please fill Telegram Bot Token </h2> <div class="slds-notify__close"><button class="slds-button slds-button_icon slds-button_icon-small slds-button_icon-inverse" title="Close"><svg class="slds-button__icon" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use></svg><span class="slds-assistive-text">Close</span></button></div></div>';
            var messageBodyerrorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Message body is empty.</h2></div>';

              console.log('error slds ------------------ '+errorSlds);
            if(currentStep.key === 'step1')
            {
                
            //  var accountSid = $('#accountSID').val();
              var authToken = $('#authToken').val();
                  
                  if(!authToken )
                  { 
                    document.getElementById("error").innerHTML= errorSlds;
                    connection.trigger('prevStep');
                  }
                  else
                  {
                    document.getElementById("error").innerHTML= "";
                    connection.trigger('nextStep');
                  }
    
            } else if ( currentStep.key === 'step2')
            {
                
               // var b =;
               var body = $('#messageBody').val(); 
                 console.log('in the step 2 ----------------------------- '+body);
                // console.log('message aah rha hai ?'+WatsappCheck);
                // var SmsCheck =  $("#SMS").is(":checked");
                // var recipient = $("#recipient").val();
                // console.log("Recipient ---- " + recipient);
                // console.log("sms-----" +SmsCheck);
                // console.log("watsapp------" + WatsappCheck);

                

                if(body == "" )
                {
                    document.getElementById("messageBodyNull").innerHTML = messageBodyerrorSlds;
                    console.log('body coming null '+ body);
                    connection.trigger('ready');
                }
                // else if(recipient == "None")
                // {
                //     document.getElementById("recipienterror").innerHTML= "Recipient field is empty";
                //     connection.trigger('ready');
                // }
    
                else 
                {
                  //  document.getElementById("recipienterror").innerHTML= "";
                   // document.getElementById("checkboxcheck").innerHTML= "";
                   document.getElementById("messageBodyNull").innerHTML= "";
                    connection.trigger('nextStep');
                }
                
            }
            
            else if (currentStep.key === 'step3' && steps[3].active === false) {
                save();
            }
        //    else if ((currentStep.key) === 'step1')
        //    {
        //        console.log( "Account SID KE ANDAR HA" ); 
            //    var accountSid = $('#accountSID').val();
            //    console.log(accountSid);
            //    if(accountSid == null)
            //    {
            //        alert("AccountSid is empty");
            //    }
             //   alert ("Step 1 Next clicked") ;
        //    }
            else {
                console.log("else part me aarha h ");
               connection.trigger('nextStep');
            }
    }

  
    function onClickedBack (){
        connection.trigger('prevStep');

    }                   

    function onGotoStep(step){
        
        showStep(step);
        connection.trigger('ready');

    }

   function showStep(step , stepIndex) {
        console.log('in the showstep function ');
        if (stepIndex && !step) {
            step = steps[stepIndex-1];
        }


        currentStep = step;
        console.log('the current step -------------'+currentStep);
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
                    console.log("---------------------------------------------------------------------------------------------------------------->This is step 2");
                    //  connection.trigger('updateButton', {
                    //      button: 'back',
                    //      visible: true
                    //  });
                         connection.trigger('updateButton', {
                        button: 'next',
                        text: 'next',
                        visible: true
                    });

                    // connection.trigger('updateButton', {
                    //     button: 'next',
                    //     text: 'Done',
                    //     visible: true
                    // });
                    break;
                    case 'step3':
                $('#step3').show();
                    console.log("---------------------------------------------------------------------------------------------------------------->This is step 3");
                            connection.trigger('updateButton', {
                            button: 'back',
                            visible: true
                    });
                    connection.trigger('updateButton', {
                        button: 'next',
                        text: 'Done',
                        visible: true
                        });
                    break;
                    case 'step4':
                        $('#step4').show();
                        console.log("---------------------------------------------------------------------------------------------------------------->This is step 4");
                   
                    break;
                } 
            }
            function save() {

            //   var accountSid = $('#accountSid').val();
                var authToken = $('#authToken').val();
            //    var messagingService = $('#messagingService').val();
                var body = $('#messageBody').val();
               // console.log("in the save option "+ body);
                
                payload['arguments'].execute.inArguments = [{
            //        "accountSid": accountSid,
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

