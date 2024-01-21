const {
  WaterfallDialog,
  TextPrompt,
  NumberPrompt,
} = require("botbuilder-dialogs");
const moment = require("moment");
const { generateID } = require("../../generateID/id");
const { bookTicketProfile } = require("../../profile/bookTicketProfile");
const { findCityByName } = require("../../database/cityNameModel");
const db = require("../../database/db");
const { createUser } = require("../../database/crud");
const { validateAndConvertDate } = require("../../stringToDate/date");
const WATERFALL_DIALOG = "waterfallDialog";
const TEXT_PROMPT_1 = "textPrompt1";
const TEXT_PROMPT_2 = "textPrompt2";
const TEXT_PROMPT_3 = "textPrompt3";
const TEXT_PROMPT_4 = "textPrompt4";
const NUMBER_PROMPT = "numberPrompt";
//   const TICKET_BOOKING_DIALOG = 'ticketBookingDialog'
const {
  TICKET_BOOKING_DIALOG,
  USER_PROFILE_PROPERTY,
  CONVERSATION_DATA_PROPERTY,
} = require("../../utilities/dialogIds");
const { CancelAndHelpDialog } = require("../intrerruotion");
const { Profile } = require("../../profile/userProfile");
let wrongNamecount = 0;
let wrongNumberOfTicketsCount = 0;
let wrongDepartureCityCount = 0;
let wrongDestinationCityCount = 0;
let wrongDateCount = 0;
class TicketBookingDialog extends CancelAndHelpDialog {
  constructor(conversationState, userState) {
    super(TICKET_BOOKING_DIALOG);
    this.userProfile = new Profile();
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
    this.addDialog(new TextPrompt(TEXT_PROMPT_1, this.validateName));
    this.addDialog(new TextPrompt(TEXT_PROMPT_2, this.validateDepartureCity));
    this.addDialog(new TextPrompt(TEXT_PROMPT_3, this.validateDestinationCity));
    this.addDialog(new TextPrompt(TEXT_PROMPT_4, this.validateDate));
    this.addDialog(
      new NumberPrompt(NUMBER_PROMPT, this.validateNumberOfTickets)
    );
    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG, [
        this.askName.bind(this),
        this.askNumberOfTickets.bind(this),
        this.askDepartureCity.bind(this),
        this.askDestinationCity.bind(this),
        this.askDate.bind(this),
        this.storeInDataBase.bind(this),
        this.endStep.bind(this),
      ])
    );
    this.initialDialogId = WATERFALL_DIALOG;
  }
  // take input of username
  async askName(stepContext) {
    try {
      const promptOptions = {
        prompt: "What is your name?",
        retryPrompt: "Please enter a valid name",
      };
      return await stepContext.prompt(TEXT_PROMPT_1, promptOptions);
    } catch (error) {
      console.log(error);
    }
  }
  //Validation For name
  async validateName(stepContext) {
    try {
      const regexName = /^[A-Za-zÀ-ÿ\-']+(\s[A-Za-zÀ-ÿ\-']+)*$/; // validate the name by regex
      console.log(stepContext.context.activity.text);
      if (regexName.test(stepContext.context.activity.text)) {
        return true;
      } else {
        // wrongNamecount++;
        // if (wrongNamecount >= 2) {
        //   wrongNamecount = 0;
        //   return await stepContext.cancelAllDialogs();
        // }
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ask number of ticket
  async askNumberOfTickets(stepContext) {
    try {
        // const this.userProfile = await this.this.userProfileAccessor.get(
        //     stepContext.context,
        //     new Profile() 
        //   );
        // const this.userProfile = new Profile();
          console.log("StepContext.result--->", stepContext.result);
      //Storing the user response
    //   if (!this.userProfile.name) {
        this.userProfile.name = await stepContext.result;
        console.log("7636r->",this.userProfile.name)
    //   }

      const promptContext = {
        prompt: "How many tickets you want to book (1-10)?",
        retryPrompt: "Please enter a valid number :)",
      };
      console.log("StepContext.result22222--->", stepContext.result);
      return await stepContext.prompt(NUMBER_PROMPT, promptContext);
    } catch (error) {
      console.log(error);
    }
  }
  //Validate Ticket Number
  async validateNumberOfTickets(stepContext) {
    try {
      const regexName = /^(?:[1-9]|10)$/; // number between 1 to 10
      if (regexName.test(stepContext.context.activity.text)) {
        return true;
      } else {
        // wrongNumberOfTicketsCount++;
        // if (wrongNumberOfTicketsCount >= 2) {
        //   wrongNumberOfTicketsCount = 0;
        //   return await stepContext.cancelAllDialogs();
        // }
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ask Departure City
  async askDepartureCity(stepContext) {
    try {
    //     const this.userProfile = await this.this.userProfileAccessor.get(
    //         stepContext.context,
    //         new Profile()
    //       ); 
    // const this.userProfile = new Profile();
    //   //Storing the user response
      if (!this.userProfile.numberOfTickets) {
        this.userProfile.numberOfTickets = await stepContext.result;
      }
      const promptOptions = {
        prompt: "What is your Departure City?",
        retryPrompt: "Please enter a valid Departure City",
      };
      return await stepContext.prompt(TEXT_PROMPT_2, promptOptions);
    } catch (error) {
      console.log(error);
    }
  }
  //validate Departure City
  async validateDepartureCity(stepContext) {
    try {
      if (await findCityByName(stepContext.context.activity.text)) {
        return true;
      } else {
        // wrongDepartureCityCount++;
        // if (wrongDepartureCityCount >= 2) {
        //   wrongDepartureCityCount = 0;
        //   return await stepContext.cancelAllDialogs();
        // }
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ask Destination City
  async askDestinationCity(stepContext) {
    try {
        // const this.userProfile = await this.this.userProfileAccessor.get(
        //     stepContext.context,
        //     new Profile()
        //   );
        // const this.userProfile = new Profile();
      //Storing the user response
      if (!this.userProfile.departureCity) {
        this.userProfile.departureCity = await stepContext.result;
      }
      const promptOptions = {
        prompt: "What is your Arrival City?",
        retryPrompt: "Please enter a valid Arrival City",
      };
      return await stepContext.prompt(TEXT_PROMPT_3, promptOptions);
    } catch (error) {
      console.log(error);
    }
  }
  //validate Destination City
  async validateDestinationCity(stepContext) {
    try {
      if (await findCityByName(stepContext.context.activity.text)) {
        return true;
      } else {
        // wrongDestinationCityCount++;
        // if (wrongDestinationCityCount >= 2) {
        //   wrongDestinationCityCount = 0;
        //   return await stepContext.cancelAllDialogs();
        // }
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //Ask Date
  async askDate(stepContext) {
    try {
        // const this.userProfile = await this.this.userProfileAccessor.get(
        //     stepContext.context,
        //     new Profile()
        //   );
        // const this.userProfile = new Profile();
      //Storing the user response
      if (!this.userProfile.destinationCity) {
        this.userProfile.destinationCity = await stepContext.result;
      }
      const promptOptions = {
        prompt: "In which date you want to trave?",
        retryPrompt: "Please enter a valid date :)",
      };
      return await stepContext.prompt(TEXT_PROMPT_4, promptOptions);
    } catch (error) {
      console.log(error);
    }
  }
  //ValidateDate
  async validateDate(stepContext) {
    try {
      console.log("InputDate:--->", stepContext.context.activity.text);
      //if date is validated
      if (validateAndConvertDate(await stepContext.context.activity.text)) {
        return true;
      } else {
        console.log(
          "validateAndConvertDate--->",
          validateAndConvertDate(await stepContext.result)
        );
        // wrongDateCount++;
        // if (wrongDateCount >= 2) {
        //   wrongDateCount = 0;
        //   return await stepContext.cancelAllDialogs();
        // }
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async storeInDataBase(stepContext) {
    // const this.userProfile = await this.this.userProfileAccessor.get(
    //     stepContext.context,
    //     new Profile()
    //   );
    // const this.userProfile = new Profile();
    //Generate a new ticket ID for the user
    this.userProfile.ticketID = generateID();
    this.userProfile.bookingStatus = true;
    console.log(this.userProfile);
//   console.log("travelDate---|-|--->",travelDate.date)

    try {
      // Create a user
      await createUser(
        this.userProfile.name,
        this.userProfile.numberOfTickets,
        this.userProfile.departureCity,
        this.userProfile.destinationCity,
        // this.userProfile.date,
        bookTicketProfile.date,
        this.userProfile.phoneNumber,
        this.userProfile.emailAddress,
        this.userProfile.ticketID,
        this.userProfile.bookingStatus
      );
    } catch (error) {
      console.log("Error: ", error);
    }
    //   finally {
    //     console.log("Hello from db in payment method")
    //     db.close();
    //   }

    await stepContext.context.sendActivity("You are done");
    return await stepContext.context.sendActivity(
      `Your TicketID id is: ${this.userProfile.ticketID}`
    );
    // }

    //   return await stepContext.endDialog();
  }

  async endStep(stepContext) {
    return await stepContext.endDialog();
  }
}

module.exports.TicketBookingDialog = TicketBookingDialog;
