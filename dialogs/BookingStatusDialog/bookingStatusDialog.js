const {
  ComponentDialog,
  WaterfallDialog,
  TextPrompt,
} = require("botbuilder-dialogs");
const { db } = require("../../database/db");
const { findUserByTicketID,showUserByTicketID } = require("../../database/crud");
const { bookTicketProfile } = require("../../profile/bookTicketProfile");
const {BOOKING_STATUS_DIALOG, CONVERSATION_DATA_PROPERTY, USER_PROFILE_PROPERTY} = require('../../utilities/dialogIds');
// const BOOKING_STATUS_DIALOG = "bookingStatusDialog";
const WATERFALL_DIALOG_9 = "waterfallDialog9";
const TEXT_PROMPT = "textPrompt";
const {CancelAndHelpDialog} = require('../intrerruotion')
const {Profile} = require('../../profile/userProfile')
class BookingStatusDialog extends CancelAndHelpDialog {
  constructor(conversationState,userState) {
    super(BOOKING_STATUS_DIALOG);
    if (!conversationState) throw Error("Conversation State Required");
    if (!userState) throw Error("Conversation User Required");
    this.conversationState = conversationState;
    this.userState = userState;
    this.conversationDataAccessor = this.conversationState.createProperty(
      CONVERSATION_DATA_PROPERTY
    );
    this.userProfileAccessor = this.userState.createProperty(
      USER_PROFILE_PROPERTY
    );
    this.count = 0;
    this.addDialog(new TextPrompt(TEXT_PROMPT));
    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG_9, [
        this.getUserID.bind(this),
        this.userIDValidation.bind(this),
        this.endStep.bind(this),
      ])
    );
    this.initialDialogId = WATERFALL_DIALOG_9;
  }
  // get TicketID
  async getUserID(stepContext) {
    try {
      // if (userProfile.ticketID) {
      //   console.log(userProfile.ticketID)
      //   return await stepContext.next();
      
      // } else {
        //If user is not providing during CLU ask the ticket ID
        const textMessage = "What is your Ticket ID?";
        return await stepContext.prompt(TEXT_PROMPT, textMessage);
      // }
    } catch (error) {
      console.log(error);
    }
  }
  // validate the TicketID
  async userIDValidation(stepContext) {
    try {
      // const userProfile = await this.userProfileAccessor.get(
      //   stepContext.context,
      //   new Profile()
      // );
      const userProfile = new Profile();
      // if(!userProfile.ticketID){
        userProfile.ticketID = await stepContext.result;
      // }
      const userDetails = await showUserByTicketID(userProfile.ticketID);
      console.log("userDetails: ",userDetails);
      // if (!userProfile.ticketID) {
      //   userProfile.ticketID = await stepContext.result;
      //   console.log(userProfile.ticketID);
      // }
      // match the ticket ID with dataBase ticket ID
      const matchID = await findUserByTicketID(userProfile.ticketID);
      console.log(matchID);
      if (matchID) {
        //If the ticket ID matcheed
        await stepContext.context.sendActivity(`You booked your tickets`);
        return await stepContext.context.sendActivity(`You booked your tickets from ${userDetails.departureCity} to ${userDetails.destinationCity} on ${userDetails.date}`);
      } else {
        this.count++;
        if (this.count >= 2) {
          await stepContext.context.sendActivity("Send hi to start again");
          userProfile.ticketID = "";
          this.count = 0;
          return await stepContext.cancelAllDialogs();
        }
        userProfile.ticketID = "";
        await stepContext.context.sendActivity(
          "Please enter a valid Ticket ID :)"
        );
        return await stepContext.beginDialog(WATERFALL_DIALOG_9);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async endStep(stepContext) {
    return await stepContext.endDialog();
  }
}
module.exports.BookingStatusDialog = BookingStatusDialog;
