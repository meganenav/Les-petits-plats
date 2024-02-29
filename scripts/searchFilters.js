function filterByTag(element, recipes, type) {
    letters = element.textContent.toLowerCase();
    let newRecipesArray = [];
    let verifElement;
    for(let i = 0; i < recipes.length; i++) {
        if(type === "ingredients") {
            verifElement = verificationIngredients(letters, recipes[i]);
        }
        if(type === "appliances") {
            verifElement = verificationAppliances(letters, recipes[i]);
        }
        if(type === "ustensils") {
            verifElement = verificationUstensils(letters, recipes[i]);
        }
        if(verifElement) {
            newRecipesArray.push(recipes[i]);
        }   
    }
    createNewRecipes(newRecipesArray);
    createTagSpan(element.textContent);

    const tagCloseImg = document.querySelectorAll(".tag-close-img");
    for(let i = 0; i < tagCloseImg.length; i++) {
        tagCloseImg[i].addEventListener("click", () => {
            closeTag(tagCloseImg[i]);
        });
    }
}

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

function closeTag(tagCloseImg) {
    tagCloseImg.parentElement.remove();
}