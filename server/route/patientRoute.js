'use strict';
const model = require('../model/patientModel');

exports.get = function(req, res, next) {
  model.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
};

exports.insert = function(req, res, next) {
  model.create({ name: req.body.name }, function(err, doc) {
    if (err) return next(err);
    res.send(doc);
  });
};