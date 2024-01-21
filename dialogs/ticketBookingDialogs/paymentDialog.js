// const {
//   ComponentDialog,
//   WaterfallDialog,
//   Dialog,
// } = require("botbuilder-dialogs");
// const { CardFactory } = require("botbuilder");
// const { paymentCard2 } = require("../../adaptiveCards/paymentCard");
// const { bookTicketProfile } = require("../../profile/bookTicketProfile");
// const {
//   paymentProcessProfile,
// } = require("../../profile/paymentProcessProfile");
// const { generateID } = require("../../generateID/id");
// //   const { NumberOfTicketsDialog, NO_OF_TICKETS_DIALOG } = require("./noOfTicketsDialog");
// const db = require("../../database/db");
// const { createUser } = require("../../database/crud");
// const PAYMENT_DIALOG = "paymentDialog";
// const WATERFALL_DIALOG_9 = "waterfallDialog9";
// const {CancelAndHelpDialog} = require('../intrerruotion')

// class PaymentDialog extends CancelAndHelpDialog {
//   constructor() {
//     super(PAYMENT_DIALOG);
//     //   this.addDialog(new NumberOfTicketsDialog());//
//     this.addDialog(
//       new WaterfallDialog(WATERFALL_DIALOG_9, [
//         // this.showPaymentCard.bind(this),
//         // this.getPaymentDetails.bind(this),
//         // this.validateCardholderName.bind(this),
//         // this.validateCardNumber.bind(this),
//         // this.validateExpireMonth.bind(this),
//         // this.validateExpireYear.bind(this),
//         // this.validateCVV.bind(this),
//         this.storeInDataBase.bind(this),
//       ])
//     );
//     this.initialDialogId = WATERFALL_DIALOG_9;
//   }
//   // Show Payment Card
//   async showPaymentCard(stepContext) {
//     try {
//       await stepContext.context.sendActivity({
//         attachments: [CardFactory.adaptiveCard(await paymentCard2())],
//       });
//       Dialog.EndOfTurn;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   //Get payment Details
//   async getPaymentDetails(stepContext) {
//     try {
//       //Get all the values of adaptive card and store 
//       const paymentDetails = await stepContext.context?.activity?.value;
//       console.log("Payment Details :",paymentDetails);
//       paymentProcessProfile.cardholderName = paymentDetails.cardholderName;
//       paymentProcessProfile.cardNumber = paymentDetails.cardNumber;
//       paymentProcessProfile.expireYear = paymentDetails.year;
//       paymentProcessProfile.expireMonth = paymentDetails.month;
//       paymentProcessProfile.cvv = paymentDetails.cvv;
//       console.log(paymentProcessProfile);
//       return stepContext.next();
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // valid the card holder name
//   async validateCardholderName(stepContext) {
//     try {
//       const regexName = /^[A-Za-zÀ-ÿ\-']+(\s[A-Za-zÀ-ÿ\-']+)*$/;
//       if (regexName.test(paymentProcessProfile.cardholderName)) {
//         return await stepContext.next();
//       } else {
//         bookTicketProfile.cardholderName = "";
//         await stepContext.context.sendActivity("Please enter a valid name :)");
//         return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // valid the card number
//   async validateCardNumber(stepContext) {
//     const intCardNumber = parseInt(paymentProcessProfile.cardNumber);
//     if (!isNaN(intCardNumber)) {
//       const regexName = /^\d{16}$/;
//       if (regexName.test(paymentProcessProfile.cardNumber)) {
//         return await stepContext.next();
//       } else {
//         bookTicketProfile.cardNumber = null;
//         await stepContext.context.sendActivity(
//           "Please enter a valid 16 digits card number  :)"
//         );
//         return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//       }
//     } else {
//       await stepContext.context.sendActivity(
//         "Please enter a valid 16 digits card number :)"
//       );
//       return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//     }
//   }
//   // validate expire month
//   async validateExpireMonth(stepContext) {
//     const intExpMonth = parseInt(paymentProcessProfile.expireMonth);
//     if (!isNaN(intExpMonth)) {
//       const regexName = /^(?:[1-9]|1[0-2])$/;
//       if (regexName.test(paymentProcessProfile.expireMonth)) {
//         return await stepContext.next();
//       } else {
//         bookTicketProfile.expireMonth = null;
//         await stepContext.context.sendActivity(
//           "Please enter a valid Month  :)"
//         );
//         return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//       }
//     } else {
//       await stepContext.context.sendActivity("Please enter a valid Month :)");
//       return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//     }
//   }
//   //validate expire year
//   async validateExpireYear(stepContext) {
//     const intExpYear = parseInt(paymentProcessProfile.expireYear);
//     if (!isNaN(intExpYear)) {
//       const regexName = /^(202[3-9]|20[3-4][0-9]|205[0-3])$/; // regex of 2023-2053
//       if (regexName.test(paymentProcessProfile.expireYear)) {
//         return await stepContext.next();
//       } else {
//         bookTicketProfile.expireYear = null;
//         await stepContext.context.sendActivity("Please enter a valid Year  :)");
//         return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//       }
//     } else {
//       await stepContext.context.sendActivity("Please enter a valid Year :)");
//       return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//     }
//   }
//   // validate CVV
//   async validateCVV(stepContext) {
//     const intValidCVV = parseInt(paymentProcessProfile.cvv);
//     if (!isNaN(intValidCVV)) {
//       const regexName = /^(?:[1-9][0-9]{2}|100)$/; // regex of 100-999
//       if (regexName.test(paymentProcessProfile.cvv)) {
//         return await stepContext.next();
//       } else {
//         bookTicketProfile.cvv = null;
//         await stepContext.context.sendActivity(
//           "Please enter a valid CVV of 3 digit  :)"
//         );
//         return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//       }
//     } else {
//       await stepContext.context.sendActivity(
//         "Please enter a valid CVV of 3 digit :)"
//       );
//       return await stepContext.replaceDialog(WATERFALL_DIALOG_9);
//     }
//   }
//   async storeInDataBase(stepContext) {
//     // console.log(await stepContext.context.activity.value.action);
//     // if ((await stepContext.context.activity.value.action) == "submit") {
//       //Generate a new ticket ID for the user
//       bookTicketProfile.ticketID = generateID();
//       bookTicketProfile.bookingStatus = true;
//       console.log(bookTicketProfile);
//       //Store everything in DataBase
//           // db;
//           try{
//           // Create a user
//           await createUser(
//             bookTicketProfile.name,
//             bookTicketProfile.numberOfTickets,
//             bookTicketProfile.departureCity,
//             bookTicketProfile.destinationCity,
//             bookTicketProfile.date,
//             bookTicketProfile.phoneNumber,
//             bookTicketProfile.emailAddress,
//             bookTicketProfile.ticketID,
//             bookTicketProfile.bookingStatus);
//         } 
//         catch(error){
//           console.log("Error: ",error);
//         }
//         finally {
//           console.log("Hello from db in payment method")
//           db.close();
//         }
      
//       await stepContext.context.sendActivity("You are done");
//       await stepContext.context.sendActivity(`Your TicketID id is: ${bookTicketProfile.ticketID}`);
//     // }

//     return await stepContext.endDialog();
//   }
// }
// module.exports.PaymentDialog = PaymentDialog;
// module.exports.PAYMENT_DIALOG = PAYMENT_DIALOG;
