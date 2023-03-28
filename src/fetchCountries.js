export function fetchCountries(countryName){
    const searchUrl = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;
    return fetch(searchUrl).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}