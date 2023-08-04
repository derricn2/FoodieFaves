//add event listener to each recipe name to render single recipe with intructions
const recipeNameEl = document.querySelectorAll('.recipe-name');
const deleteButtons = document.querySelectorAll('.delete-recipe');

for (let i = 0; i < recipeNameEl.length; i++){
    const recipeID = recipeNameEl[i].getAttribute('data-id')
    recipeNameEl[i].addEventListener('click', function(){
        loadSingleRecipe(recipeID)
    });
};

async function loadSingleRecipe(recipeID){
    window.location.assign(`/api/recipes/${recipeID}`)
};

for (let i = 0; i < deleteButtons.length; i++) {
    const recipeID = deleteButtons[i].getAttribute('data-id');
    deleteButtons[i].addEventListener('click', function() {
        deleteRecipe(recipeID);
    });
}

async function deleteRecipe(recipeID) {
    try {
        const response = await fetch(`/api/recipes/${recipeID}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            location.reload();
        } else {
            alert('You can only delete your OWN recipes!');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}