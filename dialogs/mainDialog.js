const {
  ComponentDialog,
  WaterfallDialog,
  DialogSet,
  DialogTurnStatus,
  Dialog,
} = require("botbuilder-dialogs");

// const MAIN_DIALOG = "mainDialog";
const WATERFALL_DIALOG_1 = "waterfallDialog1";
const {AllOptionsDialogDialog} = require('./allOptionButtonDialog')
const {MAIN_DIALOG,ALL_OPTIONS_BUTTON_DIALOG} = require('../utilities/dialogIds')


//This is the main Dilog
class MainDialog extends ComponentDialog {
  constructor(conversationState,userState) {
    super(MAIN_DIALOG);
    if (!conversationState) throw Error("Conversation State Required");
    if (!userState) throw Error("Conversation User Required");
    this.conversationState = conversationState;
    this.userState = userState;
    this.addDialog(new AllOptionsDialogDialog(this.conversationState, this.userState));
    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG_1, [
        this.getCLUandQA.bind(this),
        this.endFunction.bind(this),
      ])
    );

    //Initial Dialog ID
    this.initialDialogId = WATERFALL_DIALOG_1;
  }
  //Get the intent and intities from CLU
  async getCLUandQA(stepContext) {
        return await stepContext.beginDialog(ALL_OPTIONS_BUTTON_DIALOG);
  }
  async endFunction(stepContext) {
    await stepContext.context.sendActivity("Thank you... Send hi to start again");
    return await stepContext.endDialog();
  }
  //combined all the dialogs
  async run(context, accessor) {
    try {
      const dialogSet = new DialogSet(accessor);
      dialogSet.add(this);
      const dialogContext = await dialogSet.createContext(context);
      const results = await dialogContext.continueDialog();
      if (results.status === DialogTurnStatus.empty) {
        await dialogContext.beginDialog(this.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports.MainDialog = MainDialog;
