// const {
//     ComponentDialog,
//     WaterfallDialog,
//     TextPrompt,
//   } = require("botbuilder-dialogs");
//   const { DESTINATION_CITY_DIALOG,DestinationCity  } = require("./destinationCityDialog");
//   const { bookTicketProfile } = require("../../profile/bookTicketProfile");
//   const {findCityByName} = require('../../database/cityNameModel')
//   const DEPARTURE_CITY_DIALOG = "departureCityDialog";
//   const WATERFALL_DIALOG_3 = "waterfallDialog3";
//   const TEXT_PROMPT = "textPrompt";
//   const {CancelAndHelpDialog} = require('../intrerruotion')

//   class DepartureCity extends CancelAndHelpDialog {
//     constructor() {
//       super(DEPARTURE_CITY_DIALOG);
//       this.count = 0;
//       this.addDialog(new TextPrompt(TEXT_PROMPT));
//       this.addDialog(new DestinationCity());
//       this.addDialog(
//         new WaterfallDialog(WATERFALL_DIALOG_3, [
//           this.departureCityName.bind(this),
//           this.departureCityValidation.bind(this),
//           this.endStep.bind(this),
//         ])
//       );
//       this.initialDialogId = WATERFALL_DIALOG_3;
//     }
//     // get diparture City
//     async departureCityName(stepContext) {
//       try {
//         //If already get the departure city by clu 
//         if (bookTicketProfile.departureCity) {
//           return await stepContext.next();
//         } else {
//           //else ask the name of departure city
//           const textMessage = "What is your departure city?";
//           return await stepContext.prompt(TEXT_PROMPT, textMessage);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // validate the diparture City
//     async departureCityValidation(stepContext) {
//       try {
//         if (!bookTicketProfile.departureCity) {
//             bookTicketProfile.departureCity = await stepContext.result;
//         }
//         if(await findCityByName(bookTicketProfile.departureCity)){
//           return await stepContext.beginDialog(DESTINATION_CITY_DIALOG);
//         }
//          else {
//           this.count++;
//         if (this.count >= 2) {
//           await stepContext.context.sendActivity("Send hi to start again");
//           bookTicketProfile.name = "";
//           this.count = 0;
//           return await stepContext.cancelAllDialogs();
//         }
//           //else re-ask the question
//             bookTicketProfile.departureCity = "";
//           await stepContext.context.sendActivity("Please enter a valid departure city :)");
//           return await stepContext.beginDialog(WATERFALL_DIALOG_3);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     async endStep(stepContext) {
//       return await stepContext.endDialog();
//     }
//   }
//   module.exports.DepartureCity = DepartureCity;
//   module.exports.DEPARTURE_CITY_DIALOG = DEPARTURE_CITY_DIALOG;
  