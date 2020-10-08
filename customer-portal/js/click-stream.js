const AWS = require('aws-sdk');
var config = require('./config')();
var auth = require('./auth');
var analytics = require('./analytics');

var kinesis;

$(document).ready((a) => {
    init();
});

async function init() {
    awsCreds = await auth.getAWSCredentials();
    kinesis = new AWS.Kinesis({ 'region': config.region, 'credentials': awsCreds });
}

var recordData = [];
var TID = null;

document.addEventListener('readystatechange', () => {
    if (document.readyState == 'interactive') {
        document.addEventListener('click', (event) => {
            logInteraction(event.target.getAttribute('define-custom-id'));
        })
    }
})

function logInteraction(elementId) {

    console.log(elementId);
    clearTimeout(TID);

    if (elementId != null) {
        let event = {
            name: elementId,
            attributes: {},
            metrics: { visit: 1 }
        }
        //Send record to Pinpoint endpoint
        analytics.recordEvent(event);

        TID = setTimeout(function () {

            var record = {
                Data: JSON.stringify({
                    customerId: '123456789',
                    userAgent: navigator.userAgent,
                    navigatorName: navigator.appVersion,
                    navigatorCookies: navigator.cookieEnabled,
                    navigatorLanguage: navigator.language,
                    navigatorPlatform: navigator.platform,
                    window: window.location.hostname,
                    action: elementId,
                    time: new Date()
                }),
                PartitionKey: 'partition-123456789'
            };
            recordData.push(record);
        }, 100);
    }
}

// upload data to Amazon Kinesis every second if data exists
setInterval(function () {
    if (!recordData.length) {
        return;
    }
    //console.log(recordData)
    // upload data to Amazon Kinesis
    kinesis.putRecords({
        Records: recordData,
        StreamName: config.kinesisStreamName
    }, function (err, data) {
        if (err) {
            console.error(err);
        }
    });
    // clear record data
    recordData = [];
}, 1000);