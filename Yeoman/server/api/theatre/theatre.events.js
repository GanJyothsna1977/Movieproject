/**
 * Theatre model events
 */

'use strict';

import {EventEmitter} from 'events';
import Theatre from './theatre.model';
var TheatreEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TheatreEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Theatre.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TheatreEvents.emit(event + ':' + doc._id, doc);
    TheatreEvents.emit(event, doc);
  }
}

export default TheatreEvents;
