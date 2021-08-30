const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const datos = document.getElementById('datos');
const container = document.querySelector('.container');
const results = document.getElementById("results");
const lists = document.querySelectorAll("li");
let searchQuery = '';
let searchTerm = "";


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI (){
    const baseURL = `http://qantwinse.westus2.cloudapp.azure.com:8082/api/search/0/10/${searchQuery}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data);
    console.log(data);
}

function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
        `
        <div class="item">
            <h1></h1>
                <div class="flex-container">
                    <h1 class="title">${result.marca}</h1>
                    <h1 class="annio">${result.subVersion}</h1>
                    
                </div>
                <h1 class="item-data">Modelo: ${result.modelo}</h1>
                <h1 class="item-data">Año: ${result.annio}</h1>
                
                <h2 class="precio">Venta: ${result.venta}</h2>
                
               
            
                
        </div>
      
        `
        
    });
    searchResultDiv.innerHTML = generatedHTML;
};

document.addEventListener("DOMContentLoaded", function() {
  var elements = document.getElementsByTagName("INPUT");
  for (var i = 0; i < elements.length; i++) {
      elements[i].oninvalid = function(e) {
          e.target.setCustomValidity("");
          if (!e.target.validity.valid) {
              e.target.setCustomValidity("Busqueda no válida. Intenta ingresando más datos...");
          }
      };
      elements[i].oninput = function(e) {
          e.target.setCustomValidity("");
      };
  }
});

