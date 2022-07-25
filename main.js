

// url para pegar o embed: https://publish.twitter.com/oembed?url=https://twitter.com/crosroberto/status/1548391682135113728

// Mais detalhes sobre o embed: https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed


// como instalar o node e npm e importar dependências/bibliotecas: 
// https://www.youtube.com/watch?v=7iSylg2UvU0

geraGrafico([0,0,0,0])

let termoBolsonaro = 0
let termoFraudeNasUrnas = 0
let termoLula = 0
let termoStfCorrupto = 0

let tweetEmbed = ''

const options = {
  method: 'GET',
    headers: {
      'xc-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbml0b3JmYWtlcGFyYW5hQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoidXNfbWN6cXE2N2tybTl6OWMiLCJyb2xlcyI6InVzZXIsc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNGE5YWVhMTgyNTdkYTg3MGU1MDZjMzQyZjFjMjA5NTExZmE1NWMwMThlZGM4YzMxOWU5ZjQxYTA0MDM2ZjQ5ZDgwY2VjNjU0OTJjYWE0OTAiLCJpYXQiOjE2NTg3NTc0MTEsImV4cCI6MTY1ODc5MzQxMX0.sPc1DGtW3ZOjwZI-Or85oRJr3fdGpk5737QOeljWdGA'
    }
};
async function pegaDados() {

  await fetch('http://monitor-fake.herokuapp.com/api/v1/db/data/noco/p_1t49u071lp0ie2/TweetsValidosFinais/views/TweetsValidosFinais?limit=100&offset=10&where=', options)
  .then(response => response.json())
  .then(data => {

    tweetEmbed = data['list'][0]['Embed']
    tweetEmbed2 = data['list'][1]['Embed']

    data['list'].forEach(element => {
      
      element['TermoBolsonaro'] = parseInt(element['TermoBolsonaro'])
      element['TermoLula'] = parseInt(element['TermoLula'])
      element['TermoFraudeNasUrnas'] = parseInt(element['TermoFraudeNasUrnas'])
      element['TermoStfCorrupto'] = parseInt(element['TermoStfCorrupto'])

      if (element['TermoBolsonaro'] == 1) {
        termoBolsonaro += 1
      }

      if (element['TermoLula'] == 1) {
        termoLula += 1
      }

      if (element['TermoFraudeNasUrnas'] == 1) {
        termoFraudeNasUrnas += 1
      }

      if (element['TermoStfCorrupto'] == 1) {
        termoStfCorrupto += 1
      }


    });


  })
  .catch((error) => {
    console.log(error)
  });

  // atribuindo valores fakes para algumas variaveis como teste

  termoFraudeNasUrnas = 8
  termoStfCorrupto = 15

  let listaDados = [termoBolsonaro, termoLula, termoFraudeNasUrnas, termoStfCorrupto]

  geraGrafico(listaDados)

  // function (tweetEmbed) {
  //   var parser = new DOMParser();
  //   var doc = parser.parseFromString(tweetEmbed, 'text/html');
  //   return doc.body;
  // };

  console.log(tweetEmbed);

  
  // script = doc.querySelector('script')

  inserirEmbed(tweetEmbed)
  inserirEmbed(tweetEmbed2)

  // inserirEmbed()

  

  // console.log('termoBolsonaro: ' + termoBolsonaro)
  // console.log('termoLula: ' + termoLula)
  // console.log('termoFraudeNasUrnas: ' + termoFraudeNasUrnas)
  // console.log('termoStfCorrupto: ' + termoStfCorrupto)
}

pegaDados()



function inserirEmbed(tweetEmbed) {

  let parser = new DOMParser();
  let doc = parser.parseFromString(tweetEmbed, "text/html");
  console.log(doc)
  
  blockquote = doc.querySelector('blockquote')

  document.querySelector('#termo1').appendChild(blockquote)

}


console.log(typeof termoStfCorrupto)

  // chart

function geraGrafico(listaDados) {
  
  const blue = "#095A99";
  const color = Chart.helpers.color;
  const config = {
    type: 'radar',
    data: {
      labels: ['Bolsonaro','Lula', ['Fraude', 'nas urnas'], ['STF', 'corrupto']],
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
  };
  
  window.onload = function () {
    window.myRadar = new Chart(document.getElementById('chart'), config);
  };

}



// REQUISAO POSTS AGENCIA TATURES





function carregarMaterias(numeroContainerNews) {
  fetch('https://ancoradosfatos.com.br/wp-json/wp/v2/posts')
    .then(response => response.json() )
    .then(data => {

      console.log(data)
      let tituloMateria = data[numeroContainerNews].title.rendered;
      console.log(tituloMateria)
      let urlMateria = data[numeroContainerNews].link; 
      console.log(urlMateria)
      let apiFotosMateria = data[numeroContainerNews]._links['wp:featuredmedia'][0]['href'];
      console.log(apiFotosMateria)
      // console.log(tituloMateria);
      // console.log(urlMateria);

      // pegaUrlImgPost(apiFotosMateria, numeroContainerNews) 
      
      
      fetch(apiFotosMateria)
        .then(response => response.json() )
        .then(data => {
          // console.log(data)
          let urlFotoMateria = data.source_url;
          console.log(urlFotoMateria);  

          
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
console.log(listaMaterias);

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