const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: "us7",
});

// async function addMember(listId, email, fname, lname) {
//   let response 
//   try {
//     response = await mailchimp.lists.addListMember(listId, {
//       email_address: email,
//       status: "subscribed",
//       merge_fields: {
//         FNAME: fname,
//         LNAME: lname
//     }})
//     return response
//   } catch (error) {
//     return error
//   }
// }

exports.handler = async function http(req) {
  let { listId } = req.pathParameters
  let {email, fname, lname} = req.queryStringParameters
  let response

  try {
    response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
    }})
    // response = await addMember(listId, email, fname, lname)    
    // return {
    //   statusCode: response.status === 'subscribed' ? 201 : response.status,
    //   cors: true,
    //   headers: {
    //     'access-control-allow-origin': '*',
    //     "access-control-allow-headers": ["Content-Type"],
    //     "Content-type": "application/json; charset=UTF-8"
    //   },
    //   body: JSON.stringify({
    //     listId: `${listId}`,
    //     email: `${email}`,
    //     fname: `${fname}`,
    //     lname: `${lname}`,
    //     response: response
    //   })
    // }  
    return {
      statusCode: 200,
      body: JSON.stringify({
        listId: `${listId}`,
        email: `${email}`,
      })
    }
  } catch (error) {
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
  }
}