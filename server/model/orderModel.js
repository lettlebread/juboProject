'use strict';
const Schema = require('mongoose').Schema;

const orderSchema = Schema(
  { 
    message: String,
    patientId: String
  },
  { collection: 'order' },
  { strict: false }
);

/*orderSchema.add({
  patientId: String
}, '');*/

/* global db */
module.exports = db.model('order', orderSchema);