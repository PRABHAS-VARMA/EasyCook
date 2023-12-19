
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display random meal on page load
    getRandomMeal();

    document.getElementById('search-btn').addEventListener('click', () => {
        const searchTerm = document.getElementById('search-input').value.trim();
        if (searchTerm !== '') {
            searchMealCategory(searchTerm);
        } else {
            alert('Please enter a search term');
        }
    });
});

async function getRandomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const randomMeal = data.meals[0];

    const randomMealContainer = document.getElementById('random-meal-container');
    randomMealContainer.innerHTML = `
        <div class="centered-container">
            <img src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}" onclick="showIngredientsModal('${randomMeal.strMeal}')">
            <h3>${randomMeal.strMeal}</h3>
        </div>
    `;
}



async function searchMealCategory(category) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    const searchedMealsContainer = document.getElementById('searched-meals-container');
    
    if (data.meals) {
        searchedMealsContainer.innerHTML = '';

        data.meals.forEach(meal => {
            searchedMealsContainer.innerHTML += `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" onclick="showIngredientsModal('${meal.strMeal}')">
                    <h3>${meal.strMeal}</h3>
                </div>
            `;
        });

        // Show the searched meals section
        document.getElementById('searched-meals').style.display = 'block';
    } else {
        alert('No meals found for the specified category');
    }
}

function showIngredientsModal(mealName) {
    const modal = document.getElementById('modal');
    const modalContentContainer = document.getElementById('modal-content-container');

    // Fetch ingredients and instructions for the selected meal
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            modalContentContainer.innerHTML = `
            <div class="modal-content-inner">
                <div class="title-and-image">
                    <h3>${meal.strMeal}</h3>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                </div>
                <div class="ingredients-section">
                    ${generateIngredientsList(meal)}
                </div>
            </div>
            <div class="instructions-section">
                <h3>Instructions</h3>
                <p class="instructions">${meal.strInstructions}</p>
            </div>
        `;
``        
            modal.style.display = 'block';
        });
}





function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
function generateIngredientsList(meal) {
    let ingredientsList = '<div class="ingredients-container"><h3>Ingredients</h3><ul class="ingredients-list">'; // Start an unordered list

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && measure) {
            ingredientsList += `<li><span>&bull;</span> ${ingredient}: ${measure}</li>`; // Use &bull; for a bullet
        }
    }

    ingredientsList += '</ul></div>'; // End the unordered list and the new div
    return ingredientsList;
}




// Close the modal if the user clicks outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
