let currentRecipesArray = [];

//Fonction asynchrone d'initialisation qui crée les recettes et remplit les filtres
function init() {
    recipes.forEach(recipe => {
        createRecipe(recipe);
    });
    fillFilters(recipes);
    document.querySelector(".nb-recipes span").textContent = recipes.length;
}

//Au chargement de la page, on lance init
window.onload = () => {
    init();
    initEvents();
};

//Création de chaque recette
function createRecipe(recipe) {
    const recipesSection = document.querySelector(".recipes");
    const article = document.createElement("article");
    article.classList.add("recipe-block");
    const imgRecipe = document.createElement("img");
    imgRecipe.setAttribute("src", "./assets/photos/" + recipe["image"]);
    imgRecipe.setAttribute("alt", "Photo de la recette " + recipe["name"]);
    const divDuration = document.createElement("div");
    divDuration.classList.add("duration");
    divDuration.textContent = recipe["time"] + "min";
    const divRecipe = document.createElement("div");
    divRecipe.classList.add("container-recipe");
    const titleRecipe = document.createElement("h1");
    titleRecipe.textContent = recipe["name"];
    const h2Recipe = document.createElement("h2");
    h2Recipe.textContent = "Recette";
    const pRecipe = document.createElement("p");
    pRecipe.classList.add("recipe-text");
    pRecipe.textContent = recipe["description"];
    const h2Ingredients = document.createElement("h2");
    h2Ingredients.textContent = "Ingrédients";
    const divIngredients = document.createElement("div");
    divIngredients.classList.add("block-ingredients");
    const ul = document.createElement("ul");

    recipesSection.appendChild(article);
    article.appendChild(imgRecipe);
    article.appendChild(divDuration);
    article.appendChild(divRecipe);
    divRecipe.appendChild(titleRecipe);
    divRecipe.appendChild(h2Recipe);
    divRecipe.appendChild(pRecipe);
    divRecipe.appendChild(h2Ingredients);
    divRecipe.appendChild(divIngredients);

    const ingredientsArray = recipe["ingredients"];
    ingredientsArray.forEach(ingredient => {
        const liIngredients = document.createElement("li");
        const pIngredients = document.createElement("p");
        const pQuantity = document.createElement("p");
        pIngredients.classList.add("ingredients");
        pIngredients.textContent = ingredient["ingredient"];
        pQuantity.classList.add("quantity");
        if(ingredient["quantity"]) {
            pQuantity.textContent = ingredient["quantity"];
        }
        if(ingredient["unit"]) {
            pQuantity.textContent += " " + ingredient["unit"];
        }
        divIngredients.appendChild(ul);
        ul.appendChild(liIngredients);
        liIngredients.appendChild(pIngredients);
        liIngredients.appendChild(pQuantity);
    });
}