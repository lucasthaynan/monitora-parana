

// url para pegar o embed: https://publish.twitter.com/oembed?url=https://twitter.com/crosroberto/status/1548391682135113728

// Mais detalhes sobre o embed: https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed


// como instalar o node e npm e importar dependências/bibliotecas: 
// https://www.youtube.com/watch?v=7iSylg2UvU0


// fetch('https://raw.githubusercontent.com/lucasthaynan/litrometro/main/api/dados_do_dia_litrometro.json')
//   .then(response => response.json() )
//   .then(data => {




// OCULTANDO TODOS OS GRAFICOS DA PÁGINA
// document.querySelectorAll('.grafico-js').forEach(grafico => {
//   // ocultando cada um dos gráficos
//   grafico.style.display = 'none';

// });

// DESOCULTANDO O GRÁFICO DA ULTIMA SEMANA
// document.getElementById("chart-semana").style.display="block";

let btn30Dias = document.getElementById('ultimo-mes')

let btn7Dias = document.getElementById('ultima-semana')

btn30Dias.addEventListener('click', e => {

  geraGrafico(listaDadosMes)
  console.log(listaDadosMes)

  document.getElementById("ultima-semana").classList.remove('ativo')
  document.getElementById("ultimo-mes").classList.add('ativo')
  // console.log(e)

  // document.getElementById("chart-semana").style.display="none";
  // document.getElementById("chart-mes").style.display="block";
    
})

btn7Dias.addEventListener('click', e => {
  // console.log(e)
  geraGrafico(listaDadosSemana)
  console.log(listaDadosSemana)
  document.getElementById("ultima-semana").classList.add('ativo')
  document.getElementById("ultimo-mes").classList.remove('ativo')
    
})

function getDateTime(quantDiaAnterior) {
  var now     = new Date();

  if (quantDiaAnterior >=1) {
    now.setDate(now.getDate() - quantDiaAnterior); // pegando data de um dia anterior a hoje
  } 
  var year    = now.getFullYear();
  var month   = now.getMonth()+1; 
  var day     = now.getDate();

  if(month.toString().length == 1) {
       month = '0'+month;
  }
  if(day.toString().length == 1) {
       day = '0'+day;
  }   

  var dateTime = year+'-'+month+'-'+day
  // console.log(dateTime)
  return dateTime
}


let listaDiasUltimaSemana = []
let diasSemanaAnterior = [0,1,2,3,4,5,6]

let listaDiasUltimoMes = []
let diasMesAnterior = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]

function ultimaSemana() { 
  diasSemanaAnterior.forEach(dia => {
    listaDiasUltimaSemana.push(getDateTime(dia))
  })
}

function ultimaMes() { 
  diasMesAnterior.forEach(dia => {
    listaDiasUltimoMes.push(getDateTime(dia))
  })
}


ultimaMes()
ultimaSemana()


let termo1Semana = 0
let termo2Semana = 0
let termo3Semana = 0
let termo4Semana = 0

let termo1Mes = 0
let termo2Mes = 0
let termo3Mes = 0
let termo4Mes = 0

let listaDadosSemana = []
let listaDadosMes = []


let idTweet = 0
let tweetsUltimaSemana = {}
let tweetsUltimoMes = {}

let embedsTweets = {}


// fetch('data_tweets_finais.json')
//   .then(response => response.json())
//   .then(data => {

//     data.forEach(element => {
//       // console.log(element);
//       let idTweetAtual = idTweet
//       idTweet += 1
//       let data = element['DataPublicacao'].split(' ')
//       // console.log(data)


//       if (listaDiasUltimaSemana.includes(data[0])) {

//         if (element['Termo1'] == 1) {
//           termo1Semana += 1
//         }
    
//         if (element['Termo2'] == 1) {
//           termo2Semana += 1
//         }
    
//         if (element['Termo3'] == 1) {
//           termo3Semana += 1
//         }
    
//         if (element['Termo4'] == 1) {
//           termo4Semana += 1
//         }

//       tweetsUltimaSemana[idTweetAtual] = { 
//           'tweet': element['Tweet'],
//           'data': data[0],
//           'termo1': element['Termo1'],
//           'embed': element['Embed'],
//       }     

//     }

//     if (listaDiasUltimoMes.includes(data[0])) {

//       if (element['Termo1'] == 1) {
//         termo1Mes += 1
//       }
  
//       if (element['Termo2'] == 1) {
//         termo2Mes += 1
//       }
  
