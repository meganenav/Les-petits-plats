async function init() {
    for(let i = 0; i < recipes.length; i++) {
        createRecipe(recipes[i]);
    }
    fillFilters(recipes);
    document.querySelector(".nb-recipes span").textContent = recipes.length;
}

window.onload = (event) => {
    init();
};

async function createRecipe(recipe) {
    const recipesSection = document.querySelector(".recipes");
    const article = document.createElement("article");
    article.classList.add("recipe-block");
    const imgRecipe = document.createElement("img");
    imgRecipe.setAttribute("src", "./assets/photos/" + recipe["image"]);
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
    for(let i = 0; i < ingredientsArray.length; i++) {
        const liIngredients = document.createElement("li");
        const pIngredients = document.createElement("p");
        const pQuantity = document.createElement("p");
        pIngredients.classList.add("ingredients");
        pIngredients.textContent = ingredientsArray[i]["ingredient"];
        pQuantity.classList.add("quantity");
        if(ingredientsArray[i]["quantity"]) {
            pQuantity.textContent = ingredientsArray[i]["quantity"];
        }
        if(ingredientsArray[i]["unit"]) {
            pQuantity.textContent += " " + ingredientsArray[i]["unit"];
        }
        divIngredients.appendChild(ul);
        ul.appendChild(liIngredients);
        liIngredients.appendChild(pIngredients);
        liIngredients.appendChild(pQuantity);
    }
}