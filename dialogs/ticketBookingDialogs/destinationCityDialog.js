// const {
//     ComponentDialog,
//     WaterfallDialog,
//     TextPrompt,
//   } = require("botbuilder-dialogs");
//   const { DATE_DIALOG,DateDialog  } = require("./dateDialog");
//   const { bookTicketProfile } = require("../../profile/bookTicketProfile");
//   const {findCityByName} = require("../../database/cityNameModel")
//   const DESTINATION_CITY_DIALOG = "destinationCityDialog";
//   const WATERFALL_DIALOG_4 = "waterfallDialog4";
//   const TEXT_PROMPT = "textPrompt";
//   const {CancelAndHelpDialog} = require('../intrerruotion')
//   class DestinationCity extends CancelAndHelpDialog {
//     constructor() {
//       super(DESTINATION_CITY_DIALOG);
//       this.count = 0 ;
//       this.addDialog(new TextPrompt(TEXT_PROMPT));
//       this.addDialog(new DateDialog());
//       this.addDialog(
//         new WaterfallDialog(WATERFALL_DIALOG_4, [
//           this.departureCityName.bind(this),
//           this.departureCityValidation.bind(this),
//           this.endStep.bind(this),
//         ])
//       );
//       this.initialDialogId = WATERFALL_DIALOG_4;
//     }
//     // take input of destination City
//     async departureCityName(stepContext) {
//       try {
        
//         if (bookTicketProfile.destinationCity) {
//           return await stepContext.next();
//         } else {
//           const textMessage = "What is your arrival city?";
//           return await stepContext.prompt(TEXT_PROMPT, textMessage);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // validate the destination City
//     async departureCityValidation(stepContext) {
//       try {
        
//         if (!bookTicketProfile.destinationCity) {
//             bookTicketProfile.destinationCity = await stepContext.result;
//             // console.log(bookTicketProfile.departureCity)
//         }
//         if(await findCityByName(bookTicketProfile.destinationCity) && bookTicketProfile.departureCity.toLowerCase() != bookTicketProfile.destinationCity.toLowerCase() ){
//           return await stepContext.beginDialog(DATE_DIALOG);
//         }
//         else {
//           this.count++;
//           if (this.count >= 2) {
//             await stepContext.context.sendActivity("Send hi to start again");
//             bookTicketProfile.name = "";
//             this.count = 0;
//             return await stepContext.cancelAllDialogs();
//           }
//             bookTicketProfile.destinationCity = "";
//           await stepContext.context.sendActivity("Please enter a valid arrival city :)");
//           return await stepContext.beginDialog(WATERFALL_DIALOG_4);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     async endStep(stepContext) {
//       return await stepContext.endDialog();
//     }
//   }
//   module.exports.DestinationCity = DestinationCity;
//   module.exports.DESTINATION_CITY_DIALOG = DESTINATION_CITY_DIALOG;
  