// Store user information through userState
class Profile {
    constructor(){
    this.name =  '';
    this.numberOfTickets =  null,
    this.departureCity =  '',
    this.destinationCity =  '',
    this.date =  null,
    this.phoneNumber = null,
    this.emailAddress = '',
    this.ticketID =  '',
    this.bookingStatus =  false,
    this.weatherLocation =  '',
    this.currentTemperature = '',
    this.currentCondition = ''
    }
}

// const travelDate = null;
module.exports.Profile = Profile;
