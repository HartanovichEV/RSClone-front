import { filterCategoryChosen, filterFormatChosen, filterCountryChosen } from './filters';
import { checkCategoryChosen, checkFormatChosen, checkCountryChosen } from './filters';

import { ApplyWithUser } from '../model/type/type';
import { allAppliesWithUsers } from '../controller/dataHandlers/createAppliesWithUser';


const dataUserApply = await allAppliesWithUsers();

export default function getArrayWithAllFilters() {
  let arrayWithAllFilters: ApplyWithUser[] = [];

  function getArrayNameFilters<T>(filterChosen: T) {
    for (const myProp in filterChosen) {
      const key = myProp as keyof typeof filterChosen; 
      if (filterChosen[key]) {        
        (document.querySelector(`.${String(key)}`) as HTMLElement).classList.add('color-btn');
      }
    }
  }
  getArrayNameFilters(filterCategoryChosen);
  getArrayNameFilters(filterFormatChosen);
  getArrayNameFilters(filterCountryChosen);

  const arrayWithCategoryFilters = checkCategoryChosen(dataUserApply);
  const arrayWithFormatFilters = checkFormatChosen(arrayWithCategoryFilters);
  arrayWithAllFilters = checkCountryChosen(arrayWithFormatFilters);
  return arrayWithAllFilters;
}