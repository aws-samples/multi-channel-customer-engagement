var config = require('./config')();
var auth = require('./auth');

$(document).ready(function () {
    loadTables();
});

function loadTables() {
    loadHeader();
    loadBotInteractions();
    loadVoiceInteractions();
    loadWebInteractions();
}

function loadHeader() {
    var lblCustomerId = document.getElementById("lbl-customer-id");
    lblCustomerId.innerHTML = "Customer ID: " + getUrlParameter('idclientes')
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '123456789' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function loadBotInteractions() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(this.responseText);

            var table = document.getElementById("dt-bot-interactions");
            var totalBotInteractions = 0;
            var lblTotalBot = document.getElementById("lbl-total-bot");

            Object.keys(obj.Items).forEach(function (key) {
                var item = obj.Items[key];
                console.log(item);
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                cell1.innerHTML = item.interactionDateTime;
                cell2.innerHTML = item.botName;
                cell3.innerHTML = item.intentName;
                cell4.innerHTML = item.message;
                cell5.innerHTML = item.botResponse;
                totalBotInteractions += 1;
            });

            lblTotalBot.innerText = totalBotInteractions;
        }
    };
    var token = auth.getJwtToken();
    xhttp.open("POST", config.apiGatewayEndpoint + "/chatbot");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xhttp.send(JSON.stringify({ "customerId": getUrlParameter('customerId') }));
}

function loadWebInteractions() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(this.responseText);

            var table = document.getElementById("dt-app-interactions");
            var totalAppInteractions = 0;
            var lblTotalApp = document.getElementById("lbl-total-app");

            Object.keys(obj.Items).forEach(function (key) {
                var item = obj.Items[key];
                console.log(item);
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                cell1.innerHTML = item.interactionDateTime;
                cell2.innerHTML = item.interactionType;
                cell3.innerHTML = item.interactionData.window
                cell4.innerHTML = item.interactionData.action
                cell5.innerHTML = item.interactionData.userAgent
                cell6.innerHTML = JSON.stringify(item.interactionData, null, 2)
                totalAppInteractions += 1;
            });

            lblTotalApp.innerText = totalAppInteractions;
        }
    };
    var token = auth.getJwtToken();
    xhttp.open("POST", config.apiGatewayEndpoint + "/app");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xhttp.send(JSON.stringify({ "customerId": getUrlParameter('customerId') }));
}

function loadVoiceInteractions() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(this.responseText);
            console.log(obj);
            //console.log(typeof obj);

            var table = document.getElementById("dt-voice-interactions");
            var totalVoiceInteractions = 0;
            var lblTotalVoice = document.getElementById("lbl-total-voice");

            Object.keys(obj.Items).forEach(function (key) {
                var item = obj.Items[key];
                console.log(item);
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                cell1.innerHTML = item.interactionDateTime;
                cell2.innerHTML = item.sentiment;
                cell3.innerHTML = parseFloat(item.positive * 100).toFixed(2);
                cell4.innerHTML = parseFloat(item.negative * 100).toFixed(2);
                cell5.innerHTML = parseFloat(item.neutral * 100).toFixed(2);
                cell6.innerHTML = parseFloat(item.mixed * 100).toFixed(2);
                cell7.innerHTML = item.transcript;
                totalVoiceInteractions += 1;
            });

            lblTotalVoice.innerText = totalVoiceInteractions;
        }
    };
    var token = auth.getJwtToken();
    xhttp.open("POST", config.apiGatewayEndpoint + "/voice");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xhttp.send(JSON.stringify({ "customerId": getUrlParameter('customerId') }));
}