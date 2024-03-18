//Récupération du contenu du champ de recherche principal
const searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", () => {
    searchInputValue(searchInput, "input");
});

//Traitement du champ de recherche principal, affichage des recettes filtrées ou non
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

//Recherche des recettes en fonction du champ de recherche éventuellement et/ou des tags
function searchRecipes() {
    let newRecipesArray = [];
    let recipesArray = recipes;
    if(searchInput.value.length !== 0) {
        recipesArray = searchInputFunction(searchInput, recipesArray);
    }
    let tagsElements = getTags();
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
        currentRecipesArray = newRecipesArray;
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
    recipesArray.forEach(recipe => {
        const verifName = verificationName(letters, recipe);
        const verifDescription = verificationDescription(letters, recipe);
        const verifIngredients = verificationIngredients(letters, recipe);
        if(verifName || verifDescription || verifIngredients) {
            newRecipesArray.push(recipe);
        }
    });
    return newRecipesArray;
}

//Vérification des recettes avec les tags dans les ingrédients, ustensiles et appareils
function searchElementTags(tagsElements, recipesArray) {
    let newRecipesArray = [];
    recipesArray.forEach(recipe => {
        let verif = true;
        tagsElements.forEach(tag => {
            tag = tag.toLowerCase();
            let verifIngredients = verificationIngredients(tag, recipe);
            let verifAppliances = verificationAppliances(tag, recipe);
            let verifUstensils = verificationUstensils(tag, recipe);
            if(verifIngredients === false && verifAppliances === false && verifUstensils === false) {
                verif = false;
            }
        });
        if(verif === true) {
            newRecipesArray.push(recipe);
        }
    });
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
    ingredientsArray.forEach(ingredientElement => {
        let ingredient = ingredientElement["ingredient"];
        ingredient = ingredient.toLowerCase();
        if(ingredient.search(letters) !== -1) {
            verifIngredients = true;
        }
    });
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
    ustensilsArray.forEach(ustensilElement => {
        let ustensil = ustensilElement;
        ustensil = ustensil.toLowerCase();
        if(ustensil.search(letters) !== -1) {
            verifUstensil = true;
        }
    });
    return verifUstensil;
}

//Création des recettes en fonction d'un tableau de recettes avec remplissage des filtres
function createNewRecipes(recipesArray) {
    document.querySelector(".recipes").innerHTML = "";
    recipesArray.forEach(recipe => {
        createRecipe(recipe);
    });
    fillFilters(recipesArray);
    document.querySelector(".nb-recipes span").textContent = recipesArray.length;
}