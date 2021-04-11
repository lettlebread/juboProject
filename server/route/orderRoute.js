'use strict';
const order = require('../model/orderModel');
const patient = require('../model/patientModel');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

exports.get = function(req, res, next) {
    order.find(function(err, docs) {
    if (err) return next(err);
    console.log(docs)
    res.send(docs);
  });
};

exports.insert = function(req, res, next) {
  console.log("order inset req", req.body);
  let orderObj = {
    message: req.body.message,
    patientId: req.body.patientId
  };
  
  order.create(orderObj).then(newOrder => {
    console.log("new order", newOrder);
    res.send(newOrder);
    return patient.updateOne(
      {
        _id: mongoose.Types.ObjectId(req.body.patientId)
      },
      {
        $push: {
          orderId: newOrder._id.toString()
        }
      }
    );
  });
};

exports.update = function(req, res, next) {
  /*order.updateOne(
    {
      _id: mongoose.Types.ObjectId(req.params.orderId)
    },
    {
      message: req.body.message
    }
  ).then((newOrder) => {
    res.send(newOrder);
  });*/
  console.log('order update', req.params.orderId, req.body);
  order.findOneAndUpdate(
    {
      _id: mongoose.Types.ObjectId(req.params.orderId)
    },
    {
      message: req.body.message
    },
    {new: true}
  ).then((newOrder) => {
    res.send(newOrder);
  });
};

exports.getPatientOrder = function(req, res, next) {
    console.log("req", req.query, req.params);

    patient.findOne({_id: mongoose.Types.ObjectId(req.params.patientId)}).then(data => {
      return order.find({
        _id: {
          $in: data.orderId.map(o => mongoose.Types.ObjectId(o))
        }
      });
    }).then(orders => {
      res.send(orders);
    }).catch(err => {
      console.log(err);
    });
  };
  