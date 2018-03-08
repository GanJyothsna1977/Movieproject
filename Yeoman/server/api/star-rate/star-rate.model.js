'use strict';

import mongoose from 'mongoose';

var StarRateSchema = new mongoose.Schema({
  movieNames: String,
  MovieRating: Number
});

export default mongoose.model('StarRate', StarRateSchema);
