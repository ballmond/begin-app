exports.handler = async function http(req) {
  return {
    cors: true,
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "access-control-allow-headers": ["Content-Type", "Access-Control-Allow-Origin"]
    }
  }
}