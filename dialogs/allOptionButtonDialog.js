
const {
  ComponentDialog,
  WaterfallDialog,
  TextPrompt,
  Dialog,
} = require("botbuilder-dialogs");
const { CardFactory, ActivityTypes , MessageFactory} = require("botbuilder");
const { allOptionCard } = require("../adaptiveCards/allOptionsCard");
const {
  BookingStatusDialog,
} = require("./BookingStatusDialog/bookingStatusDialog");
const {
  CancelTicketDialog,
} = require("./cancelTicket/cancelTickets");
const {
  TravelDestinationEnquery,
} = require("./travelDestinationEnquery/travelDestinationEnquery");
const {
  WeatherStatusDialog,
} = require("./weatherStatus/weatherStatus");
const { genericCarouselButtons } = require("../facebookButtons/allOptionButtons");
// const ALL_OPTIONS_BUTTON_DIALOG = "ALL_OPTIONS_BUTTON_DIALOG";
const {ALL_OPTIONS_BUTTON_DIALOG,BOOKING_STATUS_DIALOG,TICKET_CANCEL_DIALOG,CAROUSEL_BUTTON_DIALOG,TICKET_BOOKING_DIALOG,TRAVEL_DESTINATION_ENQUERY_DIALOG,WEATHER_STATUS_DIALOG} = require('../utilities/dialogIds')
const WATERFALL_DIALOG_14 = "waterfallDialog14";
const TEXT_PROMPT = "textPrompt";
const {TicketBookingDialog} = require('./ticketBookingDialogs/travelBookingDialog')
const {CancelAndHelpDialog} = require('./intrerruotion')
const {CarouselButtonDialog} = require('./carouselDialog/carouselButtonDialog')
// const {NAME_DIALOG,NameDialog} = require('./ticketBookingDialogs/nameDialog')
class AllOptionsDialogDialog extends ComponentDialog {
  constructor(conversationState, userState) {
    super(ALL_OPTIONS_BUTTON_DIALOG);
    if (!conversationState) throw Error("Conversation State Required");
    if (!userState) throw Error("Conversation User Required");
    this.conversationState = conversationState;
    this.userState = userState;
    this.addDialog(new TextPrompt(TEXT_PROMPT));
    this.addDialog(new BookingStatusDialog(this.conversationState,this.userState));
    this.addDialog(new TicketBookingDialog(this.conversationState,this.userState));
    this.addDialog(new CancelTicketDialog(this.conversationState,this.userState));
    this.addDialog(new WeatherStatusDialog(this.conversationState,this.userState));
    this.addDialog(new TravelDestinationEnquery(this.conversationState,this.userState));
    this.addDialog(new CarouselButtonDialog(this.conversationState,this.userState));
    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG_14, [
        this.getButton.bind(this),
        this.chooseButton.bind(this),
        this.endStep.bind(this),
      ])
    );
    this.initialDialogId = WATERFALL_DIALOG_14;
  }
  // get a clicked button
  async getButton(stepContext) {
    try {
      console.log('inside main dialog')
      const button = stepContext.context.activity?.value;

      if(button){
        return await stepContext.next()
      }
      let genericCard = await genericCarouselButtons()
      console.log("generic Carouse", genericCard)
      console.log("elements------>",genericCard.attachment.payload.elements)
      await stepContext.context.sendActivity({
        text: "",
        channelData:genericCard,
        type: "message",
      });
      return Dialog.EndOfTurn;
    } catch (error) {
      console.log(error);
    }
  }
  //Chose button
  async chooseButton(stepContext) {
    try {
      console.log("Hello",stepContext.context.activity?.value);
      const button = await stepContext.context.activity?.value;
      console.log("hi..",button);
      switch (button) {
        case "#bookTickets#":
          console.log("hi..",button);
          return await stepContext.replaceDialog(TICKET_BOOKING_DIALOG);
        case "#ticketStatus#":
          return await stepContext.replaceDialog(BOOKING_STATUS_DIALOG);
        case "#cancelTicket#":
          return await stepContext.replaceDialog(TICKET_CANCEL_DIALOG);
        case "#travelDestinationEnquery#":
          return await stepContext.replaceDialog(TRAVEL_DESTINATION_ENQUERY_DIALOG);
        case "#weatherStatus#":
          return await stepContext.replaceDialog(WEATHER_STATUS_DIALOG);
        case "#moreCarousel#":
          return await stepContext.replaceDialog(CAROUSEL_BUTTON_DIALOG);
        default: 
          return await stepContext.replaceDialog(WATERFALL_DIALOG_14);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async endStep(stepContext) {
    return await stepContext.endDialog();
  }
}
module.exports.AllOptionsDialogDialog = AllOptionsDialogDialog;

