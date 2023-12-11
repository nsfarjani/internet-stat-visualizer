let internetData = {
  labels: ['Social Media', 'Entertainment', 'Work', 'Other'],
  data: [0, 0, 0, 0]
};

const ctx = document.getElementById('usageChart').getContext('2d');

function renderChart() {
  const usageChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: internetData.labels,
      datasets: [{
        label: 'Time Spent (hours)',
        data: internetData.data,
        backgroundColor: 'rgba(100, 255, 100, 1)',
        borderWidth: 4,
        borderColor: 'black',
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'TIME (IN HOURS)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'CATEGORIES'
          }
        }
      }
    }
  });

  const chartCanvas = document.getElementById('usageChart');
  chartCanvas.style.opacity = 0;
  chartCanvas.style.transition = 'opacity 4s ease-in-out';

  setTimeout(function () {
    chartCanvas.style.opacity = 1;
  }, 100);
}

function trackStats() {
  const socialMediaTime = parseFloat(document.getElementById('socialMedia').value);
  const entertainmentTime = parseFloat(document.getElementById('entertainment').value);
  const workTime = parseFloat(document.getElementById('work').value);
  const otherTime = parseFloat(document.getElementById('other').value);

  internetData.data = [
    socialMediaTime,
    entertainmentTime,
    workTime,
    otherTime
  ];

  const usageChart = Chart.getChart("usageChart");
  if (usageChart) {
    usageChart.data.datasets[0].data = internetData.data;
    usageChart.update();
  } else {
    renderChart();
  }

  const maxTime = Math.max(...internetData.data);
  const minTime = Math.min(...internetData.data);
  const differenceThreshold = 1;

  const alertBox = document.getElementById('alertBox');

  if ((maxTime - minTime) > differenceThreshold) {
    let categoryIndex = internetData.data.indexOf(maxTime);
    let categoryName = internetData.labels[categoryIndex];
    
    let alertMessage = '';
    switch (categoryName) {
      case 'Social Media':
        alertMessage = 'You have been spending more time on social media compared to others. Doom scrolling is a plague, I know...';
        break;
      case 'Entertainment':
        alertMessage = 'You have been spending the most time entertaining yourself. Are you getting all of your work done?!';
        break;
      case 'Work':
        alertMessage = 'You have been spending more time searching for work-related things. You should consider taking a break to relax and recover, if possible!';
        break;
      case 'Other':
        alertMessage = 'You have been spending more time searching other things. So unique of you...';
        break;
      default:
        alertMessage = 'You have been spending more time on a particular category compared to others.';
        break;
    }
    
    alertBox.innerHTML = alertMessage;
    alertBox.classList.add('show');
  } else {
    alertBox.classList.remove('show');
  }
}

function clearStats() {
  document.getElementById('socialMedia').value = 0;
  document.getElementById('entertainment').value = 0;
  document.getElementById('work').value = 0;
  document.getElementById('other').value = 0;

  const usageChart = Chart.getChart("usageChart");
  if (usageChart) {
    usageChart.data.datasets[0].data = [0, 0, 0, 0];
    usageChart.update();
  }

  internetData.data = [0, 0, 0, 0];

  const alertBox = document.getElementById('alertBox');
  alertBox.classList.remove('show');
}

function closeAlert() {
  const alertBox = document.getElementById('alertBox');
  alertBox.classList.remove('show');
}

document.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    trackStats();
  }
});
