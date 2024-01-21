const {
  ComponentDialog,
  WaterfallDialog,
  TextPrompt,
} = require("botbuilder-dialogs");
const { db } = require("../../database/db");
const {
  findUserByTicketID,
  deleteUserByTicketID,
} = require("../../database/crud");
const { bookTicketProfile } = require("../../profile/bookTicketProfile");
const { getDateByUserID } = require("../../database/crud");
const {TICKET_CANCEL_DIALOG, CONVERSATION_DATA_PROPERTY,USER_PROFILE_PROPERTY} = require('../../utilities/dialogIds')
// const TICKET_CANCEL_DIALOG = "TICKET_CANCEL_DIALOG";
const WATERFALL_DIALOG_10 = "waterfallDialog10";
const TEXT_PROMPT = "textPrompt";
const {CancelAndHelpDialog} = require('../intrerruotion')
const {Profile} = require('../../profile/userProfile')
class CancelTicketDialog extends CancelAndHelpDialog {
  constructor(conversationState, userState) {
    super(TICKET_CANCEL_DIALOG);
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
      new WaterfallDialog(WATERFALL_DIALOG_10, [
        this.getUserID.bind(this),
        this.userIDValidation.bind(this),
        this.endStep.bind(this),
      ])
    );
    this.initialDialogId = WATERFALL_DIALOG_10;
  }
  // get TicketID
  async getUserID(stepContext) {
    try {
      // const userProfile = await this.userProfileAccessor.get(
      //   stepContext.context,
      //   new Profile()
      // );
      const userProfile = new Profile();
      if (userProfile.ticketID) {
        return await stepContext.next();
      } else {
        //If the ticket ID is not get by CLU then ask
        const textMessage = "What is your Ticket ID?";
        return await stepContext.prompt(TEXT_PROMPT, textMessage);
      }
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
      if (!userProfile.ticketID) {
        userProfile.ticketID = await stepContext.result;
        console.log(userProfile.ticketID);
      }
      //Matching the ticket ID with database ticket ID
      const matchID = await findUserByTicketID(userProfile.ticketID);
      console.log(matchID);
      if (matchID) {
        //Getting the current date
        const currentDate = new Date();
        const bookedTicketDate = getDateByUserID(userProfile.ticketID); //Getting the ticket booking date
        //Getting the time difference
        const timeDifferenceInMilliseconds = bookedTicketDate - currentDate;
        const timeDifferenceInHours =
          timeDifferenceInMilliseconds / (1000 * 60 * 60);
        //If the user is not cancelling the tickets within 24 hours of travelling
        if (timeDifferenceInHours <= 24) {
          // Delete all details of that ticket ID
          await deleteUserByTicketID(userProfile.ticketID);
          return await stepContext.context.sendActivity(
            "You have sucessfully canceled your ticket"
          );
        } else {
          
          await stepContext.context.sendActivity("You can't cancel the tickets within 24 hours of the travelling will start :)");
          return stepContext.next();
        }
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
        return await stepContext.beginDialog(WATERFALL_DIALOG_10);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async endStep(stepContext) {
    return await stepContext.endDialog();
  }
}
module.exports.CancelTicketDialog = CancelTicketDialog;
