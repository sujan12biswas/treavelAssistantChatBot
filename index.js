const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {CloudAdapter, ConversationState, UserState,
    MemoryStorage, ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration} = require('botbuilder')
const port = 3000;
app.use(bodyParser.json());
const {Bot} = require('./bots/bot');
const {MainDialog} = require('./dialogs/mainDialog');
//Using MemoryStorage
const memoryStorage = new MemoryStorage;
const userState = new UserState(MemoryStorage);
const conversationState = new ConversationState(memoryStorage);
const credentialFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: '7d6fc59c-95be-493e-bcb3-3d66cc61fb2d',
    MicrosoftAppPassword: 'd1E8Q~5m3Y6AvvStrQYiDX~JjJ6YSk4ll9bqOcKe',
})
// const credentialFactory = new ConfigurationServiceClientCredentialFactory({
//     MicrosoftAppId: 'f1fc130c-eccf-45d0-ac3c-dbcc8bf3e499',
//     MicrosoftAppPassword: 'IIX8Q~kLCDaDR6VUEFvTaFokEWsH79XJOFxNaceN',
// })
const botFramworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(null, credentialFactory);
//Creating a new instance of adapter
const adapter = new CloudAdapter(botFramworkAuthentication);
//Error Handeling
const handelingError = (context, err)=>{
    try{
        console.log(err);
        context.sendActivity("This bot is facing an error");        
    } catch(error){
        console.log(error);
    }
}
adapter.onTurnError = handelingError;
const mainDialog = new MainDialog(conversationState,userState);
const bot = new Bot(conversationState,userState, mainDialog );
//Creating end point
app.post('/api/messages',async(req,res)=>{
    try {
        await adapter.process(req,res,(context)=> bot.run(context));
    } catch (error) {
        console.log(error)
    }
})
app.listen(port,()=>{
    console.log(`The server is listening on port ${port}`);
})
