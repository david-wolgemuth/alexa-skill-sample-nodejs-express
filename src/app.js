// Alexa handlers
const handlers = {
  'GeneralMoodIntent': function () {
    this.emit(':ask', 'Thank you! What words describe your mood?');
  },
  'MoodWordIntent': function () {
    this.emit(':ask', 'Alright.  Do you have other words to describe your mood?');
  },
  'Unhandled': function () {
    this.emit(':ask', 'What is your overall mood from one to ten?');
  }
};

module.exports = { handlers };
