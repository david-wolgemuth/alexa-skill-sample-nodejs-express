const handlers = {
  'LaunchRequest': function () {
    this.emit('AMAZON.HelpIntent');
  },
  'GeneralMoodIntent': function () {
    const mood = slotValue(this.event, 'OverallMood');
    if (mood < 0 || mood > 10) {
      this.emit(':tell', 'Sorry, please say a number between 1 and 10.')
      return this.emit(':ask', 'What is your mood?');
    } 
    if (mood < 5) {
      this.emit(':tell', 'Sorry you feel that way.');
      return this.emit(':ask', 'What word describes your mood?');
    } else {
      this.emit(':tell', 'Thank you!');
      return this.emit(':ask', 'What words describe your mood?');
    }
  },
  'MoodWordIntent': function () {
    const moodWord = slotValue(this.event, 'MoodWord');
    const percent = slotValue(this.event, 'Percent');
    if (!percent) {
      return this.emit(':elicitSlot', 'Percent');
    }
    if (!moodWord) {
      return this.emit(':tell', 'Hm. that was weird.');
    }
    this.emit(':ask', 'Alright.  Do you have other words to describe your mood?');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':tell', 'Say something like, "My overall mood is 8 out of 10", or "I am feeling ninety percent happy".');
    this.emit(':ask', 'How do you feel?');
  },
  'Unhandled': function () {
    this.emit(':tell', 'Sorry, I\'m not sure how to handle that one.');
    this.emit('AMAZON.HelpIntent');
  }
};

const slotValue = (event, slotName) => event.request.intent.slots[slotName].value;

module.exports = { handlers };
