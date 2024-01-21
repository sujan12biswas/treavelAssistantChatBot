// const {
//   ComponentDialog,
//   WaterfallDialog,
//   TextPrompt,
// } = require("botbuilder-dialogs");
// const {
//   PHONE_NUMBER_DIALOG,
//   PhoneNumberDialog,
// } = require("./phoneNumberDialog");
// const {
//   bookTicketProfile,
// } = require("../../profile/bookTicketProfile");
// const { convertDateStringToDate } = require("../../stringToDate/date");
// const DATE_DIALOG = "dateCityDialog";
// const WATERFALL_DIALOG_5 = "waterfallDialog5";
// const TEXT_PROMPT = "textPrompt";
// const {CancelAndHelpDialog} = require('../intrerruotion')
// const {PAYMENT_DIALOG,PaymentDialog} = require('./paymentDialog')
// class DateDialog extends CancelAndHelpDialog {
//   constructor() {
//     super(DATE_DIALOG);
//     this.count = 0;
//     this.addDialog(new TextPrompt(TEXT_PROMPT));
//     this.addDialog(new PaymentDialog());
//     this.addDialog(
//       new WaterfallDialog(WATERFALL_DIALOG_5, [
//         this.inputDate.bind(this),
//         this.dateValidation.bind(this),
//         this.endStep.bind(this),
//       ])
//     );
//     this.initialDialogId = WATERFALL_DIALOG_5;
//   }
//   // take input of date
//   async inputDate(stepContext) {
//     try {
//       //If already get the date by clu 
//       if (bookTicketProfile.date) {
//         return await stepContext.next();
//       } else {
//         // else ask the date
//         const textMessage = "In which date you want to travel (yyyy-mm-dd)?";
//         return await stepContext.prompt(TEXT_PROMPT, textMessage);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // validate the date
//   async dateValidation(stepContext) {
//     try {
//       if (!bookTicketProfile.date) {
//         //date validation
//         bookTicketProfile.date = convertDateStringToDate(
//           await stepContext.result
//         );
//       }
//       //if date is validated 
//       if (bookTicketProfile.date != null) {
//         return await stepContext.beginDialog(PAYMENT_DIALOG);
//       } else {
//         this.count++;
//         if (this.count >= 2) {
//           await stepContext.context.sendActivity("Send hi to start again");
//           bookTicketProfile.name = "";
//           this.count = 0;
//           return await stepContext.cancelAllDialogs();
//         }
//         //else ask for a valid date
//         bookTicketProfile.date = null;
//         await stepContext.context.sendActivity(
//           "Please enter a valid date in (yyyy-mm-dd) format :)"
//         );
//         return await stepContext.beginDialog(WATERFALL_DIALOG_5);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async endStep(stepContext) {
//     return await stepContext.endDialog();
//   }
// }
// module.exports.DateDialog = DateDialog;
// module.exports.DATE_DIALOG = DATE_DIALOG;
