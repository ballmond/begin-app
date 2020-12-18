const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: "us7",
});

exports.handler = async function http (req) {
    const { name } = req.queryStringParameters

    const response = await mailchimp.lists.getAllLists()
    var picked = response.lists.find(o => o.name === decodeURI(name));

    return {
        statusCode: 200,
        cors: true,
        headers: {
          "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(picked)
      }
  
  }