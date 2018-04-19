// Alexa handlers
const handlers = {
  'GeneralMoodIntent': function () {
    this.emit(':tell', 'Thank you! What words describe your mood?');
  },
  'MoodWordIntent': function () {
    this.emit(':tell', 'Alright');
  },
  'Unhandled': function () {
    this.emit(':ask', 'What is your overall mood from one to ten?');
  }
};

module.exports = { handlers };
