const {
  ComponentDialog,
  WaterfallDialog,
} = require("botbuilder-dialogs");
// const TRAVEL_DESTINATION_ENQUERY_DIALOG = "TravelDestinationEnquery"
const {TRAVEL_DESTINATION_ENQUERY_DIALOG,CONVERSATION_DATA_PROPERTY,USER_PROFILE_PROPERTY} = require('../../utilities/dialogIds')
const WATERFALL_DIALOG_15 = "waterfallDialog15";
const {CancelAndHelpDialog} = require('../intrerruotion')
// const {ALL_OPTIONS_BUTTON_DIALOG,AllOptionsDialogDialog} = require('../allOptionButtonDialog')

class TravelDestinationEnquery extends CancelAndHelpDialog {
  constructor(conversationState,userState) {
    super(TRAVEL_DESTINATION_ENQUERY_DIALOG);
    if (!conversationState) throw Error("Conversation State Required");
    if (!userState) throw Error("Conversation User Required");
    this.conversationState = conversationState;
    this.userState = userState;
    // this.addDialog(new AllOptionsDialogDialog());
    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG_15, [
        this.travelEnquery.bind(this),
        this.endStep.bind(this),
      ])
    );
    this.initialDialogId = WATERFALL_DIALOG_15;
  }
  async travelEnquery(stepContext) {
    try {
      return await stepContext.context.sendActivity("This section will be updated sooon :)");
      // return stepContext.replaceDialog(ALL_OPTIONS_BUTTON_DIALOG);
    } catch (error) {
      console.log(error);
    }
  }
  async endStep(stepContext) {
    return await stepContext.endDialog();
  }
}
module.exports.TravelDestinationEnquery = TravelDestinationEnquery;
