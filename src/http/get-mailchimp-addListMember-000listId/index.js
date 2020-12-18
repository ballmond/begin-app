const mailchimp = require("@mailchimp/mailchimp_marketing");
let arc = require('@architect/functions')

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: "us7",
});

exports.handler = async function http(req) {
  let { listId } = req.pathParameters
  let {email, fname, lname} = arc.http.helpers.bodyParser(req)

  const response = await mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fname,
      LNAME: lname
    }
  });

  return {
    statusCode: 200,
    cors: true,
    headers: {
      'access-control-allow-origin': '*',
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      listId: `${listId}`,
      fname: `${fname}`,
      lname: `${lname}`,
      id: response.id
    })
  }
}