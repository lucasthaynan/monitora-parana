// como instalar o node e npm e importar dependências/bibliotecas: 
// https://www.youtube.com/watch?v=7iSylg2UvU0
const options = {
    method: 'GET',
    headers: {
      'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx1Y2FzdGhheW5hbi5tY3pAZ21haWwuY29tIiwiZmlyc3RuYW1lIjpudWxsLCJsYXN0bmFtZSI6bnVsbCwiaWQiOiJ1c19wM2Voc2JibGJ5NDN6cyIsInJvbGVzIjoidXNlcixzdXBlciIsInRva2VuX3ZlcnNpb24iOiI0ZjAyODU1YTVmZTE2YWIwM2YwNTY1YTlhNjMzMTA3NTIyNzEyZTZhZTJiN2Q4NmU1ODUxOGE1NjU5OTg5NDY0NzQwMTcyZDE3NTNlYWQzOSIsImlhdCI6MTY1Nzc2MTc4MywiZXhwIjoxNjU3Nzk3NzgzfQ.w5gIgKDNk4-N5YrUuOTnlLrESTjyMfAM8InY7e1jB9w'
    }
  };
  
  fetch('http://banco-de-dados-nocodb.herokuapp.com/api/v1/db/data/noco/p_9g3vr0y0yu9h2k/PGina1/views/PGina1?limit=25&offset=0&where=', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


  // chart

  const red = "rgb(255, 99, 132)";
  const color = Chart.helpers.color;
  const config = {
    type: 'radar',
    data: {
      labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
      datasets: [{
        label: 'My dataset',
        backgroundColor: color(red).alpha(0.2).rgbString(),
        borderColor: red,
        pointBackgroundColor: red,
        data: [
          80,
          90,
          60,
          65,
          78,
          97,
          55
        ]
      }]
    },
    options: {
      scales: { // <-- Note change in options from scale to scales
          r: {
            grid: {
               circular: true
            },
            beginAtZero: true
          }
      }
    }
  };
  
  window.onload = function () {
    window.myRadar = new Chart(document.getElementById('chart'), config);
  };