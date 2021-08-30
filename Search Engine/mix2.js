const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const datos = document.getElementById('datos');
const container = document.querySelector('.container');
const results = document.getElementById("results");
const text = document.querySelectorAll("tx");

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
    let result;
    container.classList.remove('initial');
    let generatedHTML = '';
    let array = [];
    searchQuery.split(' ').forEach(txt => {
        if(typeof txt === 'string'){
        array = [...array,txt.toUpperCase()];
        } else {
            array = [...array,txt]; 
        }
    });
    results.forEach(resultado=>{
    	let bandera = false;
    	let tmp = [];
        Object.values(resultado).forEach(tmp2 => {
            if(typeof tmp2 === 'string'){
                tmp = [...tmp,tmp2.toUpperCase()];
            } else {
                tmp = [...tmp,tmp2];
            }
        });
    	array.forEach(palabra =>{
    		let palabraTmp;

    		if(palabra.length === 4){
    			palabraTmp = parseInt(palabra);

    			if(isNaN(palabraTmp)){
    				palabraTmp = palabra;
    			}
    		}else{
    			palabraTmp = palabra;
    		}


    		if(tmp.includes(palabraTmp)){
    			bandera = true
    			return;
    		}else if(tmp[2].includes(palabraTmp)){
			bandera = true
			return;
		}else{
			bandera = false;
			return;
		}

	})
	if(bandera){
       if (!result){
        result = {
            ...resultado
        }
       }
        
		return;
	}

    });
    generatedHTML =
    `
    <div class="item">
        <div class="flex-container">
            
        
        <p>Tu busqueda: ${searchQuery}</p>
        <p>Resultados de Busqueda: ${results.length}</p>
        </div>
        <h1> Resultado:<br>${result.marca} | ${result.modelo} | ${result.annio} | ${result.subVersion}</h1><br>
        <h1>Precio de Compra: $${result.precioCompra}</h1>
        <h1>Venta Promedio: $${result.promedioVenta}</h1>
        <h1>Venta Frecuente: $${result.venta}</h1>
       </div>
       
    
        
</div>
    <div class="resuldata">
   
        <a href="index2.html"><button class="btn btn-danger">NUEVA BUSQUEDA</button></a>
    `
    searchResultDiv.innerHTML = generatedHTML;
};




document.addEventListener("DOMContentLoaded", function() {
  var elements = document.getElementsByTagName("INPUT");
  for (var i = 0; i < elements.length; i++) {
      elements[i].oninvalid = function(e) {
          e.target.setCustomValidity("");
          if (!e.target.validity.valid) {
              e.target.setCustomValidity("Busqueda Incompleta. Necesitas ingresar más datos...");
          }
      };
      elements[i].oninput = function(e) {
          e.target.setCustomValidity("");
      };
  }
});