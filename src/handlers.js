const HELP_PHRASE = 'Say something like, "My overall mood is eight out of ten", or "I am feeling ninety percent happy". How are you feeling?';

module.exports.LaunchRequest = handler => handler.emit('AMAZON.HelpIntent');

module.exports.AMAZON_HelpIntent = handler => handler.ask(HELP_PHRASE);

module.exports.Unhandled = handler => handler.ask('Sorry, I am not sure how to handle that one.');

module.exports.GeneralMoodIntent = handler => {
  const mood = handler.slots.OverallMood;

  if (mood < 0 || mood > 10) {
    return handler.ask('Sorry, please say a number between 1 and 10.  What is your mood?', HELP_PHRASE);
  } 

  handler.fetchUser()
    .then(user => user.addOverallMood(mood))
    .then(() => {
      const question = (mood < 5) ?
        'Sorry you feel that way. What word describes your mood?':
        'Thank you! What words describe your mood?';
      handler.ask(question, HELP_PHRASE);
    }) 
    .catch(err => handler.error(err));
};

module.exports.MoodWordIntent = handler => {
  const moodWord = handler.slots.MoodWord;
  const percent = handler.slots.Percent;

  if (!percent) {
    return handler.requestMissingInfo();
  }
  if (!moodWord) {
    return handler.unhandled();
  }
  if (percent < 0 || percent > 100) {
    return handler.ask(
      'Sorry, please include a percent between 1 and 100.  How would you describe your mood?',
      HELP_PHRASE
    );
  }

  handler.fetchUser()
    .then(user => user.addMoodWord(moodWord, percent))
    .then(() => {
      handler.ask(
        'Alright.  Do you have other words to describe your mood?', HELP_PHRASE
      );
    })
    .catch(error => handler.handleError(error));
};
