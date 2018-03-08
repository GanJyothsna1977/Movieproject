/**
 * Moviemap model events
 */

'use strict';

import {EventEmitter} from 'events';
import Moviemap from './moviemap.model';
var MoviemapEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MoviemapEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Moviemap.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MoviemapEvents.emit(event + ':' + doc._id, doc);
    MoviemapEvents.emit(event, doc);
  }
}

export default MoviemapEvents;
