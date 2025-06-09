
const {onRequest} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const stripe = require("stripe")(functions.config().stripe.secret); // Store secret in env
const cors = require("cors")({ origin: true });
const logger= require(firebase-functions/logger);
const express= require("express");
const dotenv= require("dotenv");
dotenv config();
const stripe= require("stripe")(process.env.STRIPE_KEY);

admin.initializeApp();

exports.createPaymentIntent = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
    if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
    }

    const { amount } = req.body;

    if (!amount) {
    return res.status(400).send({ error: "Missing amount." });
    }

    try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: "usd",
    });

    res.status(200).send({
        clientSecret: paymentIntent.client_secret,
    });
    } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).send({ error: err.message });
    }
});
});
