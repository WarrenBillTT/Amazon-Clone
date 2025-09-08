const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

// API
const app = express();

// Middlewares
// app.use(cors({ origin: "*" }));
app.use(cors({ origin: true })); 
app.use(express.json());

// Routes
app.get("/payments/create", (req, res) => {
  res.send("Use POST instead of GET for this endpoint 🚀");
});
// app.get("/", (request, response) => response.status(200).send("hello world"));

// app.post('/payments/create', async (request, response) => {
//     const total = request.query.total;

//     console.log('Payment Request Received for this amount >>> ', total)

//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total, 
//         currency: "usd",
//     });jadi

//     response.status(201).send({
//         clientSecret: paymentIntent.client_secret,
//     });
// });

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});

// Expose API
exports.api = functions.https.onRequest(app);

// Global options
// functions.setGlobalOptions({ maxInstances: 10 });

// Example endpoint
// http://127.0.0.1:5001/challenge-ebb48/us-central1/api
