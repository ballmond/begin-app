let arc = require('@architect/functions')

async function http(req) {
  return {
    body: JSON.stringify({ hello: 'world' })
  }
}exports.handler = arc.http.async(http)