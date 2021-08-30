const searchBtn = document.getElementById('search-btn');
const carList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getcarList);
carList.addEventListener('click', getcarRecipe);
recipeCloseBtn.addEventListener('click', () => {
    carDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getcarList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`http://qantwinse.westus2.cloudapp.azure.com:8082/api/search/0/10/${searchQuery}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.modelo}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            carList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            carList.classList.add('notFound');
        }

        carlList.innerHTML = html;
    });
}


// get recipe of the meal
function getcarRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let carItem = e.target.parentElement.parentElement;
        fetch(`http://qantwinse.westus2.cloudapp.azure.com:8082/api/search/0/10/${searchQuery}`)
        .then(response => response.json())
        .then(data => carRecipeModal(data.cars));
    }
}

// create a modal
function carRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}