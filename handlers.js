const HELP_PHRASE = 'Say something like, "My overall mood is eight out of ten", or "I am feeling ninety percent happy". How are you feeling?';

export const LaunchRequest = handler => handler.emit('AMAZON.HelpIntent');

export const AMAZON_HelpIntent = handler => handler.ask(HELP_PHRASE);

export const Unhandled = handler => handler.ask('Sorry, I am not sure how to handle that one.');

export const GeneralMoodIntent = handler => {
  const mood = handler.slots.OverallMood;

  if (mood < 0 || mood > 10) {
    return handler.ask('Sorry, please say a number between 1 and 10.  What is your mood?', HELP_PHRASE);
  } 

  handler.user.addOverallMood(mood);

  const question = (mood < 5) ?
    'Sorry you feel that way. What word describes your mood?':
    'Thank you! What words describe your mood?';

  handler.ask(question, HELP_PHRASE);
};

export const MoodWordIntent = handler => {
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

  handler.user.addMoodWord(moodWord, percent);

  handler.ask(
    'Alright.  Do you have other words to describe your mood?', HELP_PHRASE
  );
};

