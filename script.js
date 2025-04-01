const searchBox = document.getElementById("searchBox");
const clearButton = document.getElementById("clearButton");
const countriesContainer = document.getElementById("countriesContainer");

let allCountries = [];

// Fetch all countries data from the API and catching the error
async function fetchAllCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    allCountries = await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Find country by name
function findCountryByName(name) {
  return allCountries.find(country =>
    country.name.common.toLowerCase() === name.toLowerCase()
  );
}

// Find neighboring country
function findNeighborCountry(country) {
  if (!country.borders || country.borders.length === 0) return null;
  return allCountries.find(c => country.borders.includes(c.cca3)); // Find neighbor by country code
}

// Display the main country and its neighbor
function displayCountries(mainCountry, neighborCountry) {
  countriesContainer.innerHTML = ""; // Clear previous content

  // Main Country
  const mainCountryCard = createCountryCard(mainCountry, "");
  countriesContainer.appendChild(mainCountryCard);

  // Neighboring and styling using JS
  if (neighborCountry) {
    const neighborCountryCard = createCountryCard(neighborCountry, "");
    countriesContainer.appendChild(neighborCountryCard);

    // Adding title for neighboring country
    const neighborTitle = document.createElement("h3");
    neighborTitle.textContent = "Neighbouring Country";

    neighborTitle.style.position = "absolute";
    neighborTitle.style.top = "-10px";
    neighborTitle.style.left = "69%";
    neighborTitle.style.transform = "translateX(-50%)";
    neighborTitle.style.backgroundColor = "#f0f0f0";
    neighborTitle.style.padding = "5px 10px";
    neighborTitle.style.borderRadius = "5px";
    neighborTitle.style.fontFamily = "Times New Roman";
    neighborTitle.style.fontSize = "14px";
    neighborTitle.style.marginTop = "5px";
    neighborTitle.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.2)";
    countriesContainer.style.position = "relative";
    countriesContainer.appendChild(neighborTitle);
    neighborCountryCard.style.transform = "scale(0.85)";
  }
}


// Creating a country card elements
function createCountryCard(country) {
  const countryCard = document.createElement("div");
  countryCard.classList.add("country-card");

  countryCard.innerHTML = `
    
    <img src="${country.flags?.png || "https://shorturl.at/pJjfv"}" alt="${country.name?.common || "Unknown"} flag">
    <div>
    <h2>${country.name?.common || "Unknown"}</h2>
    <p>🌆 ${country.region || "Unknown"}</p>
    <p>👲🏾 ${country.population?.toLocaleString() || "N/A"}</p>
    <p>🗣️ ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
    <p>💵 ${country.currencies ? Object.values(country.currencies)[0]?.name : "N/A"}</p>
    <div>
  `;

  return countryCard;
}

// Adding event listener for search
searchBox.addEventListener("input", (e) => {
  const query = e.target.value.trim();

  if (query) {
    const country = findCountryByName(query);
    if (country) {
      const neighbor = findNeighborCountry(country);
      displayCountries(country, neighbor);
    } else {
      countriesContainer.innerHTML = `<p>Country not found!</p>`;
    }
  } else {
    countriesContainer.innerHTML = ""; // Clear display when input is empty
  }
});

// Event listener for clearing search
clearButton.addEventListener("click", () => {
  searchBox.value = "";
  countriesContainer.innerHTML = "";
});

// This is to load all countries on page load
fetchAllCountries();




// Function to log all countries' details to the console after fetching them
// async function logAllCountries() {
//   if (allCountries.length === 0) {
//     await fetchAllCountries();
//   }
//   console.log(allCountries);
// }
// logAllCountries();


