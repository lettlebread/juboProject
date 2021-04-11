'use strict';
const model = require('../model/patientModel');

exports.get = function(req, res, next) {
  model.find(function(err, docs) {
    if (err) return next(err);
    console.log("patient get", docs);
    res.send(docs);
  });
};

exports.insert = function(req, res, next) {
  console.log("req", req.body.name);
  model.create({ name: req.body.name }, function(err, doc) {
    if (err) return next(err);
    console.log('insert', err, doc);
    res.send(doc);
  });
};