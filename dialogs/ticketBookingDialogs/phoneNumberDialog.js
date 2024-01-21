// const {
//     ComponentDialog,
//     WaterfallDialog,
//     NumberPrompt,
//   } = require("botbuilder-dialogs");
//   const {EMAIL_ID_DIALOG,EmailDialog}=require('./emailAddressDialog')
//   const { bookTicketProfile } = require("../../profile/bookTicketProfile");
//   const PHONE_NUMBER_DIALOG = "phoneNumberDialog";
//   const WATERFALL_DIALOG_4 = "waterfallDialog4";
//   const NUMBER_PROMPT = "numberPrompt"; 
//   const {CancelAndHelpDialog} = require('../intrerruotion')
//   class PhoneNumberDialog extends CancelAndHelpDialog {
//     constructor() {
//       super(PHONE_NUMBER_DIALOG);
//       this.count = 0;
//       this.addDialog(new NumberPrompt(NUMBER_PROMPT));
//       this.addDialog(new EmailDialog());
//       this.addDialog(
//         new WaterfallDialog(WATERFALL_DIALOG_4, [
//           this.getPhoneNumber.bind(this),
//           this.phoneNumberPhoneNumberValidation.bind(this),
//           this.endStep.bind(this),
//         ])
//       );
//       this.initialDialogId = WATERFALL_DIALOG_4;
//     }
//     // Get phone Number
//     async getPhoneNumber(stepContext) {
//       try {
//         if (bookTicketProfile.phoneNumber) {           
//           return stepContext.next();
//         } else {
//             console.log("Hi.. fro phone number")
//           const textMessage = "What is your Mobile Number (10 digits only)?";
//           return await stepContext.prompt(NUMBER_PROMPT, textMessage);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // validate phone number
//     async phoneNumberPhoneNumberValidation(stepContext) {
//       try {
//         if (!bookTicketProfile.phoneNumber) {
//             bookTicketProfile.phoneNumber = stepContext.result;
//         }
//         const regexName = /^\d{10}$/;
//         if (regexName.test(bookTicketProfile.phoneNumber)) {
//           return await stepContext.beginDialog(EMAIL_ID_DIALOG);
//         } else {
//           this.count++;
//         if (this.count >= 2) {
//           await stepContext.context.sendActivity("Send hi to start again");
//           bookTicketProfile.name = "";
//           this.count = 0;
//           return await stepContext.cancelAllDialogs();
//         }
//             bookTicketProfile.phoneNumber = null;
//           await stepContext.context.sendActivity("Wrong Mobile Number :)");
//           return await stepContext.beginDialog(WATERFALL_DIALOG_4);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     async endStep(stepContext) {
//       return stepContext.endDialog();
//     }
//   }
//   module.exports.PhoneNumberDialog = PhoneNumberDialog;
//   module.exports.PHONE_NUMBER_DIALOG = PHONE_NUMBER_DIALOG;
  