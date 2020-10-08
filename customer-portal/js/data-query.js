var config = require('./config')();
var auth = require('./auth');

$(document).ready((a) => {
   var interval = setInterval(function () {
        UpdateData();
    }, config.dataRefreshInterval);
});

function refreshBar() {
    var progressAnim = $('.progress-anim');
    if (progressAnim.length > 0) {
        for (var i = 0; i < progressAnim.length; i++) {
            var $this = $(progressAnim[i]);
            $this.waypoint(function () {
                var progressBar = $(".progress-anim .progress-bar");
                for (var i = 0; i < progressBar.length; i++) {
                    $this = $(progressBar[i]);
                    $this.css("width", $this.attr("aria-valuenow") + "%");
                }
            }, {
                triggerOnce: false,
                offset: 'bottom-in-view'
            });
        }
    }
}

function UpdateData() {
    console.log('Data updated');

    var culture = 'en-US';
    var dateFormatShort = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };

    var xmlhttp = new XMLHttpRequest();
    var url = config.apiGatewayEndpoint + '/customer'
    var token = auth.getJwtToken();
    
    var params = {
        "customerId": "123456789"
    }

    xmlhttp.open('POST', url);
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + token);
    xmlhttp.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            //console.log(data);
            Object.keys(data.Items).forEach(function (key) {
                var item = data.Items[key];
                var dueDate = new Date(item.PaymentDueDate);
                var creditUsagePct = (item.BalanceCredit / item.CreditLimit) * 100;
                document.getElementById('CustomerName').innerHTML = item.FirstName + ' ' + item.LastName;
                document.getElementById('PIN').innerHTML = 'PIN: ' + item.Pin;
                document.getElementById('SavingsAccountBalance').innerHTML = new Intl.NumberFormat(culture).format(item.Balance);
                document.getElementById('CreditCardBalance').innerHTML = new Intl.NumberFormat(culture).format(item.BalanceCredit);
                document.getElementById('CreditCardDueDate').innerHTML = dueDate.toLocaleDateString(culture, dateFormatShort);
                document.getElementById('CreditUsage').innerHTML = creditUsagePct.toFixed(0);
                $('#CreditUsageBar').attr('aria-valuenow', creditUsagePct.toFixed(0))
                refreshBar();
            });
        } else {
            console.log('Could not read data');
        }
    };
    xmlhttp.send(JSON.stringify(params));

}