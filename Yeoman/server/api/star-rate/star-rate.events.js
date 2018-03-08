/**
 * StarRate model events
 */

'use strict';

import {EventEmitter} from 'events';
import StarRate from './star-rate.model';
var StarRateEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StarRateEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  StarRate.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    StarRateEvents.emit(event + ':' + doc._id, doc);
    StarRateEvents.emit(event, doc);
  }
}

export default StarRateEvents;
