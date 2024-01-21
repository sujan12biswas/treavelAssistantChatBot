const { mongoose } = require("mongoose");
const indianCities = [
  "mumbai",
  "delhi",
  "bangalore",
  "hyderabad",
  "ahmedabad",
  "chennai",
  "kolkata",
  "surat",
  "pune",
  "jaipur",
  "lucknow",
  "kanpur",
  "nagpur",
  "indore",
  "thane",
  "bhopal",
  "visakhapatnam",
  "patna",
  "vadodara",
  "ghaziabad",
];

// // Create the Schema
const userSchema = new mongoose.Schema({
  cityName: String,
});
const City = mongoose.model("City", userSchema);
// db;

//Inserts cities
async function insertCities(cityNames) {
  const cities = cityNames.map((cityName) => ({ cityName }));
  await City.insertMany(cities);
}
// Find City
async function findCityByName(cityName) {
    console.log("cityname: ",cityName);
    const lowerCiyName = cityName.toLowerCase();
  const city = await City.findOne({ cityName: lowerCiyName });
  console.log("hi from  cityName from Ddatabase",city);
  return city !== null;
}
// db.close();
insertCities(indianCities);
console.log("Completed");

module.exports.findCityByName = findCityByName;
