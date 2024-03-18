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
    console.log(element);
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
    let ul;
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
    for(let i = 0; i < elementsArray.length; i++) {
        if(newArray.lastIndexOf(elementsArray[i]) === -1) {
            newArray.push(elementsArray[i]);
        }
    }
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
    for(let i = 0; i < recipesArray.length; i++) {
        let ingredients = recipesArray[i]["ingredients"];
        for(let y = 0; y < ingredients.length; y++) {
            let ingredient = ingredients[y]["ingredient"];
            ingredient = ingredient.toLowerCase();
            ingredientsArray.push(ingredient);
        }
    }
    ingredientsArray = getUniqueElements(ingredientsArray);
    const selected = document.querySelectorAll(".list-ingredients .item-selected");
    let newIngredientsArray = [];
    let insertElement;
    for(let i = 0; i < ingredientsArray.length; i++) {
        insertElement = true;
        for(let y = 0; y < selected.length; y++) {
            if(ingredientsArray[i] === selected[y].textContent) {
                insertElement = false;
            }
        }
        if(insertElement === true) {
            newIngredientsArray.push(ingredientsArray[i]);
        }
    }
    const listIngredients = document.querySelector(".list-ingredients ul");
    displayElementsFilter(listIngredients, newIngredientsArray, "ingredients", recipesArray);
}

//Création d'un tableau d'appareils en fonction des recettes en paramètre
function prepareAppliancesFilter(recipesArray) {
    let appliancesArray = [];
    for(let i = 0; i < recipesArray.length; i++) {
        let appliance = recipesArray[i]["appliance"];
        appliance = appliance.toLowerCase();
        appliancesArray.push(appliance);
    }
    appliancesArray = getUniqueElements(appliancesArray);
    const selected = document.querySelectorAll(".list-appliances .item-selected");
    let newAppliancesArray = [];
    let insertElement;
    for(let i = 0; i < appliancesArray.length; i++) {
        insertElement = true;
        for(let y = 0; y < selected.length; y++) {
            if(appliancesArray[i] === selected[y].textContent) {
                insertElement = false;
            }
        }
        if(insertElement === true) {
            newAppliancesArray.push(appliancesArray[i]);
        }
    }
    const listAppliances = document.querySelector(".list-appliances ul");
    displayElementsFilter(listAppliances, newAppliancesArray, "appliances", recipesArray);
}

//Création d'un tableau d'ustensiles en fonction des recettes en paramètre
function prepareUstensilsFilter(recipesArray) {
    let ustensilsArray = [];
    for(let i = 0; i < recipesArray.length; i++) {
        let ustensils = recipesArray[i]["ustensils"];
        for(let y = 0; y < ustensils.length; y++) {
            let ustensil = ustensils[y];
            ustensil = ustensil.toLowerCase();
            ustensilsArray.push(ustensil);
        }
    }
    ustensilsArray = getUniqueElements(ustensilsArray);
    const selected = document.querySelectorAll(".list-ustensils .item-selected");
    let newUstensilsArray = [];
    let insertElement;
    for(let i = 0; i < ustensilsArray.length; i++) {
        insertElement = true;
        for(let y = 0; y < selected.length; y++) {
            if(ustensilsArray[i] === selected[y].textContent) {
                insertElement = false;
            }
        }
        if(insertElement === true) {
            newUstensilsArray.push(ustensilsArray[i]);
        }
    }
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
    for(let i = 0; i < elementsArray.length; i++) {
        const li = document.createElement("li");
        li.textContent = elementsArray[i];
        listElementsUl.appendChild(li);
    }
    listenElementsFilter(listElementsUl, type);
    let arrayList = [];
    searchInput.addEventListener("input", () => {
        listElementsUl.innerHTML = "";
        arrayList = [];
        for(let i = 0; i < elementsArray.length; i++) {
            if(elementsArray[i].search(searchInput.value) !== -1) {
                arrayList.push(elementsArray[i]);
            }
        }
        for(let i = 0; i < arrayList.length; i++) {
            const li = document.createElement("li");
            li.textContent = arrayList[i];
            listElementsUl.appendChild(li);
        }
        listenElementsFilter(listElementsUl, type);
    });
}

//Ecoute des éléments des filtres afin de lancer les fonctions concernées
function listenElementsFilter(listElementsUl, type) {
    let listElements = listElementsUl.children;
    listElements = Array.from(listElements);
    for(let i = 0; i < listElements.length; i++) {
        listElements[i].addEventListener("click", () => {
            filterByTag(listElements[i], type);
            removeElementToSelected(listElements[i].textContent, listElementsUl, type);
            closeElementsFilter(type);
            searchRecipes();
        });
    }
}