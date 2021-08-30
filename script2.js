const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';

const modelo = 'ilx';
const annio = '2013';
const subVersion = '4p';



searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    textolibre = e.target.querySelector('input').value;
    searchQuery = textolibre +''+ textolibre +'' + textolibre +''+ textolibre;
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
                <h1 class="precio">Precio: ${result.venta}</h1>

        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}
