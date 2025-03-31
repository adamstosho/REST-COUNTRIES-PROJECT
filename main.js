// Adjust neighboring country card size and add "Neighbor" label
function createCountryCardWithLabel(country, isNeighbor = false) {
  const countryCard = document.createElement("div");
  countryCard.classList.add("country-card");

  // Adjust size for neighbor country
  if (isNeighbor) {
    countryCard.style.transform = "scale(0.9)"; // 10% smaller
    const label = document.createElement("div");
    label.textContent = "Neighbor";
    label.style.position = "absolute";
    label.style.top = "-20px";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    label.style.backgroundColor = "#f0f0f0";
    label.style.padding = "5px 10px";
    label.style.borderRadius = "5px";
    label.style.fontWeight = "bold";
    label.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.2)";
    countryCard.style.position = "relative";
    countryCard.appendChild(label);
  }

  countryCard.innerHTML += `
    <img src="${country.flags?.png || "https://via.placeholder.com/150"}" alt="${country.name?.common || "Unknown"} flag">
    <div>
      <h2>${country.name?.common || "Unknown"}</h2>
      <p>🌆 ${country.region || "Unknown"}</p>
      <p>👲🏾 ${country.population?.toLocaleString() || "N/A"}</p>
      <p>🗣️ ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
      <p>💵 ${country.currencies ? Object.values(country.currencies)[0]?.name : "N/A"}</p>
    </div>
  `;

  return countryCard;
}

// Update displayCountries to use the new function
function displayCountries(mainCountry, neighborCountry) {
  countriesContainer.innerHTML = ""; // Clear previous content

  // Main Country
  const mainCountryCard = createCountryCardWithLabel(mainCountry);
  countriesContainer.appendChild(mainCountryCard);

  // Neighboring Country (if available)
  if (neighborCountry) {
    const neighborCountryCard = createCountryCardWithLabel(neighborCountry, true);
    countriesContainer.appendChild(neighborCountryCard);
  }
}