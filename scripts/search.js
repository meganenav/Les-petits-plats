//Récupération du contenu du champ de recherche principal
let searchInput;

//Recherche des recettes en fonction du champ de recherche éventuellement et/ou des tags
function searchRecipes() {
    let recipesArray = [...recipes];
    if(searchInput.value.length >= 3) {
        recipesArray = searchInputFunction(searchInput, recipesArray);
    }
    let tagsElements = getTags();
    if(tagsElements.length !== 0) {
        recipesArray = searchElementTags(tagsElements, recipesArray);
    }
    if(recipesArray.length !== 0) {
        document.querySelector(".recipes").innerHTML = "";
        document.querySelector(".recipes").style.display = "grid";
        createNewRecipes(recipesArray);
        currentRecipesArray = recipesArray;
    }
    else {
        document.querySelector(".recipes").style.display = "flex";
        let message = "<div class=\"no-results\">Aucune recette ne contient " + letters + ", vous pouvez chercher \"tarte aux pommes \", \" poisson \", etc.</div>";
        document.querySelector(".recipes").innerHTML = message;
        document.querySelector(".nb-recipes span").textContent = 0;
        document.querySelector(".list-ingredients ul").innerHTML = "";
    }
}

//Vérification des recettes avec le champ de recherche, dans le nom, la description et les ingrédients
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

//Vérification des recettes avec les tags dans les ingrédients, ustensiles et appareils
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

//Compare les lettres ou mots passés en paramètres et le nom de la recette
function verificationName(letters, recipe) {
    const recipeNameLowerCase = recipe["name"].toLowerCase();
    const verifName = (recipeNameLowerCase.search(letters) !== -1);
    return verifName;
}

//Compare les lettres ou mots passés en paramètres et la description de la recette
function verificationDescription(letters, recipe) {
    const descriptionLowerCase = recipe["description"].toLowerCase();
    const verifDescription = (descriptionLowerCase.search(letters) !== -1);
    return verifDescription;
}

//Compare les lettres ou mots passés en paramètres et les ingrédients de la recette
function verificationIngredients(letters, recipe) {
    const ingredientsArray = recipe["ingredients"];
    let verifIngredients = false;     
    for(let ingredientIndex = 0; ingredientIndex < ingredientsArray.length; ingredientIndex++) {
        let ingredient = ingredientsArray[ingredientIndex]["ingredient"];
        ingredient = ingredient.toLowerCase();
        ingredient = ingredient.replace(/[()]/g, "");
        letters = letters.replace(/[()]/g, "");
        if(ingredient.search(letters) !== -1) {
            verifIngredients = true;
        }
    }
    return verifIngredients;
}

//Compare les lettres ou mots passés en paramètres et l'appareil de la recette
function verificationAppliances(letters, recipe) {
    const applianceLowerCase = recipe["appliance"].toLowerCase();
    const verifAppliance = (applianceLowerCase.search(letters) !== -1);
    return verifAppliance;
}

//Compare les lettres ou mots passés en paramètres et les ustensiles de la recette
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

//Création des recettes en fonction d'un tableau de recettes avec remplissage des filtres
function createNewRecipes(recipesArray) {
    document.querySelector(".recipes").innerHTML = "";
    for(let i = 0; i < recipesArray.length; i++) {
        createRecipe(recipesArray[i]);
    }
    fillFilters(recipesArray);
    document.querySelector(".nb-recipes span").textContent = recipesArray.length;
}