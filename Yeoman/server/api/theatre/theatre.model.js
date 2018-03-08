'use strict';

import mongoose from 'mongoose';

var TheatreSchema = new mongoose.Schema({
  theatreName: String,
  city: String,
  area: String
});

export default mongoose.model('Theatre', TheatreSchema);
