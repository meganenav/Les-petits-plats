const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", () => {
    if(searchInput.value.length >= 3) {
        document.querySelector(".recipes").style.display = "grid";
        searchRecipes(searchInput.value);
    }
    if(searchInput.value.length === 0) {
        document.querySelector(".recipes").style.display = "grid";
        document.querySelector(".recipes").innerHTML = "";
        init();
    }
});

function searchRecipes(letters) {
    letters = letters.toLowerCase();
    let recipesArray = [];
    for(let i = 0; i < recipes.length; i++) {
        const recipeNameLowerCase = recipes[i]["name"].toLowerCase();
        const descriptionLowerCase = recipes[i]["description"].toLowerCase();
        const ingredientsArray = recipes[i]["ingredients"];
        const verifName = (recipeNameLowerCase.search(letters) !== -1);
        const verifDescription = (descriptionLowerCase.search(letters) !== -1);
        let verifIngredients = false;     
        
        for(let ingredientIndex = 0; ingredientIndex < ingredientsArray.length; ingredientIndex++) {
            let ingredient = ingredientsArray[ingredientIndex]["ingredient"];
            ingredient = ingredient.toLowerCase();
            if(ingredient.search(letters) !== -1) {
                verifIngredients = true;
            }
        }
        if(verifName || verifDescription || verifIngredients) {
            recipesArray.push(recipes[i]);
        }
    }
    console.log(recipesArray);
    if(recipesArray.length !== 0) {
        document.querySelector(".recipes").style.display = "grid";
        createNewRecipes(recipesArray);
    }
    else {
        document.querySelector(".recipes").style.display = "flex";
        let message = "<div class=\"no-results\">Aucune recette ne contient " + letters + ", vous pouvez chercher \"tarte aux pommes \", \" poisson \", etc.</div>";
        document.querySelector(".recipes").innerHTML = message;
        document.querySelector(".nb-recipes span").textContent = 0;
    }
}

function createNewRecipes(recipesArray) {
    document.querySelector(".recipes").innerHTML = "";
    recipesArray.forEach(recipe => {
        createRecipe(recipe);
    });
    document.querySelector(".nb-recipes span").textContent = recipesArray.length;
}