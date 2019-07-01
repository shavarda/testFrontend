var transactionsApp = angular.module('transactionsApp', []);
transactionsApp.controller('transactionsController', function ($scope) {
    $scope.list = transactions;
});

var methodApp = angular.module('methodApp', []);
methodApp.controller('methodController', function ($scope) {
    let methods = [];
    let methodNumber = [];
    let methodsObj = [];
    let count = 0;
    
    for (let i = 0; i < transactions.length; i++) {
        if (methods.indexOf(transactions[i].transaction.payment_method.name) === -1) {
            methods.push(transactions[i].transaction.payment_method.name);
            methodsObj[count] = {
                name: transactions[i].transaction.payment_method.name,
                number: 0
            }
            count++;
        }
    }
    
    for (let i = 0; i < transactions.length; i++) {
        for (let j = 0; j < methodsObj.length; j++) {
            if (transactions[i].transaction.payment_method.name === methodsObj[j].name) {
                methodsObj[j].number++;
            }
        }
    }
    
    for (let i = 0; i < methodsObj.length; i++) {
        methodNumber.push(parseInt(methodsObj[i].number));
    }
    
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: methods,
            datasets: [{
                data: methodNumber,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(90, 159, 64, 0.2)',
                    'rgba(40, 1, 40, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(90, 159, 64)',
                    'rgba(40, 1, 40)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
    
    $scope.list = methodsObj;
});