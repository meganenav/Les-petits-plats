function filterByTag(element, type) {
    createTagSpan(element.textContent, type);
    const tagCloseImg = document.querySelectorAll(".tag-close-img");
    for(let i = 0; i < tagCloseImg.length; i++) {
        tagCloseImg[i].addEventListener("click", () => {
            closeTag(tagCloseImg[i]);
        });
    }
}

function createTagSpan(element, type) {
    const tagsDiv = document.querySelector(".tags");
    const tagSpan = document.createElement("span");
    tagSpan.classList.add("tag-span");
    tagSpan.textContent = element;
    const imgCloseTag = document.createElement("img");
    imgCloseTag.setAttribute("src", "./assets/close-tag.svg");
    imgCloseTag.classList.add("tag-close-img");
    tagSpan.appendChild(imgCloseTag);
    tagsDiv.appendChild(tagSpan);
    addTag(element, type);
}

function closeTag(tagCloseImg) {
    const selected = document.querySelectorAll(".item-selected");
    for(let i = 0; i < selected.length; i++) {
        if(tagCloseImg.parentElement.textContent === selected[i].textContent) {
            selected[i].remove();
        }
    }
    tagCloseImg.parentElement.remove();
    searchRecipes();
}

function addTag(element, type) {
    if(type === "ingredients") {
        let liIngredients = document.querySelectorAll(".ul-ingredients li");
        liIngredients = Array.from(liIngredients);
        const ulElements = document.querySelector(".ul-ingredients");
        const listElements = document.querySelector(".list-ingredients");
        removeElementToSelected(element, liIngredients, listElements, ulElements);
    }
    if(type === "appliances") {
        let liAppliances = document.querySelectorAll(".ul-appliances li");
        liAppliances = Array.from(liAppliances);
        const ulElements = document.querySelector(".ul-appliances");
        const listElements = document.querySelector(".list-appliances");
        removeElementToSelected(element, liAppliances, listElements, ulElements);
    }
    if(type === "ustensils") {
        let liUstensils = document.querySelectorAll(".ul-ustensils li");
        liUstensils = Array.from(liUstensils);
        const ulElements = document.querySelector(".ul-ustensils");
        const listElements = document.querySelector(".list-ustensils");
        removeElementToSelected(element, liUstensils, listElements, ulElements);
    }
}

function removeElementToSelected(element, liElements, listElements, ulElements) {
    for(let i = 0; i < liElements.length; i++) {
        if(element === liElements[i].textContent) {
            liElements[i].remove();
            const spanLiElements = document.createElement("span");
            spanLiElements.classList.add("item-selected");
            spanLiElements.textContent = liElements[i].textContent;
            listElements.insertBefore(spanLiElements, ulElements);
        }
    }
}

function getTags() {
    let tags = document.querySelectorAll(".item-selected");
    tags = Array.from(tags);
    let tagsTextContent = [];
    for(let y = 0; y < tags.length; y++) {
        if(tags[y].textContent !== "") {
            tagsTextContent.push(tags[y].textContent);
        } 
    }
    return tagsTextContent;
}