
const {bookTicketProfile} = require('../profile/bookTicketProfile')
const moment = require('moment');
// const {travelDate} = require('../profile/userProfile')

function validateAndConvertDate(inputDate) {
  const today = moment();
  const tomorrow = moment().add(1, 'day');
  const fourMonthsFromNow = moment().add(4, 'months');

  // Check if the inputDate is "today" or "tomorrow"
  if (inputDate.toLowerCase() === 'today') {
    return today.format('YYYY-MM-DD');
  }

  if (inputDate.toLowerCase() === 'tomorrow') {
    return tomorrow.format('YYYY-MM-DD');
  }

  const parsedDate = moment(inputDate, 'YYYY-MM-DD', true); // Validate date format

  if (!parsedDate.isValid()) {
    console.log("From parsedDate.isValid()")
    return false;
  }
  // const userProfile = new Profile();
  if (parsedDate.isBefore(today) || parsedDate.isAfter(fourMonthsFromNow)) {
    console.log("123")
    return false;
  }
  bookTicketProfile.date = parsedDate.format('YYYY-MM-DD')  // Convert to desired date format and store
  // console.log("travelDate---|---->",travelDate.date)
  return true; 
}

console.log(validateAndConvertDate('2023-11-11'));

module.exports.validateAndConvertDate = validateAndConvertDate;



