'use strict';

import mongoose from 'mongoose';

var MoviesSchema = new mongoose.Schema({
  Poster: String,
  Title: String,
  Genre: String,
  Overview: String,
  ReleaseDate: String,
  Duration: String,
  Production: String,
  avgRating:String
});

export default mongoose.model('Movies', MoviesSchema);
