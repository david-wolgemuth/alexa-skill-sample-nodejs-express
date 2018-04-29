const rawHandlers = require('./handlers');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = () => {
  const handlers = {};
  for (let intent in rawHandlers) {
    let intentName = intent.replace(/_/g, '.');  // AMAZON_HelpIntent -> AMAZON.HelpIntent
    handlers[intentName] = convertHandler(rawHandlers[intent]);
  }
  return handlers;
};

const convertHandler = (handler) => function () {
  const handle = this;
  handle.slots = getSlots(this);
  handle.ask = ask;
  handle.requestMissingInfo = requestMissingInfo;
  handle.user = fetchUserRequest;
  handle.unhandled = unhandled;
  handle.handleError = handleError;
  handler(handle);
};

const getSlots = handle => {
  const intent = handle.event.request.intent;
  if (!intent) {
    return null;
  }
  const rawSlots = handle.event.request.intent.slots;
  const slots = {};
  for (let slotName in rawSlots) {
    slots[slotName] = rawSlots[slotName].value;
  }
  return slots;
};

const handleError = function (error) {
  this.emit(':tell', `Sorry, I am having a problem. ${error.message}.`);
};

const ask = function (question, prompt) {
  this.emit(':ask', question, prompt);
};

const fetchUser = function() {
  const amazonUserId = this.event.context.System.user.userId;
  return User.findOne({ amazonUserId });
};

const requestMissingInfo = function() {
  this.emit(':delegate');
};

const unhandled = function () {
  this.emit('Unhandled');
};
