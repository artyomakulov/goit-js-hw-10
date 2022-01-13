import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import FetchCountries from './fetchCountries.js'

const refs = {
    input: document.querySelector('#search-box'),
    ul: document.querySelector('.country-list'),
    div: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(CountryName, DEBOUNCE_DELAY));

function CountryName(event) {
    let name = event.target.value;
    if (event.target.value === '') {
        refs.ul.innerHTML = '';
        refs.div.innerHTML = '';
    }
    else {
        refs.ul.innerHTML = '';
        refs.div.innerHTML = '';
        FetchCountries.fetchCountries(name).then(Response => {
            Response.json().then(data => {
                if (data.length > 10) {
                    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                    return
                }
                else if (data.length >= 2 && data.length <= 10) {
                    return data.map(({ name, flags }) => {
                        const nameOfCountry = `<li><img src="${flags.svg}" width=20 height=20 alt="flag">${name.official}</li>`;
                        return refs.div.insertAdjacentHTML('afterbegin', nameOfCountry.trim())
                    })
                }
                return data.map(({ name, capital, population, flags, languages }) => {
                    const nameOfCountry = `<li><img src="${flags.svg}" width=20 height=20 alt="flag">${name.official}</li>
    <li>capital ${capital}</li>
    <li>population ${population}</li>
    <li>languages ${Object.values(languages).join(' ')}</li>`;
                    console.log(data)
                    return refs.div.insertAdjacentHTML('afterbegin', nameOfCountry.trim())
                }
                )
            }
            )
                .catch(error => {
                    Notiflix.Notify.failure('Oops, there is no country with that name')
               
                })
       })
        
    }
}
console.log(FetchCountries)