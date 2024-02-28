const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", () => {
    if(searchInput.value.length >= 3) {
        document.querySelector(".recipes").style.display = "grid";
        searchRecipes(searchInput.value);
    }
    if(searchInput.value.length < 3) {
        document.querySelector(".recipes").style.display = "grid";
        document.querySelector(".recipes").innerHTML = "";
        document.querySelector(".list-ingredients ul").innerHTML = "";
        init();
    }
});

function searchRecipes(letters) {
    letters = letters.toLowerCase();
    let recipesArray = [];
    for(let i = 0; i < recipes.length; i++) {;
        const verifName = verificationName(letters, recipes[i]);
        const verifDescription = verificationDescription(letters, recipes[i]);
        verifIngredients = verificationIngredients(letters, recipes[i]);
        if(verifName || verifDescription || verifIngredients) {
            recipesArray.push(recipes[i]);
        }
    }
    if(recipesArray.length !== 0) {
        document.querySelector(".recipes").style.display = "grid";
        createNewRecipes(recipesArray);
    }
    else {
        document.querySelector(".recipes").style.display = "flex";
        let message = "<div class=\"no-results\">Aucune recette ne contient " + letters + ", vous pouvez chercher \"tarte aux pommes \", \" poisson \", etc.</div>";
        document.querySelector(".recipes").innerHTML = message;
        document.querySelector(".nb-recipes span").textContent = 0;
        document.querySelector(".list-ingredients ul").innerHTML = "";
    }
}

function verificationName(letters, recipe) {
    const recipeNameLowerCase = recipe["name"].toLowerCase();
    const verifName = (recipeNameLowerCase.search(letters) !== -1);
    return verifName;
}

function verificationDescription(letters, recipe) {
    const descriptionLowerCase = recipe["description"].toLowerCase();
    const verifDescription = (descriptionLowerCase.search(letters) !== -1);
    return verifDescription;
}

function verificationIngredients(letters, recipe) {
    const ingredientsArray = recipe["ingredients"];
    let verifIngredients = false;     
    for(let ingredientIndex = 0; ingredientIndex < ingredientsArray.length; ingredientIndex++) {
        let ingredient = ingredientsArray[ingredientIndex]["ingredient"];
        ingredient = ingredient.toLowerCase();
        if(ingredient.search(letters) !== -1) {
            verifIngredients = true;
        }
    }
    return verifIngredients;
}

function verificationAppliances(letters, recipe) {
    const applianceLowerCase = recipe["appliance"].toLowerCase();
    const verifAppliance = (applianceLowerCase.search(letters) !== -1);
    return verifAppliance;
}

function verificationUstensils(letters, recipe) {
    const ustensilsArray = recipe["ustensils"];
    let verifUstensil = false;     
    for(let i = 0; i < ustensilsArray.length; i++) {
        let ustensil = ustensilsArray[i];
        ustensil = ustensil.toLowerCase();
        if(ustensil.search(letters) !== -1) {
            verifUstensil = true;
        }
    }
    return verifUstensil;
}

function createNewRecipes(recipesArray) {
    document.querySelector(".recipes").innerHTML = "";
    recipesArray.forEach(recipe => {
        createRecipe(recipe);
    });
    fillFilters(recipesArray);
    document.querySelector(".nb-recipes span").textContent = recipesArray.length;
}