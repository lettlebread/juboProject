'use strict';
const Schema = require('mongoose').Schema;
const orderSchema = new Schema(
  { 
    message: String,

  },
  { collection: 'order' },
  { strict: false }
);

orderSchema.add({
  patientId: String
}, '');

/*const newOrderSchema = new Schema();
newOrderSchema.add(orderSchema).add({
  patientId: String
});*/

/* global db */
module.exports = db.model('order', orderSchema);