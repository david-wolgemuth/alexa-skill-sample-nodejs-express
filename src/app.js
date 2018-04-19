// Alexa handlers
const handlers = {
  'GeneralMoodIntent': function () {
    console.log('GeneralMoodIntent', JSON.stringify(this.event));
    const mood = slotValue(this.event, 'OverallMood');
    if (mood < 0 || mood > 10) {
      return this.emit(
        ':ask',
        'Sorry, please say a number between 1 and 10.  What is your mood?',
        'Again?'
      );
    } 
    if (mood < 5) {
      return this.emit(
        ':ask',
        'Sorry you feel that way. What word describes your mood?',
        'Again?'
      );
    } else {
      return this.emit(
        ':ask',
        'Thank you! What words describe your mood?',
        'Again?'
      );
    }
  },
  'MoodWordIntent': function () {
    console.log('MoodWordIntent', JSON.stringify(this.event));
    this.emit(':ask', 'Alright.  Do you have other words to describe your mood?', 'What?');
  },
  'Unhandled': function () {
    console.log('Unhandled', JSON.stringify(this.event));
    this.emit(':ask', 'What is your overall mood from one to ten?', 'What?');
  }
};

const slotValue = (event, slotName) => event.request.intent.slots[slotName].value;

module.exports = { handlers };
