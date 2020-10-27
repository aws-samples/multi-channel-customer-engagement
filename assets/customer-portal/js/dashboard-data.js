/*Dashboard Init*/
 
"use strict"; 

/*****Ready function start*****/
$(document).ready(function(){
	$('#statement').DataTable({
		"bFilter": false,
		"bLengthChange": false,
		"bPaginate": false,
		"bInfo": false,
	});
	if( $('#chart_2').length > 0 ){
		var ctx2 = document.getElementById("chart_2").getContext("2d");
		var data2 = {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [
				{
					label: "My First dataset",
					backgroundColor: "rgba(240,197,65,.6)",
					borderColor: "rgba(240,197,65,.6)",
					data: [10, 30, 80, 61, 26, 75, 40]
				},
				{
					label: "My Second dataset",
					backgroundColor: "rgba(46,205,153,.6)",
					borderColor: "rgba(46,205,153,.6)",
					data: [28, 48, 40, 19, 86, 27, 90]
				},
				{
					label: "My Third dataset",
					backgroundColor: "rgba(78,157,230,.6)",
					borderColor: "rgba(78,157,230,.6)",
					data: [8, 28, 50, 29, 76, 77, 40]
				}
			]
		};
		
		var hBar = new Chart(ctx2, {
			type:"bar",
			data:data2,
			
			options: {
				tooltips: {
					mode:"label"
				},
				scales: {
					yAxes: [{
						stacked: true,
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						ticks: {
							fontFamily: "Poppins",
							fontColor:"#878787"
						}
					}],
					xAxes: [{
						stacked: true,
						gridLines: {
							color: "rgba(135,135,135,0)",
						},
						ticks: {
							fontFamily: "Poppins",
							fontColor:"#878787"
						}
					}],
					
				},
				elements:{
					point: {
						hitRadius:40
					}
				},
				animation: {
					duration:	3000
				},
				responsive: true,
				maintainAspectRatio:false,
				legend: {
					display: false,
				},
				
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Poppins'"
				}
				
			}
		});
	}
	if( $('#chart_6').length > 0 ){
		var ctx6 = document.getElementById("chart_6").getContext("2d");
		var data6 = {
			 labels: [
			"organic",
			"Referral",
			"Other"
		],
		datasets: [
			{
				data: [200,550,250],
				backgroundColor: [
					"rgba(240,197,65,.6)",
					"rgba(46,205,153,.6)",
					"rgba(78,157,230,.6)",
				],
				hoverBackgroundColor: [
					"rgba(240,197,65,.6)",
					"rgba(46,205,153,.6)",
					"rgba(78,157,230,.6)",
				]
			}]
		};
		
		var doughnutChart  = new Chart(ctx6,{
			type: 'doughnut',
			data: data6,
			options: {
				animation: {
					duration:	3000
				},
				responsive: true,
				maintainAspectRatio:false,
				legend: {
					display:false
				},
				tooltip: {
					backgroundColor:'rgba(33,33,33,1)',
					cornerRadius:0,
					footerFontFamily:"'Poppins'"
				},
				elements: {
					arc: {
						borderWidth: 0
					}
				}
			}
		});
	}
	if($('#area_chart').length > 0) {
		var data=[{
            period: 'Son',
            iphone: 10,
            ipad: 80,
            itouch: 20
        }, {
            period: 'Mon',
            iphone: 130,
            ipad: 100,
            itouch: 80
        }, {
            period: 'Tue',
            iphone: 80,
            ipad: 30,
            itouch: 70
        }, {
            period: 'Wed',
            iphone: 70,
            ipad: 200,
            itouch: 140
        }, {
            period: 'Thu',
            iphone: 180,
            ipad: 50,
            itouch: 140
        }, {
            period: 'Fri',
            iphone: 105,
            ipad: 170,
            itouch: 80
        },
         {
            period: 'Sat',
            iphone: 250,
            ipad: 150,
            itouch: 200
        }];
		var dataNew = [{
            period: 'Jan',
            iphone: 10,
            ipad: 60,
            itouch: 20
        }, 
		{
            period: 'Feb',
            iphone: 110,
            ipad: 100,
            itouch: 80
        },
		{
            period: 'March',
            iphone: 120,
            ipad: 100,
            itouch: 80
        },
		{
            period: 'April',
            iphone: 110,
            ipad: 100,
            itouch: 80
        },
		{
            period: 'May',
            iphone: 170,
            ipad: 100,
            itouch: 80
        },
		{
            period: 'June',
            iphone: 120,
            ipad: 150,
            itouch: 80
        },
		{
            period: 'July',
            iphone: 120,
            ipad: 150,
            itouch: 80
        },
		{
            period: 'Aug',
            iphone: 190,
            ipad: 120,
            itouch: 80
        },
		{
            period: 'Sep',
            iphone: 110,
            ipad: 120,
            itouch: 80
        },
		{
            period: 'Oct',
            iphone: 10,
            ipad: 170,
            itouch: 10
        },
		{
            period: 'Nov',
            iphone: 10,
            ipad: 470,
            itouch: 10
        },
		{
            period: 'Dec',
            iphone: 30,
            ipad: 170,
            itouch: 10
        }
		];
		
		var lineChart = Morris.Area({
        element: 'area_chart',
        data: data ,
        xkey: 'period',
        ykeys: ['iphone', 'ipad', 'itouch'],
        labels: ['iphone', 'ipad', 'itouch'],
        pointSize: 0,
        lineWidth:0,
		fillOpacity: 0.6,
		pointStrokeColors:['#2ecd99', '#4e9de6', '#f0c541'],
		behaveLikeLine: true,
		grid: false,
		hideHover: 'auto',
		lineColors: ['#2ecd99', '#4e9de6', '#f0c541'],
		resize: true,
		redraw: true,
		smooth: true,
		gridTextColor:'#878787',
		gridTextFamily:"Poppins",
        parseTime: false
    });
	}
});
/*****Ready function end*****/

/*****Load function start*****/
$(window).load(function(){
	window.setTimeout(function(){
		$.toast({
			heading: 'Welcome to Cloud Bank',
			text: 'Your bank on the AWS Cloud',
			position: 'top-right',
			loaderBg:'#ff9900',
			icon: 'success',
			hideAfter: 3500, 
			stack: 6
		});
	}, 3000);
});
/*****Load function* end*****/
