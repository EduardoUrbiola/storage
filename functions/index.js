const functions = require("firebase-functions");
require("dotenv").config();
const process = require("process")
let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
  try {
    const { email, name, amount } = req.body;
    let customers = await stripe.customers.list({
      email,
    });

    let customer;
    if (!customers.data[0]) {
      customer = await stripe.customers.create({
        name,
        email,
      });
    } else {
      customer = customers.data[0];
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2020-08-27" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (error) {
    console.log("error from the server: ", error.message);
    res.status(500).json({ error: error.message });
  }
});
