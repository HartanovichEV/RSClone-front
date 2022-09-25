import { Vars } from '../model/type/type';

export const innerTextClosed = 'Показать фильтры';
export const innerTextOpened = 'Скрыть фильтры';

function getVars(): Vars {
  const sideMenu = document.querySelector('.side-menu') as HTMLElement;
  const sideMenuSpan = document.querySelector('.side-menu__span') as HTMLElement;
  const filtersWrapper = document.querySelector('.filters-section') as HTMLElement;
  const filters = document.querySelector('.filters-section__filters') as HTMLElement;

  return { sideMenu, sideMenuSpan, filtersWrapper, filters };
}

export function showFiltersMenu(): void {
  const { sideMenu, sideMenuSpan, filtersWrapper, filters } = getVars(); 
  
  filters.classList.add('filters-section__filters--open');
  sideMenu.classList.add('side-menu--close');
  sideMenuSpan.classList.add('side-menu__span--close');
  filtersWrapper.classList.add('filters-section--overlay');
  filters.classList.remove('filters-section__filters--fadeout');
  filters.classList.remove('filters-section--close');

  if (sideMenuSpan.innerText === innerTextClosed) {
    sideMenuSpan.innerText = innerTextOpened;
  } else sideMenuSpan.innerText = innerTextClosed;

  setTimeout(() => {
    filters.classList.add('filters-section__filters--fadein');
  }, 200);

  document.body.classList.add('modal--open');
}

export function hideFiltersMenu(): void {
  const { sideMenu, sideMenuSpan, filtersWrapper, filters } = getVars(); 

  if (filters.classList.contains('filters-section__filters--open')) {
    if (sideMenuSpan.innerText === innerTextClosed) {
      sideMenuSpan.innerText = innerTextOpened;
    } else sideMenuSpan.innerText = innerTextClosed;
  }

  filters.classList.remove('filters-section__filters--fadein');
  sideMenu.classList.remove('side-menu--close');
  sideMenuSpan.classList.remove('side-menu__span--close');
  filtersWrapper.classList.remove('filters-section--overlay');
  filters.classList.add('filters-section__filters--fadeout');
  
  setTimeout(() => {
    filters.classList.remove('filters-section__filters--open');
  }, 200);

  document.body.classList.remove('modal--open');
}