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
    let tagsElements = getTags();
    console.log(tagsElements);
    if(tagsElements.length !== 0) {
        newRecipesArray = searchElementTags(tagsElements, recipesArray);
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

function searchElementTags(tagsElements, recipesArray) {
    let newRecipesArray = [];
    for(let i = 0; i < recipesArray.length; i++) {
        let verif = true;
        for(let y = 0; y < tagsElements.length; y++) {
            tag = tagsElements[y].toLowerCase();
            let verifIngredients = verificationIngredients(tagsElements[y], recipesArray[i]);
            let verifAppliances = verificationAppliances(tagsElements[y], recipesArray[i]);
            let verifUstensils = verificationUstensils(tagsElements[y], recipesArray[i]);
            if(verifIngredients === false && verifAppliances === false && verifUstensils === false) {
                verif = false;
            }
        }
        if(verif === true) {
            newRecipesArray.push(recipesArray[i]);
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