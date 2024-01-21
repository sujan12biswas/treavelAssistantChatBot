//Generate 3 random alphabet
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
//Generate 3 random digit
function generateRandomNumber(length) {
    const digits = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        result += digits.charAt(randomIndex);
    }
    return result;
}
function generateID() {
    const alphabetPart = generateRandomString(3);
    const numberPart = generateRandomNumber(3);
    return alphabetPart + numberPart;
}

module.exports.generateID = generateID;