//       if (element['Termo3'] == 1) {
//         termo3Mes += 1
//       }
  
//       if (element['Termo4'] == 1) {
//         termo4Mes += 1
//       }

//       tweetsUltimoMes[idTweetAtual] = { 
//         'tweet': element['Tweet'],
//         'data': data[0],
//         'termo1': element['Termo1'],
//         'embed': element['Embed'],
//     }


//     }
//   })

//       listaDadosSemana = [termo1Semana,
//                                   termo2Semana,
//                                   termo3Semana,
//                                   termo4Semana]
    
//       listaDadosMes = [termo1Mes,
//                             termo2Mes,
//                             termo3Mes,
//                             termo4Mes]
    
//     // document.getElementById("chart-semana").style.display="block";
//     // geraGrafico(listaDadosSemana, 'semana')
//     geraGrafico(listaDadosSemana)
//     // geraGrafico(listaDadosMes)

//   })

// ---------------------------------

let contagemTermo1 = 1
let contagemTermo2 = 1
let contagemTermo3 = 1
let contagemTermo4 = 1


// convertendo arquivo csv em arrays
var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMxyrSHWBwhKF9YfpIZFFzYs_5h3FT873w4PVz6dz9bN08u9fpJpnuXNC_s9657b_ZOUsa6Xb4OfTY/pub?gid=0&single=true&output=csv";

const response = fetch(url)
   .then(response => response.text())
   .then(v => Papa.parse(v))
   .catch(err => console.log(err))

response.then(resultado => {
  console.log(resultado['data'])


  // ignorando o primeiro elemento da lista de array (cabeçalho)
  let dadosCsv = resultado['data'].filter((element, index) => index >= 1);

  dadosCsv.forEach(element => {
    
    let idTweetAtual = idTweet
    idTweet += 1
    let data = element[5].split(' ')

    if (element[12] == 1 && contagemTermo1 <=4) {
      embedsTweets[idTweetAtual] = {
        'id': idTweetAtual, 
        'termo1': 'sim',
        'termo1-embed': element[16]
      }
      contagemTermo1 += 1
    }

    if (element[13] == 1 && contagemTermo2 <=4) {
      embedsTweets[idTweetAtual] = {
        'id': idTweetAtual, 
        'termo2': 'sim',
        'termo2-embed': element[16]
      }
      contagemTermo2 += 1
    }
    if (element[14] == 1 && contagemTermo3 <=4) {
      embedsTweets[idTweetAtual] = {
        'id': idTweetAtual, 
        'termo3': 'sim',
        'termo3-embed': element[16]
      }
      contagemTermo3 += 1
    }
    if (element[15] == 1 && contagemTermo4 <=4) {
      embedsTweets[idTweetAtual] = {
        'id': idTweetAtual, 
        'termo4': 'sim',
        'termo4-embed': element[16]
      }
      contagemTermo4 += 1
    }



    // embedsTweets[]

    if (listaDiasUltimaSemana.includes(data[0])) {

      if (element[12] == 1) {
        termo1Semana += 1
      }
  
      if (element[13] == 1) {
        termo2Semana += 1
      }
  
      if (element[14] == 1) {
        termo3Semana += 1
      }
  
      if (element[15] == 1) {
        termo4Semana += 1
      }

      tweetsUltimaSemana[idTweetAtual] = { 
          'tweet': element[0],
          'data': data[0],
          'termo1': element[12],
          'embed': element[16],
      }     

    }

    if (listaDiasUltimoMes.includes(data[0])) {

      if (element[12] == 1) {
        termo1Mes += 1
      }
  
      if (element[13] == 1) {
        termo2Mes += 1
      }
  
      if (element[14] == 1) {
        termo3Mes += 1
      }
  
      if (element[15] == 1) {
        termo4Mes += 1
      }

      tweetsUltimoMes[idTweetAtual] = { 
        'tweet': element[0],
        'data': data[0],
        'termo1': element[12],
        'embed': element[16],
    }


  }
  

  })



  listaDadosSemana = [termo1Semana,
                          termo2Semana,
                          termo3Semana,
                          termo4Semana]

  listaDadosMes = [termo1Mes,
                        termo2Mes,
                        termo3Mes,
                        termo4Mes]

  geraGrafico(listaDadosSemana)
  // geraGrafico(listaDadosMes)
  inserindoEmbedsPaginas(embedsTweets)

})

