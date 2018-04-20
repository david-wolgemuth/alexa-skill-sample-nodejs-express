
import * as rawHandlers from './handlers';

export const convertedHandlers = () => {
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
