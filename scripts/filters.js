//Mise en place des flèches sur les blocks de filtres, ajout d'un écouteur d'événement
function manageDisplayFilters() {
    const arrowIngredients = document.querySelector(".arrow-ingredients");
    const arrowAppliances = document.querySelector(".arrow-appliances");
    const arrowUstensils = document.querySelector(".arrow-ustensils");
    arrowIngredients.addEventListener("click", () => {
        const listIngredients = document.querySelector(".list-ingredients");
        if(listIngredients.classList.contains("ingredients-open")) {
            closeElementsFilter("ingredients");
        }
        else {
            showElementsFilter("ingredients");
        }
    });
    arrowAppliances.addEventListener("click", () => {
        const listAppliances = document.querySelector(".list-appliances");
        if(listAppliances.classList.contains("appliances-open")) {
            closeElementsFilter("appliances");
        }
        else {
            showElementsFilter("appliances");
        }
    });
    arrowUstensils.addEventListener("click", () => {
        const listUstensils = document.querySelector(".list-ustensils");
        if(listUstensils.classList.contains("ustensils-open")) {
            closeElementsFilter("ustensils");
        }
        else {
            showElementsFilter("ustensils");
        }
    });
}

//Affichage de la liste déroulante
function showElementsFilter(element) {
    let arrow;
    let listElement;
    let filter;
    let classElement;
    if(element === "ingredients") {
        arrow = document.querySelector(".arrow-ingredients");
        listElement = document.querySelector(".list-ingredients");
        filter = document.querySelector(".filter-ingredients");
        classElement = "ingredients-open";
    }
    if(element === "appliances") {
        arrow = document.querySelector(".arrow-appliances");
        listElement = document.querySelector(".list-appliances");
        filter = document.querySelector(".filter-appliances");
        classElement = "appliances-open";
    }
    if(element === "ustensils") {
        arrow = document.querySelector(".arrow-ustensils");
        listElement = document.querySelector(".list-ustensils");
        filter = document.querySelector(".filter-ustensils");
        classElement = "ustensils-open";
    }
    listElement.style.display = "block";
    listElement.classList.add(classElement);
    filter.style.borderBottomLeftRadius = "0";
    filter.style.borderBottomRightRadius = "0";
    arrow.setAttribute("src", "assets/arrow-reverse.svg");
}

//Fermeture de la liste déroulante avec reset du champ de recherche et de l'affichage des éléments de filtre
function closeElementsFilter(type) {
    let arrow;
    let listElement;
    let classElement;
    let filter;
    let search;
    let formElement;
    if(type === "ingredients") {
        arrow = document.querySelector(".arrow-ingredients");
        listElement = document.querySelector(".list-ingredients");
        classElement = "ingredients-open";
        filter = document.querySelector(".filter-ingredients");
        search = document.querySelector(".search-ingredients");
        formElement =  document.querySelector(".search-ingredients").parentElement;
        ul = document.querySelector(".ul-ingredients");
    }
    if(type === "appliances") {
        arrow = document.querySelector(".arrow-appliances");
        listElement = document.querySelector(".list-appliances");
        classElement = "appliances-open";
        filter = document.querySelector(".filter-appliances");
        search = document.querySelector(".search-appliances");
        formElement = document.querySelector(".search-appliances").parentElement;
        ul = document.querySelector(".ul-appliances");
    }
    if(type === "ustensils") {
        arrow = document.querySelector(".arrow-ustensils");
        listElement = document.querySelector(".list-ustensils");
        classElement = "ustensils-open";
        filter = document.querySelector(".filter-ustensils");
        search = document.querySelector(".search-ustensils");
        formElement = document.querySelector(".search-ustensils").parentElement;
        ul = document.querySelector(".ul-ustensils");
    }
    listElement.style.display = "none";
    listElement.classList.remove(classElement);
    if(search.value.length !== 0) {
        if(currentRecipesArray.length === 0) {
            currentRecipesArray = recipes;
        }
        fillFilters(currentRecipesArray);
    }
    formElement.reset();
    filter.style.borderBottomLeftRadius = "11px";
    filter.style.borderBottomRightRadius = "11px";
    arrow.setAttribute("src", "assets/arrow.svg");
}

//Renvoie un tableau sans doublon des éléments
function getUniqueElements(elementsArray) {
    let newArray = [];
    elementsArray.forEach(element => {
        if(newArray.lastIndexOf(element) === -1) {
            newArray.push(element);
        }
    });
    return newArray;
}

//Remplissage des filtres avec les fonctions dédiées
function fillFilters(recipesArray) {
    prepareIngredientsFilter(recipesArray);
    prepareUstensilsFilter(recipesArray);
    prepareAppliancesFilter(recipesArray);
}

