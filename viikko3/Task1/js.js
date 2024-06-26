const restaurants = [];
import { restaurantRow , restaurantModal} from './components.js';

const table = document.querySelector("table");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const sodexoBtn = document.getElementById("btn1");
const compassBtn = document.getElementById("btn2");

async function getRestaurants() {
  // Clear the restaurants array
  restaurants.length = 0;

  try {
    const response = await fetch(
      "https://10.120.32.94/restaurant/api/v1/restaurants"
    );
    if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
    } else {
      const data = await response.json();
      console.log(data);
      data.forEach((restaurant) => {
        restaurants.push(restaurant);
      });
      restaurants.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      createTable();
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

const getDailyMenu = async (id) => {
  try {
    const response = await fetch(
      `https://10.120.32.94/restaurant/api/v1/restaurants/daily/${id}/fi`
    );
    if (!response.ok) {
      throw new Error(error);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};


const createTable = () => {
  restaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    row.addEventListener("click", () => {
      document.querySelectorAll("tr").forEach((row) => {
        row.classList.remove("highlight");
      });

      row.classList.add("highlight");
      modal.style.display = "block";

      const modalContent = document.querySelector(".modal-content");

      while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
      }

      getDailyMenu(restaurant._id).then((menu) => {
        modalContent.innerHTML = restaurantModal(restaurant, menu);
      });
    });

    table.appendChild(row); // This line should be inside the forEach loop
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
sodexoBtn.addEventListener('click', async () => {
  await getRestaurants();
  const sodexoRestaurants = restaurants.filter(restaurant => restaurant.company === 'Sodexo');

  // Clear the table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // Create the table with only Sodexo restaurants
  sodexoRestaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    row.addEventListener("click", () => {
      document.querySelectorAll("tr").forEach((row) => {
        row.classList.remove("highlight");
      });

      row.classList.add("highlight");
      modal.style.display = "block";

      const modalContent = document.querySelector(".modal-content");

      while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
      }

      getDailyMenu(restaurant._id).then((menu) => {
        modalContent.innerHTML = restaurantModal(restaurant, menu);
      });
    });

    table.appendChild(row); 
  });
});


compassBtn.addEventListener('click', async () => {
  await getRestaurants();
  const compassRestaurants = restaurants.filter(restaurant => restaurant.company === 'Compass Group');

  // Clear the table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // Create the table with only Compass restaurants
  compassRestaurants.forEach((restaurant) => {
    const row = restaurantRow(restaurant);
    row.addEventListener("click", () => {
      document.querySelectorAll("tr").forEach((row) => {
        row.classList.remove("highlight");
      });

      row.classList.add("highlight");
      modal.style.display = "block";

      const modalContent = document.querySelector(".modal-content");

      while (modalContent.firstChild) {
        modalContent.removeChild(modalContent.firstChild);
      }

      getDailyMenu(restaurant._id).then((menu) => {
        modalContent.innerHTML = restaurantModal(restaurant, menu);
      });
    });

    table.appendChild(row); 
  });
});

getRestaurants();