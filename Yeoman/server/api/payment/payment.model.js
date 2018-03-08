'use strict';

import mongoose from 'mongoose';

var PaymentSchema = new mongoose.Schema({
  TheatreName: String,
  MovieName: String,
  MovieDate: String,
  MovieTiming: String,
  Class: String,
  SeatNumbers: String,
  NumberOfTickets: String,
  TotalCost: String
});

export default mongoose.model('Payment', PaymentSchema);
