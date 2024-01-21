const {
  ComponentDialog,
  WaterfallDialog,
  TextPrompt,
} = require("botbuilder-dialogs");
const { bookTicketProfile } = require("../../profile/bookTicketProfile");
const { getWeather } = require("../../fetchWeather/fetchWeatherData");
const {findCityByName} = require('../../database/cityNameModel')
// const WEATHER_STATUS_DIALOG = "WEATHER_STATUS_DIALOG";
const {WEATHER_STATUS_DIALOG,CONVERSATION_DATA_PROPERTY,USER_PROFILE_PROPERTY} = require('../../utilities/dialogIds')
const WATERFALL_DIALOG_11 = "waterfallDialog11";
const TEXT_PROMPT = "textPrompt";
const {CancelAndHelpDialog} = require('../intrerruotion')
const {Profile} = require('../../profile/userProfile')
let count = 0;
class WeatherStatusDialog extends CancelAndHelpDialog {
  constructor(conversationState, userState) {
    super(WEATHER_STATUS_DIALOG);
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
    this.addDialog(new TextPrompt(TEXT_PROMPT));
    this.addDialog(
      new WaterfallDialog(WATERFALL_DIALOG_11, [
        this.getWeatherCityName.bind(this),
        this.weatherCityNameValidation.bind(this),
        this.endStep.bind(this),
      ])
    );
    this.initialDialogId = WATERFALL_DIALOG_11;
  }
  // take input of cityName
  async getWeatherCityName(stepContext) {
    try {
      // const userProfile = await this.userProfileAccessor.get(
      //   stepContext.context,
      //   new Profile()
      // );
      const userProfile = new Profile();
      if (userProfile.weatherLocation) {
        return await stepContext.next();
      } else {
        const textMessage = "Which city's weather you want to get?";
        return await stepContext.prompt(TEXT_PROMPT, textMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // validate the weather
  async weatherCityNameValidation(stepContext) {
    try {
      // const userProfile = await this.userProfileAccessor.get(
      //   stepContext.context,
      //   new Profile()
      // );
      const userProfile = new Profile();
      if (!userProfile.weatherLocation) {
        userProfile.weatherLocation = await stepContext.result;
        console.log(userProfile.weatherLocation);
      }
      
        if(await findCityByName(city)){
          getWeather(city)
          .then((weatherData) => {
            userProfile.currentCondition =
              weatherData.current.condition.text;
              userProfile.currentTemperature = weatherData.current.temp_c;
            // Process and format weatherData to create a response
            //  response = `The weather in ${weatherData.location.name} is ${weatherData.current.condition.text}. Temperature: ${weatherData.current.temp_c}°C`;
            console.log(weatherData);
          })
          .catch((error) => {
            console.error("Bot error:", error);
          });
          console.log(
            `The weather in ${userProfile.weatherLocation} is ${userProfile.currentCondition}. Temperature: ${userProfile.currentTemperature}°C`
          );
          await stepContext.context.sendActivity(
            `The weather in ${userProfile.weatherLocation} is ${userProfile.currentCondition}. Temperature: ${userProfile.currentTemperature}°C`
          );
          return await stepContext.next();
        }else{
          count ++;
        if(count>=2){
          await stepContext.context.sendActivity("Send hi to start again")
          return await stepContext.cancelAllDialogs();
        }
        userProfile.weatherLocation = "";
        await stepContext.context.sendActivity(
          "Please enter a valid weather Location :)"
        );
        return await stepContext.beginDialog(WATERFALL_DIALOG_11);
        }
    } catch (error) {
      console.log(error);
    }
  }
  async endStep(stepContext) {
    return await stepContext.endDialog();
  }
}
module.exports.WeatherStatusDialog = WeatherStatusDialog;




