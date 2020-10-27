import jwt_decode from 'jwt-decode';
var config = require('./config')();
var analytics = require('./analytics');

$(document).ready((a) => {
    initLogin();
});

function initCognitoSDK() {

    var authData = {
        ClientId: config.cognitoClientId,
        AppWebDomain: config.cognitoDomain,
        TokenScopesArray: ['email', 'phone', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
        RedirectUriSignIn: config.siteUrl,
        RedirectUriSignOut: config.siteUrl
    };
    var AmazonCognitoIdentity = require('amazon-cognito-auth-js');
    var auth = new AmazonCognitoIdentity.CognitoAuth(authData);

    auth.setState('ABCDXYZ');
    auth.userhandler = {
        onSuccess: function (result) {
            analytics.sendCustomerData();
            console.log("Sign in success");
        },
        onFailure: function (err) {
            console.log("Auth Error!" + err);
        }
    };
    return auth;
}

 function initLogin() {
    var auth = initCognitoSDK();
    var curUrl = window.location.href;
    auth.parseCognitoWebResponse(curUrl);
    if (!auth.isUserSignedIn()) {
        auth.getSession();
    }
}

export function getJwtToken() {
    var auth = initCognitoSDK();
    return auth.getSignInUserSession().getIdToken().getJwtToken()
}

export function getJwtTokenDecoded() {
    return jwt_decode(getJwtToken());
}

export function getAWSCredentials() {
    return new Promise(resolve => {

        var poolData = {
            UserPoolId: config.cognitoUserPoolId,
            ClientId: config.cognitoClientId,
        };
        var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, result) {

                console.log('User Session is active.');

                AWS.config.region = config.region;
                var idpUrl = 'cognito-idp.' + config.region + '.amazonaws.com/' + config.cognitoUserPoolId;

                const params = {
                    IdentityPoolId: config.cognitoIdentityPoolId,
                    Logins: {}
                };
                params.Logins[idpUrl] = result.getIdToken().getJwtToken();

                AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);

                AWS.config.credentials.refresh(error => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('AWS credentials refreshed.');
                    }
                });
                //console.log(AWS.config.credentials);
                resolve(AWS.config.credentials);
            });
        }

    });
}

export function logout() {
    if (gCognitoAuth.isUserSignedIn()) {
        localStorage.removeItem('client_id');
        gCognitoAuth.signOut();
    } else {
        alert('You are not logged in');
    }
}