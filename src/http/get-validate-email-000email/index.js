function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
exports.handler = async function http(req) {
  let { email } = req.pathParameters

  return {
    statusCode: 200,
    cors: true,
    headers: {
      'access-control-allow-origin': '*',
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      valid: validateEmail(email),
      email: email
    })
  }
}