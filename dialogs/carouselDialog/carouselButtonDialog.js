const {
  ComponentDialog,
  WaterfallDialog,
  TextPrompt,
  Dialog,
} = require("botbuilder-dialogs");
const {
  TICKET_BOOKING_DIALOG,
  BOOKING_STATUS_DIALOG,
  TICKET_CANCEL_DIALOG,
  CAROUSEL_BUTTON_DIALOG,
  CONVERSATION_DATA_PROPERTY,
  USER_PROFILE_PROPERTY,
} = require("../../utilities/dialogIds");
// const CAROUSEL_BUTTON_DIALOG = "CAROUSEL_BUTTON_DIALOG";
const WATERFALL_DIALOG_2 = "waterfallDialog2";
const TEXT_PROMPT = "textPrompt";
const { CancelAndHelpDialog } = require("../intrerruotion");
const {
  genericCarouselButtons,
} = require("../../facebookButtons/carouselButtons");
const {
  TicketBookingDialog,
} = require("../ticketBookingDialogs/travelBookingDialog");
const {
  BookingStatusDialog,
} = require("../BookingStatusDialog/bookingStatusDialog");
const { CancelTicketDialog } = require("../cancelTicket/cancelTickets");
class CarouselButtonDialog extends CancelAndHelpDialog {
  constructor(conversationState, userState) {
    super(CAROUSEL_BUTTON_DIALOG);
    if (!conversationState) throw Error("Conversation State Required");
    if (!userState) throw Error("Conversation User Required");
    this.conversationState = conversationState;
    this.userState = userState;
    this.count = 0;
    // this.addDialog(new MainDialog());
    this.addDialog(new TextPrompt(TEXT_PROMPT));
    this.addDialog(new TicketBookingDialog(this.conversationState,this.userState));
    this.addDialog(new BookingStatusDialog(this.conversationState,this.userState));
    this.addDialog(new CancelTicketDialog(this.conversationState,this.userState));
    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG_2, [
        this.showCarousel.bind(this),
        this.chooseOptions.bind(this),
        this.endStep.bind(this),
      ])
    );
    this.initialDialogId = WATERFALL_DIALOG_2;
  }
  //This will show the Carousel Buttons
  async showCarousel(stepContext) {
    try {
      const genericCarousal = await genericCarouselButtons();
      console.log(">>>>>>36");
      await stepContext.context.sendActivity({
        text: "",
        // channelData: carouselCard,
        channelData: genericCarousal,
        type: "message",
      });
      return Dialog.EndOfTurn;
    } catch (error) {
      console.log(error);
    } 
  }
  //User will choose a button
  async chooseOptions(stepContext) {
    try {
      const button = await stepContext.context.activity?.value;
      console.log("hi..", button);
      switch (button) {
        case "bookTickets":
          console.log("hi..", button);
          return await stepContext.beginDialog(TICKET_BOOKING_DIALOG);
        case "ticketStatus":
          return await stepContext.beginDialog(BOOKING_STATUS_DIALOG);
        case "cancelTicket":
          return await stepContext.beginDialog(TICKET_CANCEL_DIALOG);
        default:
          return await stepContext.replaceDialog(CAROUSEL_BUTTON_DIALOG);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async endStep(stepContext) {
    return await stepContext.endDialog();
  }
}
module.exports.CarouselButtonDialog = CarouselButtonDialog;
