const arrowIngredients = document.querySelector(".arrow-ingredients");
const arrowAppliances = document.querySelector(".arrow-appliances");
const arrowUstensils = document.querySelector(".arrow-ustensils");
arrowIngredients.addEventListener("click", () => {
    const listIngredients = document.querySelector(".list-ingredients");
    if(listIngredients.classList.contains("ingredients-open")) {
        closeElementsFilter("ingredients", listIngredients);
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

function getUniqueElements(elementsArray) {
    let newArray = [];
    for(let i = 0; i < elementsArray.length; i++) {
        if(newArray.lastIndexOf(elementsArray[i]) === -1) {
            newArray.push(elementsArray[i]);
        }
    }
    return newArray;
}

function fillFilters(recipesArray) {
    prepareIngredientsFilter(recipesArray);
    prepareUstensilsFilter(recipesArray);
    prepareAppliancesFilter(recipesArray);
}

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
    const listIngredients = document.querySelector(".list-ingredients ul");
    displayElementsFilter(listIngredients, ingredientsArray, "ingredients", recipesArray);
}

function prepareAppliancesFilter(recipesArray) {
    let appliancesArray = [];
    for(let i = 0; i < recipesArray.length; i++) {
        let appliance = recipesArray[i]["appliance"];
        appliance = appliance.toLowerCase();
        appliancesArray.push(appliance);
    }
    appliancesArray = getUniqueElements(appliancesArray);
    const listAppliances = document.querySelector(".list-appliances ul");
    searchElementsList(listAppliances, appliancesArray, "appliances");
    displayElementsFilter(listAppliances, appliancesArray, "appliances", recipesArray);
}

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
    const listUstensils = document.querySelector(".list-ustensils ul");
    searchElementsList(listUstensils, ustensilsArray, "ustensils");
    displayElementsFilter(listUstensils, ustensilsArray, "ustensils");
}

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
            if(elementsArray[i].search(searchInput.value) === 0) {
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

function listenElementsFilter(listElementsUl, type) {
    let listElements = listElementsUl.children;
    listElements = Array.from(listElements);
    for(let i = 0; i < listElements.length; i++) {
        listElements[i].addEventListener("click", () => {
            filterByTag(listElements[i], type);
            removeElementToSelected(listElements[i].textContent, listElementsUl, type);
            searchRecipes();
            createArrayList(type);
            closeElementsFilter(type);
        });
    }
}

function showElementsFilter(element) {
    let arrow;
    if(element === "ingredients") {
        arrow = document.querySelector(".arrow-ingredients");
        const listIngredients = document.querySelector(".list-ingredients");
        listIngredients.style.display = "block";
        listIngredients.classList.add("ingredients-open");
    }
    if(element === "appliances") {
        arrow = document.querySelector(".arrow-appliances");
        const listAppliances = document.querySelector(".list-appliances");
        listAppliances.style.display = "block";
        listAppliances.classList.add("appliances-open");
    }
    if(element === "ustensils") {
        arrow = document.querySelector(".arrow-ustensils");
        const listUstensils = document.querySelector(".list-ustensils");
        listUstensils.style.display = "block";
        listUstensils.classList.add("ustensils-open");
    }
    arrow.setAttribute("src", "assets/arrow-reverse.svg");
}

function closeElementsFilter(type) {
    let arrow;
    let ul;
    if(type === "ingredients") {
        arrow = document.querySelector(".arrow-ingredients");
        const listIngredients = document.querySelector(".list-ingredients");
        listIngredients.style.display = "none";
        listIngredients.classList.remove("ingredients-open");
        document.querySelector(".search-ingredients").parentElement.reset();
        ul = document.querySelector(".ul-ingredients");
    }
    if(type === "appliances") {
        arrow = document.querySelector(".arrow-appliances");
        const listAppliances = document.querySelector(".list-appliances");
        listAppliances.style.display = "none";
        listAppliances.classList.remove("appliances-open");
        document.querySelector(".search-appliances").parentElement.reset();
        ul = document.querySelector(".ul-appliances");
    }
    if(type === "ustensils") {
        arrow = document.querySelector(".arrow-ustensils");
        const listUstensils = document.querySelector(".list-ustensils");
        listUstensils.style.display = "none";
        listUstensils.classList.remove("ustensils-open");
        document.querySelector(".search-ustensils").parentElement.reset();
         ul = document.querySelector(".ul-ustensils");
    }
    let elementsArray = ul.children;
    elementsArray = Array.from(elementsArray);
    let arrayList = [];
    for(let i = 0; i < elementsArray.length; i++) {
        arrayList.push(elementsArray[i].textContent);
    }
    arrow.setAttribute("src", "assets/arrow.svg");
    displayElementsFilter(ul, arrayList, type);
}