function inserindoEmbedsPaginas(embedsTweets){
  Object.values(embedsTweets).forEach(embed => {
    console.log(embed);
    console.log(Object.keys(embed)[1])

    if (Object.keys(embed)[1] == 'termo1') {
      inserirEmbed(Object.values(embed)[2], 'termo1')
    }
    if (Object.keys(embed)[1] == 'termo2') {
      inserirEmbed(Object.values(embed)[2], 'termo2')
    }
    if (Object.keys(embed)[1] == 'termo3') {
      inserirEmbed(Object.values(embed)[2], 'termo3')
    }
    if (Object.keys(embed)[1] == 'termo4') {
      inserirEmbed(Object.values(embed)[2], 'termo4')
    }
  })
}
// embedsTweets.forEach

// inserirEmbed(tweetEmbed)

function inserirEmbed(tweetEmbed, termoId) {

  let tweetElement = document.getElementById(termoId);
  let creatElement = document.createElement('div');

  creatElement.innerHTML = tweetEmbed
  
  tweetElement.appendChild(creatElement)

}



  // chart

// function geraGrafico(listaDados, periodo) {
//   var grafico = new Chart('chart-'+periodo, {
//     type: "radar",
//     data: {
//       // valores do eixo X
      
//       labels: ['Fake','Corrupto', 'Fraude', 'Roubou'],        
//       datasets: [
//         {
//         // valores do eixo Y
//         data: listaDados,
//         borderColor: '#E9A82F',
//         fill: true,
//         label: 'testando'
//       }       
//     ]},
//     options: {
//       scales: { 
//         r: {
//           grid: {
//               circular: true
//           },
//           beginAtZero: true
//                   }},
//       legend: {
//         display: false
//       },

//       interaction: {
//           intersect: false,
//           mode: 'index',
//       },

//       plugins: {
//         legend: {
//             labels: {
//                 font: {
//                     size: 16,                    
//                 }
//             }
//         }
//       },     

//     }
//   });   

//   return grafico;
// }

function recriandoGrafico () {
  // apagando e recriando o elemento 'canvas' para resetar os dados do gráfico
  let chartElement = document.getElementById("chart");    
  chartElement.remove();

  let canvaElement = document.createElement('canvas');

  canvaElement.setAttribute("id", "chart");
  canvaElement.setAttribute("class", "grafico_chart_js");
  canvaElement.setAttribute("width", 400);
  canvaElement.setAttribute("height", 300)
  
  document.querySelector(".radar-chart").appendChild(canvaElement);  

}

