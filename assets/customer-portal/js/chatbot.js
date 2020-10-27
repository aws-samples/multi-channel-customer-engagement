var config = require('./config')();

$(document).ready((a) => {

    connect.ChatInterface.init({
        containerId: 'root', // This is the id of the container where you want the widget to reside
        headerConfig: {
            isHTML: true,
            render: () => {
                return (`
                <div class="header-wrapper">
                    <h2 class="welcome-text">Cloud Bank Bot</h2>
                </div>
            `)
            }
        }
    });

    connect.ChatInterface.initiateChat({
        name: "John Doe",
        username: "demo-user",
        region: config.region,
        apiGatewayEndpoint: config.apiGatewayEndpoint + '/connect-chat',
        contactAttributes: JSON.stringify({
            "customerName": "John Doe"
        }),
        contactFlowId: config.connectContactFlowId,
        instanceId: config.connectInstanceId
    }, successHandler, failureHandler);
});

function successHandler(chatSession) {
    console.log("success!");
    $('#section-chat').fadeIn(400);

    chatSession.onChatDisconnected(function (data) {
        $('#section-chat').hide('slide');
    });
}

function failureHandler(error) {
    console.log("There was an error: ");
    console.log(error);
}