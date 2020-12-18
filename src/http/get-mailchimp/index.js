import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: "34d92ccdef910010d471b201e58c849b-us7",
  server: "us7",
});

exports.handler = async function http (req) {
    const response = await mailchimp.ping.get();
    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({"message": response})
    }
  }