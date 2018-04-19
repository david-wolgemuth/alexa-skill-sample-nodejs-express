// Alexa handlers
const handlers = {
  'GeneralMoodIntent': function () {
    this.emit(':tell', 'Thank you! What words describe your mood?');
  },
  'MoodWordIntent': function () {
    this.emit(':tell', 'Alright');
  }
};

module.exports = { handlers };
