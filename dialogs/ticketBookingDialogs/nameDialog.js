// const {
//   DialogSet,
//   DialogTurnStatus,
//   ComponentDialog,
//   WaterfallDialog,
//   TextPrompt,
// } = require("botbuilder-dialogs");
// const {
//   NumberOfTicketsDialog,
//   NO_OF_TICKETS_DIALOG,
// } = require("./noOfTicketsDialog");
// const { bookTicketProfile } = require("../../profile/bookTicketProfile");
// const NAME_DIALOG = "nameDialog";
// const WATERFALL_DIALOG_2 = "waterfallDialog2";
// const TEXT_PROMPT = "textPrompt";
// const { CancelAndHelpDialog } = require("../intrerruotion");
// // const { MAIN_DIALOG } = require("../mainDialog");
// // const {MAIN_DIALOG,MainDialog} = require('../mainDialog')

// class NameDialog extends CancelAndHelpDialog {
//   constructor() {
//     super(NAME_DIALOG);
//     this.count = 0;
//     // this.addDialog(new MainDialog());
//     this.addDialog(new TextPrompt(TEXT_PROMPT));
//     this.addDialog(new NumberOfTicketsDialog());
//     // this.addDialog(new MainDialog());
//     this.addDialog(
//       new WaterfallDialog(WATERFALL_DIALOG_2, [
//         this.candidateName.bind(this),
//         this.nameValidation.bind(this),
//         this.endStep.bind(this),
//       ])
//     );
//     this.initialDialogId = WATERFALL_DIALOG_2;
//   }
//   // take input of username
//   async candidateName(stepContext) {
//     try {
//       console.log('inside name dialog step1', bookTicketProfile.name)
//       if (bookTicketProfile.name) {
//         return await stepContext.next();
//       } else {
//         const textMessage = "What is your Name?";
//         return await stepContext.prompt(TEXT_PROMPT, textMessage);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // validate the username
//   async nameValidation(stepContext) {
//     try {
//         console.log('inside validation step')
//         // const button = stepContext.context.activity?.value;
//         // if(!button){
//           if (!bookTicketProfile.name) {
//             bookTicketProfile.name = await stepContext.result;
//             console.log(bookTicketProfile.name);
//           }
//           const regexName = /^[A-Za-zÀ-ÿ\-']+(\s[A-Za-zÀ-ÿ\-']+)*$/; // validate the name by regex
//           if (regexName.test(bookTicketProfile.name)) {
//             return await stepContext.beginDialog(NO_OF_TICKETS_DIALOG);
//           } else {
//             this.count++;
//             if (this.count >= 2) {
//               // await stepContext.context.sendActivity("Send hi to start again");
//               bookTicketProfile.name = "";
//               this.count = 0;
//               return await stepContext.cancelAllDialogs();
//             }
//             bookTicketProfile.name = "";
//             await stepContext.context.sendActivity("Please enter a valid name :)");
//             return await stepContext.beginDialog(WATERFALL_DIALOG_2);
//           }
//         // }else{
//         //   stepContext.replaceDialog(ALL_OPTIONS_BUTTON_DIALOG);
//         // }
        
      
      
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   async endStep(stepContext) {
//     return await stepContext.endDialog();
//   }
//   async run() {
//     try {
//       // const dialogSet = new DialogSet(accessor);
//       // dialogSet.add(this);
//       // const dialogContext = await dialogSet.createContext(context);
//       // const results = await dialogContext.continueDialog();
//       // if (results.status === DialogTurnStatus.empty) {
//       //   await dialogContext.beginDialog(this.id);
//       // }
//       console.log("hi");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
// module.exports.NameDialog = NameDialog;

// module.exports.NAME_DIALOG = NAME_DIALOG;
