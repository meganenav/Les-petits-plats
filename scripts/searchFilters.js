//Récupération des tags affichés
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

//Appel à la création du tag avec écouteur d'événement pour fermer le tag si besoin
function filterByTag(element, type) {
    createTagSpan(element.textContent, type);
    const tagCloseImg = document.querySelectorAll(".tag-close-img");
    for(let i = 0; i < tagCloseImg.length; i++) {
        tagCloseImg[i].addEventListener("click", () => {
            closeTag(tagCloseImg[i], type);
        });
    }
}

//Création de la span du tag
function createTagSpan(element) {
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

//Fermeture du tag avec remise en ordre des recettes et des listes de filtres
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

//Suppression de la liste déroulante de l'élément sélectionné dans la liste
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

//Fermeture de l'élément sélectionné dans la liste déroulante
function closeSelectedElement(element) {
    const tags = document.querySelectorAll(".tag-span");
    for(let i = 0; i < tags.length; i++) {
        if(tags[i].textContent === element.textContent) {
            tags[i].remove();
            element.remove();
            searchRecipes();
        }
    }
}