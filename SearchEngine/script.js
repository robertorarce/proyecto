const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';



searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI (){
    const baseURL = `https://searchenginetest.azurewebsites.net/api/getSe_autos/${searchQuery}`;
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
                
                <h2 class="precio">Venta: ${result.venta}</h2>
                <h2 class="precio">Promedio de Venta: ${result.promedioVenta}</h2>
            
                
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}

