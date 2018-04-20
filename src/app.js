
const handlers = {};

handlers.LaunchRequest = function () {
  console.log('\n\n\n\n\n\n', this.constructor, '\n\n\n\n\n\n\n');
  this.emit('AMAZON.HelpIntent');
};

handlers.GeneralMoodIntent = function () {
  const mood = slotValue(this.event, 'OverallMood');
  if (mood < 0 || mood > 10) {
    return this.emit(':ask', 'Sorry, please say a number between 1 and 10.  What is your mood?');
  } 
  if (mood < 5) {
    return this.emit(':ask', 'Sorry you feel that way. What word describes your mood?');
  } else {
    return this.emit(':ask', 'Thank you! What words describe your mood?');
  }
};

handlers.MoodWordIntent = function () {
  const moodWord = slotValue(this.event, 'MoodWord');
  const percent = slotValue(this.event, 'Percent');
  if (!percent) { return this.emit(':delegate'); }
  if (!moodWord){ return this.emit('Unhandled'); }
  this.emit(
    ':ask',
    'Alright.  Do you have other words to describe your mood?',
    'Say something like, "I am 90 percent happy"'
  );
}

handlers['AMAZON.HelpIntent'] = function () {
  this.emit(':ask', 'Say something like, "My overall mood is 8 out of 10", or "I am feeling ninety percent happy". How are you feeling?');
};

handlers.Unhandled = function () {
  this.emit(':ask', 'Sorry, I am not sure how to handle that one.');
};

const slotValue = (event, slotName) => event.request.intent.slots[slotName].value;

module.exports = { handlers };
