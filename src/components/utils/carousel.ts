import createDivItemCard from './renderRequestCard';
import { showLogin } from '../controller/listeners/listeners';
import { pageState } from '../model/pageState';
import { allApplies } from '../controller/dataHandlers/applyFilters';
const mainPage: string = pageState[0];

export default function carousel() {
  const cards = document.querySelector('.slider__items') as HTMLElement;
  const ITEM_LEFT = document.querySelector('.slider__item-left') as HTMLElement;
  const ITEM_ACTIVE = document.querySelector('.slider__item-active') as HTMLElement;
  const ITEM_RIGHT = document.querySelector('.slider__item-right') as HTMLElement;
  const BTN_LEFT = document.querySelector('.prev') as HTMLElement;
  const BTN_RIGHT = document.querySelector('.next') as HTMLElement;
  let currentIndex = 0;
  let cardsOnPage: number;

  if (window.matchMedia('(max-width: 767px)').matches) {
    cardsOnPage = 1; 
  } else if (window.matchMedia('(max-width: 1279px)').matches) {
    cardsOnPage = 2;
  } else {
    cardsOnPage = 3;
  }
  
  function createCards(index: number) {    
    for (index; index < cardsOnPage; index++) {
      const divLeft = createDivItemCard(allApplies[index], mainPage);
      if (divLeft) ITEM_LEFT.appendChild(divLeft); 
      const divActiv = createDivItemCard(allApplies[index + cardsOnPage], mainPage);
      if (divActiv) ITEM_ACTIVE.appendChild(divActiv);
      const divRight = createDivItemCard(allApplies[index + (cardsOnPage * 2)], mainPage);
      if (divRight) ITEM_RIGHT.appendChild(divRight);       
    } 
    const helpBtns: NodeListOf<Element> = document.querySelectorAll('.card__login-btn');
    [...helpBtns].map(item => item.addEventListener('click', showLogin));  
  }
  createCards(0);

  const moveLeft = () => { 
    cards.classList.add('transition-left');
    BTN_LEFT.removeEventListener('click', moveLeft);
    //BTN_RIGHT.removeEventListener('click', moveRight);
  };
  const moveRight = () => {      
    cards.classList.add('transition-right');
    BTN_LEFT.removeEventListener('click', moveLeft);
    BTN_RIGHT.removeEventListener('click', moveRight);
  }; 

  BTN_LEFT.addEventListener('click', moveLeft);
  BTN_RIGHT.addEventListener('click', moveRight);

  cards.addEventListener('animationend', (animationEvent) => {
    let cardsWhile = cardsOnPage;
    
    if (animationEvent.animationName === 'move-left') {      
      cards.classList.remove('transition-left');      
      ITEM_RIGHT.innerHTML = ITEM_ACTIVE.innerHTML;      
      ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
      ITEM_LEFT.innerHTML = '';
      while (cardsWhile) {
        if (currentIndex === 0) currentIndex = allApplies.length - 1;
        const div = createDivItemCard(allApplies[currentIndex], mainPage);
        if (div) ITEM_LEFT.appendChild(div);
        currentIndex--;
        cardsWhile--;
        const helpBtns: NodeListOf<Element> = document.querySelectorAll('.card__login-btn');
        [...helpBtns].map(item => item.addEventListener('click', showLogin));  
      }
    } else {
      if (currentIndex === 0) currentIndex = cardsOnPage * 3;       
      cards.classList.remove('transition-right');      
      ITEM_LEFT.innerHTML = ITEM_ACTIVE.innerHTML;
      ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;     
      ITEM_RIGHT.innerHTML = '';     
      while (cardsWhile) {   
        if (currentIndex === allApplies.length) currentIndex = 0;     
        const div = createDivItemCard(allApplies[currentIndex], mainPage);
        if (div) ITEM_RIGHT.appendChild(div);
        currentIndex++;
        cardsWhile--;
        const helpBtns: NodeListOf<Element> = document.querySelectorAll('.card__login-btn');
        [...helpBtns].map(item => item.addEventListener('click', showLogin));  
      }
    }    
    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);   
    return currentIndex;  
  });
}