function geraGrafico(listaDados) {
  recriandoGrafico() 


  const blue = "#095A99";
  const color = Chart.helpers.color;
    
  var grafico = new Chart('chart', {
    type: 'radar',
    data: {
      labels: ['Fake','Corrupto', 'Fraude', 'Roubou'],
      datasets: [{
        label: 'Citações do termo',
        backgroundColor: color(blue).alpha(0.2).rgbString(),
        borderColor: blue,
        pointBackgroundColor: blue,
        data: listaDados
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
  });
  return grafico

}


// function geraGraficoMes(listaDados) {
  
//   const blue = "#095A99";
//   const color = Chart.helpers.color;
//   const config = {
//     type: 'radar',
//     data: {
//       labels: ['Fake','Corrupto', 'Fraude', 'Roubou'],
//       datasets: [{
//         label: 'Citações do termo',
//         backgroundColor: color(blue).alpha(0.2).rgbString(),
//         borderColor: blue,
//         pointBackgroundColor: blue,
//         data: listaDados
//       }]
//     },
//     options: {
//       scales: { // <-- Note change in options from scale to scales
//           r: {
//             grid: {
//                circular: true
//             },
//             beginAtZero: true
//           }
//       }
//     }
//   };
  
//   window.onload = function () {
//     window.myRadar = new Chart(document.getElementById('chart'), config);
//   };

// }


// REQUISAO POSTS ANCORA DOS FATOS

function carregarMaterias(numeroContainerNews) {
  fetch('https://ancoradosfatos.com.br/wp-json/wp/v2/posts')
    .then(response => response.json() )
    .then(data => {

      let tituloMateria = data[numeroContainerNews].title.rendered;

      let urlMateria = data[numeroContainerNews].link; 

      let apiFotosMateria = data[numeroContainerNews]._links['wp:featuredmedia'][0]['href'];
     
      
      fetch(apiFotosMateria)
        .then(response => response.json() )
        .then(data => {

          let urlFotoMateria = data.source_url;
          
          document.querySelectorAll('.lista-noticias img')[numeroContainerNews].src = urlFotoMateria;
          // console.log()
          document.querySelectorAll('.lista-noticias a')[numeroContainerNews].href = urlMateria;
          document.querySelectorAll('.lista-noticias h2')[numeroContainerNews].innerHTML = tituloMateria;

        })
        .catch((error) => {
          console.log(error)
      });

      
          
        
    })
    .catch((error) => {
      console.log(error)
    });
}

let listaMaterias = [0,1,2,3];
// console.log(listaMaterias);

for (let materia in listaMaterias) {
  carregarMaterias(materia)
}


// function pegaUrlImgPost(apiFotosMateria, numeroContainerNews) {
//   fetch(apiFotosMateria)
//     .then(response => response.json() )
//     .then(data => {
//       // console.log(data)
//       let urlFotoMateria = data.source_url;
//       console.log(urlFotoMateria);  

      
      

//     })
//     .catch((error) => {
//       console.log(error)
//     });
// }

// function atualizarMateriaPagina(urlFotoMateria, tituloMateria){
//   // ADICIONANDO URL DA MATERIA E FOTOS NA PAGINA        

//   document.querySelectorAll('.lista-noticias img')[numeroContainerNews].src = urlFotoMateria;
//   console.log()
//   // document.querySelectorAll('section.noticias .news > a')[numeroContainerNews].href = urlMateria;
//   document.querySelectorAll('.lista-noticias h2')[numeroContainerNews].innerHTML = tituloMateria;
// }



// const options = {
//   method: 'GET',
//   headers: {
//     'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbml0b3JmYWtlcGFyYW5hQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoidXNfbWN6cXE2N2tybTl6OWMiLCJyb2xlcyI6InVzZXIsc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNGE5YWVhMTgyNTdkYTg3MGU1MDZjMzQyZjFjMjA5NTExZmE1NWMwMThlZGM4YzMxOWU5ZjQxYTA0MDM2ZjQ5ZDgwY2VjNjU0OTJjYWE0OTAiLCJpYXQiOjE2NTkwMzE2NjcsImV4cCI6MTY1OTA2NzY2N30.tHjRzKPhtO9d74tNLk2szyInfTFz4rYXhuprz49JShU'
//   }
// };
// async function pegaDados() {

//   await fetch('http://monitor-fake.herokuapp.com/api/v1/db/data/noco/p_1t49u071lp0ie2/TweetsValidosFinais/views/TweetsValidosFinais?limit=100&offset=10&where=', options)
//   .then(response => response.json())
//   .then(data => {

//     tweetEmbed = data['list'][0]['Embed']
//     tweetEmbed2 = data['list'][1]['Embed']

//     data['list'].forEach(element => {
      
//       element['Termo1'] = parseInt(element['Termo1'])
//       element['Termo2'] = parseInt(element['Termo2'])
//       element['Termo3'] = parseInt(element['Termo3'])
//       element['Termo4'] = parseInt(element['Termo4'])

//       if (element['Termo1'] == 1) {
//         termoLula += 1
//       }

//       if (element['Termo2'] == 1) {
//         termoBolsonaro += 1
//       }

//       if (element['Termo3'] == 1) {
//         termoFraudeNasUrnas += 1
//       }

//       if (element['Termo4'] == 1) {
//         termoStfCorrupto += 1
//       }


//     });


//   })
//   .catch((error) => {
//     console.log(error)
//   });

  // atribuindo valores fakes para algumas variaveis como teste

  // termoFraudeNasUrnas = 8
  // termoStfCorrupto = 15

  

  // geraGrafico(listaDados)

  // function (tweetEmbed) {
  //   var parser = new DOMParser();
  //   var doc = parser.parseFromString(tweetEmbed, 'text/html');
  //   return doc.body;
  // };

  // console.log(tweetEmbed);

  
  // script = doc.querySelector('script')

  // inserirEmbed(tweetEmbed)
  // inserirEmbed(tweetEmbed2)

  // inserirEmbed()

  

  // console.log('termoBolsonaro: ' + termoBolsonaro)
  // console.log('termoLula: ' + termoLula)
  // console.log('termoFraudeNasUrnas: ' + termoFraudeNasUrnas)
  // console.log('termoStfCorrupto: ' + termoStfCorrupto)


// pegaDados()
