document.addEventListener("DOMContentLoaded", () => {
    getRandomMeal();
    document.getElementById("sbutton").addEventListener("click", () => {
      const term = document.getElementById("intake").value.trim();
      if (term !== "") {
        MealSearch(term);
      } else {
        alert("Please enter a search term");
      }
    });
  });
  
  async function getRandomMeal() {
    const y = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const info = await y.json();
    const randomMeal = info.meals[0];
  
    const randomMealContainer = document.getElementById(
      "mealOfTheMoment-container"
    );
    randomMealContainer.innerHTML = `
          <div class="centered-container">
              <img src="${randomMeal.strMealThumb}" alt="${randomMeal.strMeal}" onclick="ModalDisiplay('${randomMeal.strMeal}')">
              <h3>${randomMeal.strMeal}</h3>
          </div>
      `;
  }
  
  function ModalDisiplay(mealName) {
    const modal = document.getElementById("modal");
    const modalContentContainer = document.getElementById(
      "modal-content-container"
    );
  
    // Fetching ingredients and instructions for the selected meal
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
      .then((y) => y.json())
      .then((info) => {
        const meal = info.meals[0];
        modalContentContainer.innerHTML = `
              <div class="modal-content-inner">
                  <div class="title-and-image">
                      <h3>${meal.strMeal}</h3>
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-image">
                  </div>
                  <div class="ingredients-section">
                      ${ListOfIngredientsAndInstructions(meal)}
                  </div>
              </div>
              <div class="instructions-section">
                  <h3>Instructions</h3>
                  <p class="instructions">${meal.strInstructions}</p>
              </div>
          `;
        modal.style.display = "block";
      });
  }
  
  async function MealSearch(category) {
    const y = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const info = await y.json();
    const searchedMealsContainer = document.getElementById(
      "searched-meals-container"
    );
  
    if (info.meals) {
      searchedMealsContainer.innerHTML = "";
  
      info.meals.forEach((meal) => {
        searchedMealsContainer.innerHTML += `
                  <div class="meal">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" onclick="ModalDisiplay('${meal.strMeal}')">
                      <h3>${meal.strMeal}</h3>
                  </div>
              `;
      });
  
      // Showing the searched meals section
      document.getElementById("searched-meals").style.display = "block";
    } else {
      alert("No meals found for the specified category");
    }
  }
  
 
  function endModal() {
    document.getElementById("modal").style.display = "none";
  }
  
  function ListOfIngredientsAndInstructions(meal) {
    let ingredientsList =
      '<div class="ingredients-container"><h3>Ingredients</h3><ul class="ingredients-list">';
  
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
  
      if (ingredient && measure) {
        ingredientsList += `<li><span>&bull;</span> ${ingredient}: ${measure}</li>`;
      }
    }
  
    ingredientsList += "</ul></div>";
    return ingredientsList;
  }
  
  // Close the modal if the user clicks outside of it
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
  function search() {
    const term = document.getElementById("intake").value.trim();
    if (term !== "") {
      MealSearch(term);
    } else {
      alert("Please enter a search term");
    }
  }