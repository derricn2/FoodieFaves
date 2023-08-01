//add event listener to each recipe name to render single recipe with intructions
const recipeNameEl = document.querySelectorAll('.recipe-name');

for (let i = 0; i < recipeNameEl.length; i++){
    const recipeID = recipeNameEl[i].getAttribute('data-id')
    recipeNameEl[i].addEventListener('click', function(){
        loadSingleRecipe(recipeID)
    });
};

async function loadSingleRecipe(recipeID){
    window.location.assign(`/api/recipes/${recipeID}`)
};

