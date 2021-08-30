const searchInput = document.getElementById("search");
const results = document.getElementById("results");
const lists = document.querySelectorAll("li");

let searchTerm = "";
let MarcaList;

async function getMarcaList() {
  const res = await fetch("https://searchenginetest.azurewebsites.net/api/getSe_autos/acura/ilx/2013/4p");
  MarcaList = await res.json();

  // console.log(contactList);
}




getMarcaList();

function showMarca() {
  results.innerHTML = "";

  const ul = document.createElement("ul");

  MarcaList
    .filter((list) =>
      list.marca.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .forEach((list) => {
      const li = document.createElement("li");
      const i = document.createElement("i");

      i.classList.add("fa", "fa-book", "list-icon");

      li.appendChild(i);

      const name = document.createTextNode(`${list.marca} | ${list.modelo} | ${list.annio} | ${list.subVersion}`);

      li.appendChild(name);

      ul.appendChild(li);
    });

  results.appendChild(ul);
}


searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;

  if (searchTerm !== "" && searchTerm !== " ") {
    showMarca();
  } else {
    results.innerHTML = "";
  }
});
