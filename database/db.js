const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/travelBot';
// Get connection with database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
