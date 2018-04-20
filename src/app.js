
const rawHandlers = require('./handlers');

module.exports = () => {
  const handlers = {};
  for (let intent in rawHandlers) {
    let intentName = intent.name.replace(/_/g, '.');  // AMAZON_HelpIntent -> AMAZON.HelpIntent
    handlers[intentName] = convertHandler(rawHandlers[intent]);
  }
  return handlers;
};

const convertHandler = (handler) => function () {
  const handle = this;
  handle.slots = getSlots(this);
  handle.ask = ask;
  handle.requestMissingInfo = requestMissingInfo;
  handle.user = fetchUser(this.event);
  handle.unhandled = unhandled;
  handler(handle);
};

const getSlots = handle => {
  const rawSlots = handle.event.request.intent.slots;
  const slots = {};
  for (let slotName in rawSlots) {
    slots[slotName] = rawSlots[slotName].value;
  }
  return slots;
};

const ask = function (question, prompt) {
  this.emit(':ask', question, prompt);
};

const fetchUser = event => {
  const userId = event.context.System.user.userId;
  return {
    userId,
    addMoodWord: function () { console.log('ADD MOOD WORD', arguments); },
    addOverallMood: function () { console.log('ADD OVERALL MOOD', arguments); }
  };
};

const requestMissingInfo = function() {
  this.emit(':delegate');
};

const unhandled = function () {
  this.emit('Unhandled');
};