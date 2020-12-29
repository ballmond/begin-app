const Stripe = require('stripe');
let arc = require('@architect/functions')

let parseBody = arc.http.helpers.bodyParser
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


exports.handler = async function http(req) {
    // let body = parseBody(req) // Pass the entire request object
    // let {name, email, amount} = arc.http.helpers.bodyParser(req)
    let { email, amount, currency = 'usd'} = req.queryStringParameters

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        payment_method_types: ['card'],
        receipt_email: email
      });
    
    console.log(JSON.stringify(paymentIntent, null, 2))
    return {
        statusCode: 200,
        cors: true,
        headers: {
          'access-control-allow-origin': '*',
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Headers": "Content-Type, x-requested-with"
        },  
        body: JSON.stringify({
            status:  paymentIntent.status,
            client_secret: paymentIntent.client_secret
        })
    }
}
