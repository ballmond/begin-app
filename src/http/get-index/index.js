let arc = require('@architect/functions')

async function http(req) {
  return {
    cors: true,
    body: JSON.stringify({ hello: 'world' })
  }
}exports.handler = arc.http.async(http)