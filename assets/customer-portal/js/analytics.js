import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';
var config = require('./config')();
var auth = require('./auth');

const amplifyConfig = {
    Auth: {
        identityPoolId: config.cognitoIdentityPoolId,
        region: config.region
    }
}
Auth.configure(amplifyConfig);

const analyticsConfig = {
    AWSPinpoint: {
        appId: config.pinPointAppId,
        region: config.region,
        mandatorySignIn: false,
    }
}
Analytics.configure(analyticsConfig);

export function recordEvent(event) {
    Analytics.record(event);
}

export function sendCustomerData() {

    let tokenInfo = auth.getJwtTokenDecoded();

    Analytics.record({
        name: 'Sign In',
        attributes: { userName: tokenInfo["cognito:username"], email: tokenInfo["email"] }
    });

    Analytics.updateEndpoint({
        address: tokenInfo["email"],
        attributes: {
            hobbies: ['golf', 'baseball'],
            customerType: ['VIP'],
            portfolio: ['VISA', 'Master Card', 'Premium Savings Account']
        },
        location: {
            city: 'Seattle',
            country: 'US',
            latitude: 0,
            longitude: 0,
            postalCode: '110111',
            region: 'United States'
        },
        userId: tokenInfo["cognito:username"],
        userAttributes: {
            interests: ['technology', 'arts', 'music']
        }
    });
}