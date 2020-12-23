const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: "us7",
});

async function addMember(listId, email, fname, lname) {
  return await mailchimp.lists.addListMember(listId, {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fname,
      LNAME: lname
  }})
}

exports.handler = async function http(req) {
  let { listId } = req.pathParameters
  let err = false
  let {email, fname, lname} = req.queryStringParameters
  // let {email, fname, lname} = arc.http.helpers.bodyParser(req)

  const response = await addMember(listId, email, fname, lname)
    .then(response => {
      return {
        statusCode: 201,
        cors: true,
        headers: {
          'access-control-allow-origin': '*',
          "access-control-allow-headers": ["Content-Type"],
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          listId: `${listId}`,
          email: `${email}`,
          fname: `${fname}`,
          lname: `${lname}`,
          response: response
        })
      }
    })
    .catch(error => {
      console.log(error)
      return {
        statusCode: 400,
        cors: true,
        headers: {
          'access-control-allow-origin': '*',
          "access-control-allow-headers": ["Content-Type"],
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
          error: {
            status: error.response.error.status,
            text: JSON.parse(error.response.error.text)}
          })
      }
    })

    // return response
    return {
      statusCode: 200,
      body: JSON.stringify({status: "ok"})
    }

    // if (err) {
    //   return {
    //     statusCode: 400,
    //     cors: true,
    //     headers: {
    //       'access-control-allow-origin': '*',
    //       "access-control-allow-headers": ["Content-Type"],
    //       "Content-type": "application/json; charset=UTF-8"
    //     },
    //     body: JSON.stringify({
    //       error: {
    //         status: response.response.error.status,
    //         text: JSON.parse(response.response.error.text)}
    //       })
    //   }
    // }else{
    //   return {
    //     statusCode: 201,
    //     cors: true,
    //     headers: {
    //       'access-control-allow-origin': '*',
    //       "access-control-allow-headers": ["Content-Type"],
    //       "Content-type": "application/json; charset=UTF-8"
    //     },
    //     body: JSON.stringify({
    //       listId: `${listId}`,
    //       email: `${email}`,
    //       fname: `${fname}`,
    //       lname: `${lname}`,
    //       response: response
    //     })
    //   }
    // }
}