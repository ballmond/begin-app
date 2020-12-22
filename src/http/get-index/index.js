let arc = require('@architect/functions')

async function http(req) {
  console.log('indexxxxxxxxxxxxx')
  return {
    cors: true,
    headers: {
      'access-control-allow-origin': '*',
      "access-control-allow-headers": ["Content-Type"],
      "Content-type": "application/json; charset=UTF-8"
    }
  }
}exports.handler = arc.http.async(http)