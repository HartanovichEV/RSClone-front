import { ApplyWithUser, Category, Format, Country } from '../model/type/type';
import LocalStorage from './classLocalStorage';
import { showMessageEmail } from '../controller/listeners/listeners';
import { pagination } from './pagination';
import { allApplies, getNotMyApplies, getOpenApplies } from '../controller/dataHandlers/applyFilters';

const openApplies =  getOpenApplies(allApplies);
const notMyApplies = getNotMyApplies(openApplies);

export let filterCategoryChosen = {
  healthcare: false,
  emergency: false,
  veterans: false,
  invalid: false,
  сhildren: false,
  animal: false,
  nature: false,
  science: false,
  education: false,
  other: false,
};
export let filterFormatChosen = {
  online: false,
  offline: false,
};
export let filterCountryChosen = {
  belarus: false,
  russia: false,
  ukraine: false,
};
//localStorage
const localStorage = new LocalStorage();

function setLocalStorage() {  
  localStorage.save('filterCategoryChosen', filterCategoryChosen);
  localStorage.save('filterFormatChosen', filterFormatChosen);
  localStorage.save('filterCountryChosen', filterCountryChosen);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  const fetchCategory = localStorage.fetch('filterCategoryChosen');
  if (typeof fetchCategory === 'object') filterCategoryChosen = fetchCategory;
  const fetchFormat = localStorage.fetch('filterFormatChosen');
  if (typeof fetchFormat === 'object') filterFormatChosen = fetchFormat; 
  const fetchCountry = localStorage.fetch('filterCountryChosen');
  if (typeof fetchCountry === 'object') filterCountryChosen = fetchCountry;   
}
window.addEventListener('load', getLocalStorage);

export function checkFormatChosen(array: ApplyWithUser[]) {
  let arrayWithFormatFilters: ApplyWithUser[] = [];
  if (filterFormatChosen.online && filterFormatChosen.offline) return array;
  if (!filterFormatChosen.online && !filterFormatChosen.offline) return array;
  if (filterFormatChosen.online) {
    arrayWithFormatFilters = arrayWithFormatFilters.concat(array.filter(el => el.format === Format.online)); 
  }
  if (filterFormatChosen.offline) {
    arrayWithFormatFilters = arrayWithFormatFilters.concat(array.filter(el => el.format === Format.offline)); 
  }
  return arrayWithFormatFilters; 
}

export function checkCountryChosen(array: ApplyWithUser[]) {
  if (!filterCountryChosen.belarus && !filterCountryChosen.russia && !filterCountryChosen.ukraine) {
    return array;
  } else {
    let arrayCountryChosen: ApplyWithUser[] = [];
    if (filterCountryChosen.belarus) {
      arrayCountryChosen = arrayCountryChosen.concat(array.filter(el => el.country === Country.belarus)); 
    }
    if (filterCountryChosen.russia) {
      arrayCountryChosen = arrayCountryChosen.concat(array.filter(el => el.country === Country.russia)); 
    }
    if (filterCountryChosen.ukraine) {
      arrayCountryChosen = arrayCountryChosen.concat(array.filter(el => el.country === Country.ukraine)); 
    }
    return arrayCountryChosen;
  }
}
export function checkCategoryChosen(array: ApplyWithUser[]) {
  let arrayNameFilters: string[] = [];
  for (const myProp in filterCategoryChosen) {
    const key = myProp as keyof typeof filterCategoryChosen; 
    if (filterCategoryChosen[key]) arrayNameFilters = arrayNameFilters.concat(key);    
  }
  if (arrayNameFilters.length === 0) return array;
  const arrayWithCategoryFilters = array.filter(elem => {
    const arrayString = arrayNameFilters.map(el => {
      const key = el as keyof typeof Category;
      return String(Category[key]);
    });
    return arrayString.includes(elem.category);
  });
  return arrayWithCategoryFilters;
}

