// const {
//   ComponentDialog,
//   WaterfallDialog,
//   TextPrompt,
// } = require("botbuilder-dialogs");
// const { default: axios } = require("axios");
// const { CardFactory } = require("botbuilder");
// const { url, config, getData } = require("../../QuestionAnswering/storeTheQA");
// const { faqCard } = require("../../adaptiveCards/faqCard");
// // const ASK_FAQ_DIALOG = "askFAQDialog";
// const {ASK_FAQ_DIALOG} = require('../../utilities/dialogIds')
// const {} = require
// const WATERFALL_DIALOG_15 = "waterfallDialog15";
// const TEXT_PROMPT = "textPrompt";

// class AskFAQDialog extends ComponentDialog {
//   constructor() {
//     super(ASK_FAQ_DIALOG);
//     this.addDialog(new TextPrompt(TEXT_PROMPT));
//     this.addDialog(
//       new WaterfallDialog(WATERFALL_DIALOG_15, [
//         this.getFAQ.bind(this),
//         this.getFAQAnswer.bind(this),
//         this.takeChoise.bind(this),
//         this.endStep.bind(this),
//       ])
//     );
//     this.initialDialogId = WATERFALL_DIALOG_15;
//   }
//   //Ask query of user
//   async getFAQ(stepContext) {
//     try {
//       const textMessage = "Please ask any FAQ related to Travel?";
//       return await stepContext.prompt(TEXT_PROMPT, textMessage);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   //Give naswer according to the query
//   async getFAQAnswer(stepContext) {
//     try {
//       // console.log("Hi...");
//       const userText = await stepContext.result;
//       const data = getData(userText); //Using the axios to fetch the Question Answering
//       await axios.post(url, data, config).then(async (response) => {
//         if (response.data?.answers[0]?.confidenceScore >= 0.5) { //If the confidence score is more than 50% then proced
//           stepContext.context.sendActivity(response.data?.answers[0]?.answer);
//           return await stepContext.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(await faqCard())],
//           });
//         } else {
//           await stepContext.context.sendActivity("Answer not Found");
//           return await stepContext.context.sendActivity({
//             attachments: [CardFactory.adaptiveCard(await faqCard())],
//           });
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async takeChoise(stepContext) { 
//     // get the clicked botton
//     const button = stepContext.context.activity?.value?.action;
//     if (button == "askFAQ") {
//       return await stepContext.replaceDialog(WATERFALL_DIALOG_15);
//     } else if (button == "cancel") {
//       return await stepContext.next();
//     }
//     return await stepContext.next();
//   }
//   async endStep(stepContext) {
//     await stepContext.context.sendActivity("Thank you");
//     return await stepContext.endDialog();
//   }
// }
// module.exports.AskFAQDialog = AskFAQDialog;
