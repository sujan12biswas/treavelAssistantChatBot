const User = require('./userModel');

// Create operation
function createUser(name, numberOfTickets,departureCity,destinationCity,date,phoneNumber,emailAddress,ticketID,bookingStatus) {
    const newUser = new User({ name, numberOfTickets,departureCity,destinationCity,date,phoneNumber,emailAddress,ticketID,bookingStatus });
    
    return newUser.save();
}

// Read operation
async function findUserByTicketID(ticketID) {
     const user = await User.findOne({ ticketID : ticketID });
    return user !== null;   //Its return true or false
}
//Show user details
async function showUserByTicketID(ticketID) {
    const user = await User.findOne({ ticketID : ticketID });
    console.log("shownByTicketID--->",user);
   return user;   //Its return true or false
}

//Get Date by userID
async function getDateByUserID(ticketID){
    const user = await User.findOne({ ticketID: ticketID });
    console.log(user.date);
    return  user.date;
}


// Update operation
// function updateUserAge(name, newAge) {
//     return User.updateOne({ name }, { age: newAge });
// }

// Delete operation
function deleteUserByTicketID(ticketID) {
    return User.deleteOne({  ticketID : ticketID});
}


module.exports = {
    createUser,
    findUserByTicketID,
    getDateByUserID,
    showUserByTicketID,
    // updateUserAge,
    deleteUserByTicketID
};
