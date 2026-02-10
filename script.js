const countriesContainer = document.getElementById("countries");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const themeToggle = document.getElementById("theme-toggle");
let allCountries = [];
async function fetchCountries() {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
    );
    if (!response.ok) {
      throw new Error("API failed");
    }
    const data = await response.json();
    allCountries = data;
    renderCountries(allCountries);
  } catch (error) {
    countriesContainer.innerHTML =
      "<p style='text-align:center'>Failed to load countries.</p>";
    console.error(error);
  }
}
function renderCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach(country => {
    const card = document.createElement("div");
    card.className = "country";
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common}">
      <div class="country-info">
        <h3>${country.name.common}</h3>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
      </div>
    `;
    countriesContainer.appendChild(card);
  });
}
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  renderCountries(
    allCountries.filter(country =>
      country.name.common.toLowerCase().includes(value)
    )
  );
});
regionFilter.addEventListener("change", () => {
  const region = regionFilter.value;
  renderCountries(
    region
      ? allCountries.filter(country => country.region === region)
      : allCountries
  );
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});


fetchCountries();
