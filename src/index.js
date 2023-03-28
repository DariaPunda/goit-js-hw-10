import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY))

function handleInput(e) {
    const inputCountryValue = e.target.value.trim();
    console.log(inputCountryValue);

    fetchCountries(inputCountryValue).then(renderCountryInfo).catch(error);
};

function renderCountryInfo(data) {
    const countryItem = data.map(({ name, flags }) => {
        return `<li style="list-style:none; padding:10px; display:flex; justify-content:flex-start">
        <img width=5% style="margin-right:10px; align-items:baseline" src='${flags.svg}' alt="Flag"><h1 style="font-size:18px">${name.official}</h1>
     </li>`}).join('');
    
    console.log(countryItem)
    console.log(data)


    const countryFullInfo = data.map(({capital, population, languages }) => {
        return `<h2 style="font-size:20px; font-weight: 700; padding-left:40px">Capital:<span 
            style="font-weight: 400">${capital}</span></h2><p style="font-size:18px; 
            font-weight: 700; padding-left:40px">Population:<span style="font-weight: 400">
            ${population}</span></p><p style="font-size:18px; 
            font-weight: 700; padding-left:40px">Languages:<span style="font-weight: 400">
            ${Object.values(languages)}</span></p>`
    }).join('');
    
    console.log(countryFullInfo);


        if (data.length > 10) {
           return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
        } else if (data.length>=2 && data.length< 10) {
            clearAdditionalInfo()
            clearSearching()
            return listEl.insertAdjacentHTML('afterbegin', countryItem);
        } else if(data.length === 1) {
            return countryInfoEl.insertAdjacentHTML('afterbegin', countryFullInfo);
        }
}

renderCountryInfo();

function clearSearching() {
   return listEl.innerHTML = '';
}

function clearAdditionalInfo() {
    return countryInfoEl.innerHTML = '';
}

function error() {
    return Notiflix.Notify.failure('Oops, there is no country with that name')
};

