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

function removeElementToSelected(element, ulElements, type) {
    let liElements = "." + ulElements.className + " li";
    liElements = document.querySelectorAll(liElements);
    const spanLiElements = document.createElement("span");
    spanLiElements.classList.add("item-selected");
    spanLiElements.textContent = element;
    const imgClose = document.createElement("img");
    imgClose.setAttribute("src", "assets/close-selected-element.svg");
    spanLiElements.appendChild(imgClose);
    ulElements.parentElement.insertBefore(spanLiElements, ulElements);
    const img = document.querySelectorAll(".item-selected img");
    spanLiElements.addEventListener("mouseover", () => {
        const img = spanLiElements.querySelector("img");
        img.style.display = "flex";
    });
    spanLiElements.addEventListener("mouseout", () => {
        const img = spanLiElements.querySelector("img");
        img.style.display = "none";
    });
    for(let i = 0; i < img.length; i++) {
        img[i].addEventListener("click", () => {
            closeSelectedElement(img[i].parentElement, type);
        });
    }
}

function closeSelectedElement(element, type) {
    const tags = document.querySelectorAll(".tag-span");
    for(let i = 0; i < tags.length; i++) {
        if(tags[i].textContent === element.textContent) {
            tags[i].remove();
            element.remove();
            searchRecipes();
            createArrayList(type);
        }
    }
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