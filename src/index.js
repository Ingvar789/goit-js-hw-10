import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import getRefs from './get-refs';
const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const name = e.target.value.trim();

    if (name === '') {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return
    }

    fetchCountries(trimName)
        .then(countries => { filterCountries(countries) })
        .catch(error => { console.log(error) });
}

function filterCountries(countries) {
    
    if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
    }
    else if (countries.length > 10) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
     else if (2 <= countries.length && countries.length <= 10) {
        refs.countryInfo.innerHTML = '';
        renderContriesList(countries);
    }
    else if (countries.length === 1) {
        refs.searchInput.innerHTML = ""
        refs.countryList.innerHTML = '';
        renderCountryCard(countries[0]);
    } 
}

function renderContriesList(countries) {
    let markup = '';
    for (let country of countries) {
     markup += `<li style="max-height:40px; display:flex; margin-bottom:10px; align-items: center;"><img src="${country.flag}" alt="${country.name}" style="margin-right:10px"> ${country.name}</li>`;
    }
    refs.countryList.innerHTML = markup;
    return 
}
function renderCountryCard({ name, flag, capital, languages, population }) {
    const lang = languages.map(lang => lang.name).join(", ");
    const markup = `<div class="card">
    <div class="flag">
        <img src="${flag}" alt="${name}">
    </div>
    <div class="card-body">
        <h2 class="name">${name}</h2>
        <p class="capital">Capital: ${capital}</p>
        <p class="population">Population: ${population}</p>
        <p class="languages">Languages: ${lang}</p>
    </div>
</div>`;
      refs.countryInfo.innerHTML = markup;
    return 
}


