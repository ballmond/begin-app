@app
corsapp

@static

@http
get /
get /mailchimp
get /mailchimp/list
get /validate/email/:email
post /mailchimp/addListMember/:listId
post /validate/recaptcha
post /payment