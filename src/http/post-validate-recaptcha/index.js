const fetch = require('node-fetch')

exports.handler = async function http(req) {
  let {response} = req.queryStringParameters
  let res

  try {
    res = await fetch(`https://www.google.com/recaptcha/api/siteverify?response=${response}&secret=${process.env.RECAPTCHA_SECRET_KEY}`, {
      method: 'POST'})
      .then(res => res.json())

    return {
      statusCode: 200,
      cors: true,
      headers: {
        'access-control-allow-origin': '*',
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(res)
    }
  } catch (error) {
    return {
      statusCode: 400,
      cors: true,
      headers: {
        'access-control-allow-origin': '*',
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(error)
    }  
  }
}