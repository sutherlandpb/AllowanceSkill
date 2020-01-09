
const Alexa = require('ask-sdk-core');
let readfile = require('./readfile');

let jet;
let rae;
let cassius;
let fox;
let ada;
let inan;

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome, you can ask for everyone, or you can ask how much money a kid has. Which would you like to try?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const ListAllIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListAllIntent';
    },
    async handle(handlerInput) {
        let result = await readfile.parseFile('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5mdwxisOZ9crHm5vtzxLYtTxeVIwr1D26txf49ywOR_R53cxJ5aluIceT2PWpWsqnw7QkyXFqPS19/pub?output=tsv');
        var x = result.split('\n');
        jet = x[1].split('\t')[1];
        rae = x[2].split('\t')[1];
        cassius = x[3].split('\t')[1];
        fox = x[4].split('\t')[1];
        ada = x[5].split('\t')[1];
        inan = x[6].split('\t')[1];
        let speakOutput;
        speakOutput = 'Jet has ' + jet + ' dollars, Rae has ' + rae + ' dollars, Cash has ' + cassius + ' dollars, Fox has ' + fox + ' dollars, Ada has ' + ada + ' dollars and Einen has ' + inan + ' dollars.' ;  
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const KidIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'KidIntent';
    },
    async handle(handlerInput) {
        const kidSlot = handlerInput.requestEnvelope.request.intent.slots.kid;
        let kidName;
        let speakOutput;
        
        let result = await readfile.parseFile('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5mdwxisOZ9crHm5vtzxLYtTxeVIwr1D26txf49ywOR_R53cxJ5aluIceT2PWpWsqnw7QkyXFqPS19/pub?output=tsv');
        var x = result.split('\n');
        jet = x[1].split('\t')[1];
        rae = x[2].split('\t')[1];
        cassius = x[3].split('\t')[1];
        fox = x[4].split('\t')[1];
        ada = x[5].split('\t')[1];
        inan = x[6].split('\t')[1];
        
        if (kidSlot && kidSlot.value) {
            kidName = kidSlot.value.toLowerCase();
            speakOutput = 'I don\'t know ' + kidName + '\'s balance.' ;
            
            if (kidName === 'jet') {
                speakOutput = kidName + ' has ' + jet + ' dollars.' ;      
            }
            if (kidName === 'rae' || kidName === 'ray') {
                speakOutput = kidName + ' has ' + rae + ' dollars.' ;      
            } 
            if (kidName === 'cash' || kidName === 'cassius') {
                speakOutput = kidName + ' has ' + cassius + ' dollars.' ;      
            } 
            if (kidName === 'fox') {
                speakOutput = kidName + ' has ' + fox + ' dollars.' ;      
            } 
            if (kidName === 'ada' || kidName === 'ava') {
                speakOutput = kidName + ' has ' + ada + ' dollars.' ;      
            } 
            if (kidName === 'inan' || kidName === 'einen' || kidName === 'eyeman' || kidName === 'eyenan' || kidName === 'speedboat') {
                speakOutput = kidName + ' has ' + inan + ' dollars.' ;      
            } 
            
        } else {
            speakOutput = 'I am not sure who you are asking about.' ;  
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        KidIntentHandler,
        ListAllIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
