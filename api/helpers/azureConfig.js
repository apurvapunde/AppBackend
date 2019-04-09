// Don't commit this file to your public repos. This config is for first-run

exports.creds = {
    returnURL: 'https://localhost:3000/signin',
    identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
    clientID: 'c3b4419e-3512-4e7d-9696-021ea1bba9fe',
    clientSecret: 'QfkvJUmVNbE3FRF2yCTl9b0KP3L7vilChA2wAybZbDU=', // if you are doing code or id_token code
    skipUserProfile: true, // for AzureAD should be set to true.
    responseType: 'id_token code', // for login only flows use id_token. For accessing resources use `id_token code`
    responseMode: 'query', // For login only flows we should have token passed back to us in a POST
    //scope: ['email', 'profile'] // additional scopes you may wish to pass
};
