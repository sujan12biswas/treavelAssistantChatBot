// const {
//     ComponentDialog,
//     WaterfallDialog,
//     NumberPrompt,
//   } = require("botbuilder-dialogs");
//   const {DEPARTURE_CITY_DIALOG,DepartureCity}=require('./departureCityDialog')
//   const { bookTicketProfile } = require("../../profile/bookTicketProfile");
//   const NO_OF_TICKETS_DIALOG = "noOfTicketDialog";
//   const WATERFALL_DIALOG_3 = "waterfallDialog3";
//   const NUMBER_PROMPT = "numberPrompt";
//   const {CancelAndHelpDialog} = require('../intrerruotion')
  
//   class NumberOfTicketsDialog extends CancelAndHelpDialog {
//     constructor() {
//       super(NO_OF_TICKETS_DIALOG);
//       this.count = 0;
//       this.addDialog(new NumberPrompt(NUMBER_PROMPT));
//       this.addDialog(new DepartureCity());
//       this.addDialog(
//         new WaterfallDialog(WATERFALL_DIALOG_3, [
//           this.getNumberOfTicket.bind(this),
//           this.numberOfTicketValidation.bind(this),
//           this.endStep.bind(this),
//         ])
//       );
//       this.initialDialogId = WATERFALL_DIALOG_3;
//     }
//     // take number of tickets
//     async getNumberOfTicket(stepContext) {
//       try {
//         console.log("This is from getNumberOfTicket");
//         if (bookTicketProfile.numberOfTickets) {
//           return stepContext.next();
//         } else {
//           // if entered input is a number 
//           const textMessage = "How many tickets you want to book?";
//           return await stepContext.prompt(NUMBER_PROMPT, textMessage);
//           //else prompt a card with the message "you have asked for "{userinput}". Would you like to switch the flow"
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // validate number of tickets
//     async numberOfTicketValidation(stepContext) {
//       try {
//         if (!bookTicketProfile.numberOfTickets) {
//             bookTicketProfile.numberOfTickets = stepContext.result;
//         }   
//         const regexName = /^(?:[1-9]|10)$/;
//         if (regexName.test(bookTicketProfile.numberOfTickets)) {
//           return await stepContext.beginDialog(DEPARTURE_CITY_DIALOG);
//         } else {
//           this.count++;
//           if (this.count >= 2) {
//             await stepContext.context.sendActivity("Send hi to start again");
//             bookTicketProfile.name = "";
//             this.count = 0;
//             return await stepContext.cancelAllDialogs();
//           }
//             bookTicketProfile.numberOfTickets = null;
//           await stepContext.context.sendActivity("You can book maximum 10 tickets :)");
//           return await stepContext.beginDialog(WATERFALL_DIALOG_3);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     async endStep(stepContext) {
//       return stepContext.endDialog();
//     }
//   }
//   module.exports.NumberOfTicketsDialog = NumberOfTicketsDialog;
//   module.exports.NO_OF_TICKETS_DIALOG = NO_OF_TICKETS_DIALOG;
  