// JavaScript code to render the revenue growth chart using Chart.js
document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('revenueChart').getContext('2d');
    var revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06', '07/06'],
            datasets: [{
                label: 'Revenue',
                data: [200, 800, 400, 600, 300, 500, 700],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
