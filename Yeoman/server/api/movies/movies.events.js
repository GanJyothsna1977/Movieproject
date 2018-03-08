/**
 * Movies model events
 */

'use strict';

import {EventEmitter} from 'events';
import Movies from './movies.model';
var MoviesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MoviesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Movies.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MoviesEvents.emit(event + ':' + doc._id, doc);
    MoviesEvents.emit(event, doc);
  }
}

export default MoviesEvents;
