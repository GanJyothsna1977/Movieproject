'use strict';

import mongoose from 'mongoose';

var MoviemapSchema = new mongoose.Schema({
  movieName:String,
  city:String,
  theatre:String,
  dates:[String],
  times:[String]
});

export default mongoose.model('Moviemap', MoviemapSchema);
