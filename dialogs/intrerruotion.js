const { InputHints } = require("botbuilder");
const { ComponentDialog, DialogTurnStatus } = require("botbuilder-dialogs");
const {
  BOOKING_STATUS_DIALOG,
  TICKET_CANCEL_DIALOG,
  CAROUSEL_BUTTON_DIALOG,
  TICKET_BOOKING_DIALOG,
  TRAVEL_DESTINATION_ENQUERY_DIALOG,
  WEATHER_STATUS_DIALOG,
} = require("../utilities/dialogIds");

class CancelAndHelpDialog extends ComponentDialog {
  async onContinueDialog(innerDc) {
    const result = await this.interrupt(innerDc);
    if (result) {
      return result;
    }
    return await super.onContinueDialog(innerDc);
  }
  async interrupt(innerDc) {
    if (innerDc.context.activity?.text) {
      // console.log("innerDc--->",innerDc.context.activity)
      const text = innerDc.context.activity.text.toLowerCase();
      switch (text) {
        case "help":
        case "?": {
          const helpMessageText = "Show help here";
          await innerDc.context.sendActivity(
            helpMessageText,
            helpMessageText,
            InputHints.ExpectingInput
          );
          return { status: DialogTurnStatus.waiting };
        }
        case "cancel":
        case "quit": {
          const cancelMessageText = "Cancelling...";
          await innerDc.context.sendActivity(
            cancelMessageText,
            cancelMessageText,
            InputHints.IgnoringInput
          );
          return await innerDc.cancelAllDialogs();
        }
      }
    }
    // Button Click interruption
    if (innerDc.context.activity?.value) {
      const button = innerDc.context.activity?.value;
      switch (button) {
        case "#bookTickets#":
          await innerDc.cancelAllDialogs();
          return innerDc.replaceDialog(TICKET_BOOKING_DIALOG);
        case "#ticketStatus#":
          await innerDc.cancelAllDialogs();
          return innerDc.replaceDialog(BOOKING_STATUS_DIALOG);
        case "#cancelTicket#":
          await innerDc.cancelAllDialogs();
          return innerDc.replaceDialog(TICKET_CANCEL_DIALOG);
        case "#travelDestinationEnquery#":
          await innerDc.cancelAllDialogs();
          return innerDc.replaceDialog(TRAVEL_DESTINATION_ENQUERY_DIALOG);
        case "#weatherStatus#":
          await innerDc.cancelAllDialogs();
          return innerDc.replaceDialog(WEATHER_STATUS_DIALOG);
        case "#moreCarousel#":
          await innerDc.cancelAllDialogs();
          return innerDc.replaceDialog(CAROUSEL_BUTTON_DIALOG);
      }
    }
  }
}
module.exports.CancelAndHelpDialog = CancelAndHelpDialog;
