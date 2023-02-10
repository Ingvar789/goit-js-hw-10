import Notiflix from 'notiflix';
import getRefs from './get-refs';
const BASE_URL = 'https://restcountries.com/v2/name/';
const refs = getRefs();
export function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flag,languages`)
        .then(countries => {
            if (!countries.ok) {
                return countries = [];
            }
            return countries.json();
        },
        );
}
