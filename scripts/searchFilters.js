function filterByTag(element, type) {
    createTagSpan(element.textContent, type);
    const tagCloseImg = document.querySelectorAll(".tag-close-img");
    for(let i = 0; i < tagCloseImg.length; i++) {
        tagCloseImg[i].addEventListener("click", () => {
            closeTag(tagCloseImg[i], type);
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
}

function closeTag(tagCloseImg, type) {
    const selected = document.querySelectorAll(".item-selected");
    for(let i = 0; i < selected.length; i++) {
        if(tagCloseImg.parentElement.textContent === selected[i].textContent) {
            selected[i].remove();
        }
    }
    tagCloseImg.parentElement.remove();
    searchRecipes();
    createArrayList(type);
}

function removeElementToSelected(element, ulElements) {
    let liElements = "." + ulElements.className + " li";
    liElements = document.querySelectorAll(liElements);
    const spanLiElements = document.createElement("span");
    spanLiElements.classList.add("item-selected");
    spanLiElements.textContent = element;
    ulElements.parentElement.insertBefore(spanLiElements, ulElements);
}

function createArrayList(type) {
    let listElementsUl;
    let liElements;
    let selected;
    if(type === "ingredients") {
        listElementsUl = document.querySelector(".ul-ingredients");
        liElements = ".ul-ingredients li";
        selected = ".list-ingredients .item-selected";
    }
    if(type === "appliances") {
        listElementsUl = document.querySelector(".ul-appliances");
        liElements = ".ul-appliances li";
        selected = ".list-appliances .item-selected";
    }
    if(type === "ustensils") {
        listElementsUl = document.querySelector(".ul-ustensils");
        liElements = ".ul-ustensils li";
        selected = ".list-ustensils .item-selected";
    }
    liElements = document.querySelectorAll(liElements);
    selected = document.querySelectorAll(selected);
    let arrayElements = [];
    let insertElement;
    for(let i = 0; i < liElements.length; i++) {
        insertElement = true;
        for(let y = 0; y < selected.length; y++) {
            if(liElements[i].textContent !== selected[y].textContent) {
            }
            else {
                insertElement = false;
            }
        }
        if(insertElement === true) {
            arrayElements.push(liElements[i].textContent);
        }
    }
    displayElementsFilter(listElementsUl, arrayElements, type)
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