//Création d'un tableau d'ingrédients en fonction des recettes en paramètre
function prepareIngredientsFilter(recipesArray) {
    let ingredientsArray = [];
    recipesArray.forEach(recipe => {
        let ingredients = recipe["ingredients"];
        ingredients.forEach(ingredient => {
            ingredient = ingredient["ingredient"];
            ingredient = ingredient.toLowerCase();
            ingredientsArray.push(ingredient);
        });
    });
    ingredientsArray = getUniqueElements(ingredientsArray);
    const selected = document.querySelectorAll(".list-ingredients .item-selected");
    let newIngredientsArray = [];
    let insertElement;
    ingredientsArray.forEach(ingredient => {
        insertElement = true;
        selected.forEach(element => {
            if(ingredient === element.textContent) {
                insertElement = false;
            }
        });
        if(insertElement === true) {
            newIngredientsArray.push(ingredient);
        }
    });
    const listIngredients = document.querySelector(".list-ingredients ul");
    displayElementsFilter(listIngredients, newIngredientsArray, "ingredients", recipesArray);
}

//Création d'un tableau d'appareils en fonction des recettes en paramètre
function prepareAppliancesFilter(recipesArray) {
    let appliancesArray = [];
    recipesArray.forEach(recipe => {
        let appliance = recipe["appliance"];
        appliance = appliance.toLowerCase();
        appliancesArray.push(appliance);
    });
    appliancesArray = getUniqueElements(appliancesArray);
    const selected = document.querySelectorAll(".list-appliances .item-selected");
    let newAppliancesArray = [];
    let insertElement;
    appliancesArray.forEach(appliance => {
        insertElement = true;
        selected.forEach(element => {
            if(appliance === element.textContent) {
                insertElement = false;
            }
        });
        if(insertElement === true) {
            newAppliancesArray.push(appliance);
        }
    });
    const listAppliances = document.querySelector(".list-appliances ul");
    displayElementsFilter(listAppliances, newAppliancesArray, "appliances", recipesArray);
}

//Création d'un tableau d'ustensiles en fonction des recettes en paramètre
function prepareUstensilsFilter(recipesArray) {
    let ustensilsArray = [];
    recipesArray.forEach(recipe => {
        let ustensils = recipe["ustensils"];
        ustensils.forEach(element => {
            let ustensil = element;
            ustensil = ustensil.toLowerCase();
            ustensilsArray.push(ustensil);
        });
    });
    ustensilsArray = getUniqueElements(ustensilsArray);
    const selected = document.querySelectorAll(".list-ustensils .item-selected");
    let newUstensilsArray = [];
    let insertElement;
    ustensilsArray.forEach(ustensil => {
        insertElement = true;
        selected.forEach(element => {
            if(ustensil === element.textContent) {
                insertElement = false;
            }
        });
        if(insertElement === true) {
            newUstensilsArray.push(ustensil);
        }
    });
    const listUstensils = document.querySelector(".list-ustensils ul");
    displayElementsFilter(listUstensils, newUstensilsArray, "ustensils");
}

//Affichage des éléments du tableau dans les listes déroulantes avec prise en compte du champ de recherche des filtres
function displayElementsFilter(listElementsUl, elementsArray, type) {
    let searchInput;
    if(type === "ingredients") {
        searchInput = document.querySelector(".search-ingredients");
    }
    if(type === "appliances") {
        searchInput = document.querySelector(".search-appliances");
    }
    if(type === "ustensils") {
        searchInput = document.querySelector(".search-ustensils");
    }
    listElementsUl.innerHTML = "";
    elementsArray.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element;
        listElementsUl.appendChild(li);
    });
    listenElementsFilter(listElementsUl, type);
    let arrayList = [];
    searchInput.addEventListener("input", () => {
        listElementsUl.innerHTML = "";
        arrayList = [];
        arrayList = elementsArray.filter((element) => element.includes(searchInput.value));
        console.log(arrayList);
        arrayList.forEach(element => {
            const li = document.createElement("li");
            li.textContent = element;
            listElementsUl.appendChild(li);
        });
        listenElementsFilter(listElementsUl, type);
    });
}

//Ecoute des éléments des filtres afin de lancer les fonctions concernées
function listenElementsFilter(listElementsUl, type) {
    let listElements = listElementsUl.children;
    listElements = Array.from(listElements);
    listElements.forEach((element) => element.addEventListener("click", () => {
        filterByTag(element, type);
        removeElementToSelected(element.textContent, listElementsUl, type);
        closeElementsFilter(type);
        searchRecipes();
    }));
}