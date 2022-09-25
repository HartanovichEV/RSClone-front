import createDivItemCard from './renderRequestCard';
import { ApplyWithUser } from '../model/type/type';
import { pageState } from '../model/pageState';
import { participateInApply } from '../model/api/applies';
import { showMessage } from './showMessage';

const userPage: string = pageState[1];

export function getCardsOnPage() {
  let cardsOnPage: number;  
  if (window.matchMedia('(max-width: 767px)').matches) {
    cardsOnPage = 3;
  } else if (window.matchMedia('(max-width: 1279px)').matches) {
    cardsOnPage = 6;
  } else {
    cardsOnPage = 9;
  }
  return cardsOnPage;
}

export function pagination(array: ApplyWithUser[]) {    
  const page = document.querySelector('.page') as HTMLElement;
  const BTN_PREV = document.querySelector('.prev') as HTMLElement;
  const BTN_NEXT = document.querySelector('.next') as HTMLElement;
  const BTN_START = document.querySelector('.start-page') as HTMLElement;
  const BTN_END = document.querySelector('.end-page') as HTMLElement;
  const requestsCards = document.querySelector('.requests-section__cards') as HTMLElement;
  let indexStartRender = 0;
  let pageNum = 1;
  const cardsOnPage = getCardsOnPage();
  
  function createPageWithFilters(index: number) {
    requestsCards.innerHTML = '';
    for (let i = index; i < (index + cardsOnPage); i++) {              
      const div = createDivItemCard(array[i], userPage);
      if (div) requestsCards.appendChild(div); 
    }
    const helpBtns: NodeListOf<Element> = document.querySelectorAll('.card__login-btn');
    [...helpBtns].map(item => item.addEventListener('click', (event)=>{
      const applyId = (event?.target as HTMLElement).getAttribute('applyId');
      if (!applyId) return showMessage('Что-то не так с заявкой', true);
      participateInApply(+applyId);
      setTimeout(()=>location.reload(), 2500);
    }));    
  } 
  createPageWithFilters(indexStartRender);
  if (!BTN_START.classList.contains('no-active')) BTN_START.classList.add('no-active');
  if (!BTN_PREV.classList.contains('no-active')) BTN_PREV.classList.add('no-active');

  if (page.classList.contains('no-active')) page.classList.remove('no-active');
  if (cardsOnPage < array.length) {
    if (BTN_END.classList.contains('no-active')) BTN_END.classList.remove('no-active');
    if (BTN_NEXT.classList.contains('no-active')) BTN_NEXT.classList.remove('no-active');
    BTN_END.addEventListener('click', () => {
      pageNum = Math.ceil(array.length / cardsOnPage); 
      page.innerText = `${pageNum}`;
      BTN_END.classList.toggle('no-active');
      BTN_NEXT.classList.toggle('no-active');
      BTN_START.classList.remove('no-active');
      BTN_PREV.classList.remove('no-active');
      indexStartRender = (pageNum * cardsOnPage) - cardsOnPage;
      createPageWithFilters(indexStartRender);    
    });
    BTN_START.addEventListener('click', () => {
      pageNum = 1; 
      page.innerText = `${pageNum}`;
      BTN_END.classList.remove('no-active');
      BTN_NEXT.classList.remove('no-active');
      BTN_START.classList.toggle('no-active');
      BTN_PREV.classList.toggle('no-active');
      indexStartRender = 0;
      createPageWithFilters(indexStartRender);
    });
    BTN_NEXT.addEventListener('click', () => {
      if (pageNum == 1) { 
        if (BTN_START.classList.contains('no-active')) BTN_START.classList.remove('no-active');
        if (BTN_PREV.classList.contains('no-active')) BTN_PREV.classList.remove('no-active');
      } 
      indexStartRender = pageNum * cardsOnPage;
      pageNum++; 
      page.innerText = `${pageNum}`;
      if (pageNum == Math.ceil(array.length / cardsOnPage)) { 
        BTN_END.classList.toggle('no-active');
        BTN_NEXT.classList.toggle('no-active');
      } 
      createPageWithFilters(indexStartRender);
    });
    BTN_PREV.addEventListener('click', () =>{
      if (pageNum == Math.ceil(array.length / cardsOnPage)) { 
        BTN_END.classList.remove('no-active');
        BTN_NEXT.classList.remove('no-active');
      } 
      pageNum--;
      indexStartRender = (pageNum * cardsOnPage) - cardsOnPage; 
      page.innerText = `${pageNum}`;
      if (pageNum == 1) { 
        if (!BTN_START.classList.contains('no-active')) BTN_START.classList.add('no-active');
        if (!BTN_PREV.classList.contains('no-active')) BTN_PREV.classList.add('no-active');
      } 
      createPageWithFilters(indexStartRender);
    });
  } else {
    if (!BTN_END.classList.contains('no-active')) BTN_END.classList.add('no-active');
    if (!BTN_NEXT.classList.contains('no-active')) BTN_NEXT.classList.add('no-active');
  } 
  if (array.length === 0) {
    requestsCards.innerHTML = 'Таких заявок у нас к сожалению нет...';
    page.classList.add('no-active');
  }
}