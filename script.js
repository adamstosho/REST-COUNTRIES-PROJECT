const searchBox = document.getElementById("searchBox");
const clearButton = document.getElementById("clearButton");
const countriesContainer = document.getElementById("countriesContainer");

let allCountries = [];

// Fetch all countries data at once
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

  // Neighboring Country (if available)
  if (neighborCountry) {
    const neighborCountryCard = createCountryCard(neighborCountry, "");
    countriesContainer.appendChild(neighborCountryCard);
  }
}

// Create a country card element
function createCountryCard(country, title) {
  const countryCard = document.createElement("div");
  countryCard.classList.add("country-card");

  countryCard.innerHTML = `
    
    <img src="${country.flags?.png || "https://via.placeholder.com/150"}" alt="${country.name?.common || "Unknown"} flag">
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




// Show all countries data to the console
function logAllCountriesToConsole() {
  console.log("All Countries Data:", allCountries);
}
logAllCountriesToConsole()