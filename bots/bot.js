const { ActivityHandler } = require("botbuilder");
const {
  CONVERSATION_DATA_PROPERTY,
  USER_PROFILE_PROPERTY,
} = require("../utilities/dialogIds");
class Bot extends ActivityHandler {
  constructor(conversationState, userState, mainDialog) {
    super();
    if (!conversationState) throw new Error("Conversation State is required");
    this.conversationState = conversationState;
    this.userState = userState;
    this.mainDialog = mainDialog;
    //Create the state property acessor for the for the conversation data and user profile.
    this.conversationDataAccessor = this.conversationState.createProperty(
      CONVERSATION_DATA_PROPERTY
    );
    this.userProfileAccessor = this.userState.createProperty(
      USER_PROFILE_PROPERTY
    );

    //User send a message this function will run
    this.onMessage(async (context, next) => {
      try {
        await this.mainDialog.run(context, this.conversationDataAccessor);
        await next();
      } catch (error) {
        console.log(error);
      }
    });
    // when a member will add this message will run
    this.onMembersAdded(async (context, next) => {
      try {
        const memberAdded = context.activity.membersAdded;
        for (let count = 0; count < memberAdded.length; count++) {
          if (memberAdded[count].id !== context.activity.recipient.id) {
            await context.sendActivity("Send Hi...");
          }
        }
        await next();
      } catch (error) {
        console.log(error);
      }
    });
  }
  // when user send a message this function will override
  async run(context) {
    try {
      await super.run(context);
      await this.conversationState.saveChanges(context, false);
      await this.userState.saveChanges(context, false);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports.Bot = Bot;