export default function getFilter(e: Event) {
  const healthcare = document.querySelector('.healthcare') as HTMLElement;
  const emergency = document.querySelector('.emergency') as HTMLElement;
  const veterans = document.querySelector('.veterans') as HTMLElement;
  const invalid = document.querySelector('.invalid') as HTMLElement;
  const сhildren = document.querySelector('.сhildren') as HTMLElement; 
  const animal = document.querySelector('.animal') as HTMLElement;
  const nature = document.querySelector('.nature') as HTMLElement;
  const science = document.querySelector('.science') as HTMLElement;
  const education = document.querySelector('.education') as HTMLElement;
  const other = document.querySelector('.other') as HTMLElement; 

  const online = document.querySelector('.online') as HTMLElement;
  const offline = document.querySelector('.offline') as HTMLElement;

  const belarus = document.querySelector('.belarus') as HTMLElement;
  const russia = document.querySelector('.russia') as HTMLElement;
  const ukraine = document.querySelector('.ukraine') as HTMLElement;

  const requestsCards = document.querySelector('.requests-section__cards') as HTMLElement;
  const pege = document.querySelector('.page') as HTMLElement;
  requestsCards.innerHTML = '';
  switch (e.target) {
    case healthcare:
      filterCategoryChosen.healthcare = filterCategoryChosen.healthcare ? false : true;
      healthcare.classList.toggle('color-btn');
      break;
    case emergency:
      filterCategoryChosen.emergency = filterCategoryChosen.emergency ? false : true;
      emergency.classList.toggle('color-btn');
      break;
    case veterans:
      filterCategoryChosen.veterans = filterCategoryChosen.veterans ? false : true;
      veterans.classList.toggle('color-btn');
      break;
    case invalid:
      filterCategoryChosen.invalid = filterCategoryChosen.invalid ? false : true;
      invalid.classList.toggle('color-btn');
      break;
    case сhildren:
      filterCategoryChosen.сhildren = filterCategoryChosen.сhildren ? false : true;
      сhildren.classList.toggle('color-btn');
      break;
    case animal:
      filterCategoryChosen.animal = filterCategoryChosen.animal ? false : true;
      animal.classList.toggle('color-btn');
      break;    
    case nature:
      filterCategoryChosen.nature = filterCategoryChosen.nature ? false : true;
      nature.classList.toggle('color-btn');
      break;
    case science:
      filterCategoryChosen.science = filterCategoryChosen.science ? false : true;
      science.classList.toggle('color-btn');
      break;
    case education:
      filterCategoryChosen.education = filterCategoryChosen.education ? false : true;
      education.classList.toggle('color-btn');
      break;    
    case other:
      filterCategoryChosen.other = filterCategoryChosen.other ? false : true;
      other.classList.toggle('color-btn');
      break;
    case online:
      filterFormatChosen.online = filterFormatChosen.online ? false : true;
      online.classList.toggle('color-btn');
      break;
    case offline:
      filterFormatChosen.offline = filterFormatChosen.offline ? false : true;
      offline.classList.toggle('color-btn');
      break;
    case belarus:
      filterCountryChosen.belarus = filterCountryChosen.belarus ? false : true;
      belarus.classList.toggle('color-btn');
      break;    
    case russia:
      filterCountryChosen.russia = filterCountryChosen.russia ? false : true;
      russia.classList.toggle('color-btn');
      break;
    case ukraine:
      filterCountryChosen.ukraine = filterCountryChosen.ukraine ? false : true;
      ukraine.classList.toggle('color-btn');
      break;
  }
  
  let arrayWithAllFilters: ApplyWithUser[] = [];
  if (e.target === online || e.target === offline) {
    const arrayWithFormatFilters = checkFormatChosen(notMyApplies);
    const arrayWithCountryFilters = checkCountryChosen(arrayWithFormatFilters);
    arrayWithAllFilters = checkCategoryChosen(arrayWithCountryFilters);
    
  } else if (e.target === russia || e.target === belarus || e.target === ukraine) {
    const arrayWithCountryFilters = checkCountryChosen(notMyApplies);
    const arrayWithFormatFilters = checkFormatChosen(arrayWithCountryFilters);
    arrayWithAllFilters = checkCategoryChosen(arrayWithFormatFilters);
  } else {
    const arrayWithCategoryFilters = checkCategoryChosen(notMyApplies);
    const arrayWithFormatFilters = checkFormatChosen(arrayWithCategoryFilters);
    arrayWithAllFilters = checkCountryChosen(arrayWithFormatFilters);
  }
  pagination(arrayWithAllFilters);
  pege.innerText = '1';
  const helpBtns: NodeListOf<Element> = document.querySelectorAll('.card__login-btn');
  [...helpBtns].map(item => item.addEventListener('click', showMessageEmail));
}