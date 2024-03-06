const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", () => {
    searchInputValue(searchInput, "input");
});

function searchInputValue(searchInput) {
    let recipesArray = recipes;
    if(searchInput.value.length >= 3) {
        document.querySelector(".recipes").style.display = "grid";
        searchRecipes(recipesArray);
    }
    if(searchInput.value.length < 3) {
        document.querySelector(".recipes").style.display = "grid";
        document.querySelector(".recipes").innerHTML = "";
        document.querySelector(".list-ingredients ul").innerHTML = "";
        init();
    }
}

function searchRecipes() {
    let newRecipesArray = [];
    let recipesArray = recipes;
    if(searchInput.value.length !== 0) {
        recipesArray = searchInputFunction(searchInput, recipesArray);
    }
    let tagsIngredients = getTagsIngredients();
    if(tagsIngredients.length !== 0) {
        newRecipesArray = searchTagsIngredients(newRecipesArray, recipesArray, tagsIngredients);
    }
    if(newRecipesArray.length === 0) {
        newRecipesArray = recipesArray;
    }
    if(newRecipesArray.length !== 0) {
        document.querySelector(".recipes").innerHTML = "";
        document.querySelector(".recipes").style.display = "grid";
        createNewRecipes(newRecipesArray);
    }
    else {
        document.querySelector(".recipes").style.display = "flex";
        let message = "<div class=\"no-results\">Aucune recette ne contient " + letters + ", vous pouvez chercher \"tarte aux pommes \", \" poisson \", etc.</div>";
        document.querySelector(".recipes").innerHTML = message;
        document.querySelector(".nb-recipes span").textContent = 0;
        document.querySelector(".list-ingredients ul").innerHTML = "";
    }
}

function searchInputFunction(element, recipesArray) {
    let newRecipesArray = [];
    letters = element.value.toLowerCase();
    for(let i = 0; i < recipesArray.length; i++) {
        const verifName = verificationName(letters, recipes[i]);
        const verifDescription = verificationDescription(letters, recipes[i]);
        const verifIngredients = verificationIngredients(letters, recipes[i]);
        if(verifName || verifDescription || verifIngredients) {
            newRecipesArray.push(recipesArray[i]);
        }
    }
    return newRecipesArray;
}

function searchTagsIngredients(newRecipesArray, recipesArray, tagsIngredients) {
    for(let y = 0; y < recipesArray.length; y++) {
        let verifIngredients = true;
        for(let i = 0; i < tagsIngredients.length; i++) {
            let verifTagsIngredients = verificationIngredients(tagsIngredients[i], recipesArray[y]);
            if(verifTagsIngredients === false) {
                verifIngredients = false;
            }
        }
        if(verifIngredients === true) {
            newRecipesArray.push(recipesArray[y]);
        }
    }
    return newRecipesArray;
}

function searchTagsAppliances(newRecipesArray, recipesArray, tagsAppliances) {
    let verifAppliances = true;
    for(let y = 0; y < recipesArray.length; y++) {
        for(let i = 0; i < tagsAppliances.length; i++) {
            let verifTagsAppliances = verificationAppliances(tagsAppliances[i], recipesArray[y]);
            if(verifTagsAppliances === false) {
                verifAppliances = false;
            }
        }
        if(verifAppliances === true) {
            newRecipesArray.push(recipesArray[y]);
        }
    }
    return newRecipesArray;
}

function searchTagsUstensils(newRecipesArray, recipesArray, tagsUstensils) {
    let verifUstensils = true;
    for(let y = 0; y < recipesArray.length; y++) {
        for(let i = 0; i < tagsUstensils.length; i++) {
            let verifTagsUstensils = verificationUstensils(tagsUstensils[i], recipesArray[y]);
            if(verifTagsUstensils === false) {
                verifUstensils = false;
            }
        }
        if(verifUstensils === true) {
            newRecipesArray.push(recipesArray[y]);
        }
    }
    return newRecipesArray;
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
    for(let i = 0; i < recipesArray.length; i++) {
        createRecipe(recipesArray[i]);
    }
    fillFilters(recipesArray);
    document.querySelector(".nb-recipes span").textContent = recipesArray.length;
}