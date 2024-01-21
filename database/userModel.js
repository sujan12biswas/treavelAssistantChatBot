const mongoose = require('mongoose');
// Create the Schema
const userSchema = new mongoose.Schema({
    name: String,
    numberOfTickets: Number,
    departureCity: String,
    destinationCity: String,
    date: Date,
    phoneNumber: Number,
    emailAddress: String,
    ticketID: String,
    bookingStatus: Boolean
});
const User = mongoose.model('User', userSchema);
module.exports = User;
