// const {
//     ComponentDialog,
//     WaterfallDialog,
//     TextPrompt,
//   } = require("botbuilder-dialogs");
//   const { PAYMENT_DIALOG,PaymentDialog  } = require("./paymentDialog");
//   const { bookTicketProfile } = require("../../profile/bookTicketProfile");
//   const EMAIL_ID_DIALOG = "emailIdDialog";
//   const WATERFALL_DIALOG_7 = "waterfallDialog7";
//   const TEXT_PROMPT = "textPrompt";
//   const {CancelAndHelpDialog} = require('../intrerruotion')

//   class EmailDialog extends CancelAndHelpDialog {
//     constructor() {
//       super(EMAIL_ID_DIALOG);
//       this.count = 0;
//       this.addDialog(new TextPrompt(TEXT_PROMPT));
//       this.addDialog(new PaymentDialog());
//       this.addDialog(
//         new WaterfallDialog(WATERFALL_DIALOG_7, [
//           this.getEmailId.bind(this),
//           this.emailIdValidation.bind(this),
//           this.endStep.bind(this),
//         ])
//       );
//       this.initialDialogId = WATERFALL_DIALOG_7;
//     }
//     // take input of email Id
//     async getEmailId(stepContext) {
//       try {
        
//         if (bookTicketProfile.emailAddress) {
//           return await stepContext.next();
//         } else {
//           const textMessage = "What is your email ID?";
//           return await stepContext.prompt(TEXT_PROMPT, textMessage);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // validate the email Id
//     async emailIdValidation(stepContext) {
//       try {
        
//         if (!bookTicketProfile.emailAddress) {
//             bookTicketProfile.emailAddress = await stepContext.result;
//             console.log(bookTicketProfile.emailAddress)
//         }
//         const regexName = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // vallidate email by regex
//         if (regexName.test(bookTicketProfile.emailAddress)) {
//           return await stepContext.beginDialog(PAYMENT_DIALOG);
//         } else {
//           this.count++;
//           if (this.count >= 2) {
//             await stepContext.context.sendActivity("Send hi to start again");
//             bookTicketProfile.name = "";
//             this.count = 0;
//             return await stepContext.cancelAllDialogs();
//           }
//             bookTicketProfile.emailAddress = "";
//           await stepContext.context.sendActivity("Please enter a valid email ID :)");
//           return await stepContext.beginDialog(WATERFALL_DIALOG_7);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     async endStep(stepContext) {
//       return await stepContext.endDialog();
//     }
//     async run(context, accessor) {
//       try {
//         const dialogSet = new DialogSet(accessor);
//         dialogSet.add(this);
//         const dialogContext = await dialogSet.createContext(context);
//         const results = await dialogContext.continueDialog();
//         if (results.status === DialogTurnStatus.empty) {
//           await dialogContext.beginDialog(this.id);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
//   module.exports.EmailDialog = EmailDialog;
//   module.exports.EMAIL_ID_DIALOG = EMAIL_ID_DIALOG;
  