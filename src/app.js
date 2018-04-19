// Alexa handlers
const handlers = {
  'GeneralMoodIntent': function () {
    const mood = slotValue(this.event, 'OverallMood');
    if (mood < 0 || mood > 10) {
      return this.emit(
        ':ask',
        'Sorry, please say a number between 1 and 10.  What is your mood?'
      );
    } 
    if (mood < 5) {
      return this.emit(
        ':ask',
        'Sorry you feel that way. What word describes your mood?'
      );
    } else {
      return this.emit(
        ':ask',
        'Thank you! What words describe your mood?'
      );
    }
  },
  'MoodWordIntent': function () {
    this.emit(':ask', 'Alright.  Do you have other words to describe your mood?');
  },
  'Unhandled': function () {
    this.emit(':ask', 'What is your overall mood from one to ten?');
  }
};

const slotValue = (event, slotName) => event.request.intent.slots[slotName].value;

module.exports = { handlers };
