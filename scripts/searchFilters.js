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
}