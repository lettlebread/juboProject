'use strict';
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const patientSchema = Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    orderId: Array
  },
  { collection: 'patient' }
);

/* global db */
module.exports = db.model('patient', patientSchema);