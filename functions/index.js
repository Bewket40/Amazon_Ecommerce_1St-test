const functions = require('firebase-functions');
const { createPaymentIntent } = require('./payments');


exports.createPaymentIntent = createPaymentIntent;


const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

