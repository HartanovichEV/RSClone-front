import { RegisterElements } from '../../model/interfaces/RegisterElements';
import { User } from '../../model/interfaces/User';
import { registerRequest, registerValidation } from '../../model/api/registration';
import getRequestFormData from '../dataHandlers/getRequestFormData';
import { AuthorizeElements } from '../../model/interfaces/AuthorizeElements';
import { UserAuth } from '../../model/interfaces/UserAuth';
import { authorizeRequest, logout } from '../../model/api/authorization';
import { pagination } from '../../utils/pagination';
import getArrayWithAllFilters from '../../utils/createPageWithFilters';
import Main from '../../view/main/main';
import getFilter from '../../utils/filters';
import Modal from '../../view/modal/modal';
import { rating } from '../../model/fakeDatabase/rating';
import { Rating } from '../../model/type/type';
import { nextPrev, showTab } from '../../utils/form';

function userPageRequests(): void {
  const main = document.querySelector('main') as HTMLElement;
  const newMain: Main = new Main();
  main.innerHTML = '';
  main.innerHTML += newMain.getWrapper();
  main.innerHTML += newMain.getUserPaginationBtnsSection();
  const arrayWithAllFilters = getArrayWithAllFilters();
  pagination(arrayWithAllFilters);
  const filtersBtns: NodeListOf<Element> = document.querySelectorAll('.filters-section__btn');
  [...filtersBtns].map(item => item.addEventListener('click', getFilter));
}

export function showMessageEmail(): void {
  const requestModal = document.querySelector('.modal-message-email') as HTMLElement;

  document.body.classList.add('modal--open');
  requestModal.classList.remove('modal--hidden');
  requestModal.classList.add('modal--active');
}

function showRegister(event: Event): void {
  const registerModal = document.querySelector('.modal-register') as HTMLElement;
  const loginrModal = document.querySelector('.modal-login') as HTMLElement;
  event.preventDefault();

  registerModal.classList.remove('modal--hidden');
  registerModal.classList.add('modal--active');

  loginrModal.classList.add('modal--hidden');
  loginrModal.classList.remove('modal--active');

  document.body.classList.add('modal--open');
}

export function showLogin(event: Event): void {
  const loginrModal = document.querySelector('.modal-login') as HTMLElement;
  const registerModal = document.querySelector('.modal-register') as HTMLElement;
  event.preventDefault();

  loginrModal.classList.remove('modal--hidden');
  loginrModal.classList.add('modal--active');

  registerModal.classList.add('modal--hidden');
  registerModal.classList.remove('modal--active');

  document.body.classList.add('modal--open');
}

function showRequest(): void {
  const requestModal = document.querySelector('.modal-request') as HTMLElement;

  document.body.classList.add('modal--open');
  requestModal.classList.remove('modal--hidden');
  requestModal.classList.add('modal--active');
}

function showCloseRequest(): void {
  const requestModal = document.querySelector('.modal-close-request') as HTMLElement;
  document.body.classList.add('modal--open');
  requestModal.classList.remove('modal--hidden');
  requestModal.classList.add('modal--active');
  const btnYes = document.querySelector('.get-help-yes') as HTMLElement;
  function showCloseRequestBtns() {
    const requestModalHelp = document.querySelector('.modal-close-request-with-help') as HTMLElement;
    document.body.classList.add('modal--open');
    requestModalHelp.classList.remove('modal--hidden');
    requestModalHelp.classList.add('modal--active');
  }
  btnYes.addEventListener('click', showCloseRequestBtns);
}

function showRating(): void {
  const ratingModal = document.querySelector('.modal-rating') as HTMLElement;

  ratingModal.classList.remove('modal--hidden');
  ratingModal.classList.add('modal--active');

  document.body.classList.add('modal--open');
}

function hideModal(): void {
  const registerModal: NodeListOf<Element> = document.querySelectorAll('.modal');

  [...registerModal].map(item => {
    item.classList.remove('modal--active');
    item.classList.add('modal--hidden');
    document.body.classList.remove('modal--open');
  });
}

function enableInputs(): void {
  const locationCategory = document.getElementById('location') as HTMLSelectElement;
  const address = document.getElementById('address') as HTMLInputElement;

  locationCategory.removeAttribute('disabled');
  address.removeAttribute('disabled');
}

function disableInputs(): void {
  const locationCategory = document.getElementById('location') as HTMLSelectElement;
  const address = document.getElementById('address') as HTMLInputElement;

  locationCategory.disabled = true;
  address.disabled = true;
}

export function openRegisterWindowListener(): void {
  const registerBtn = document.getElementById('register') as HTMLButtonElement;
  const registerSpan = document.getElementById('registerSpan') as HTMLSpanElement;
  const regBtn = document.querySelector('.login__btn-to-register') as HTMLButtonElement;

  registerBtn.addEventListener('click', showRegister);
  registerSpan.addEventListener('click', showRegister);
  regBtn.addEventListener('click', showRegister);
}

export function closeModalWindowListener(): void {
  const modalClose: NodeListOf<Element> = document.querySelectorAll('.modal__close');

  [...modalClose].map(item => item.addEventListener('click', hideModal));
}

export function openLoginWindowListener(): void {
  const loginBtns: NodeListOf<Element> = document.querySelectorAll('.card__login-btn');
  const loginBtn = document.getElementById('login') as HTMLButtonElement;
  const helpBtn = document.getElementById('helpSpan') as HTMLButtonElement;
  const requestBtn = document.getElementById('requestSpan') as HTMLButtonElement;
  const registerBtn = document.querySelector('.register__btn-to-login') as HTMLButtonElement;

  [...loginBtns].map(btn => btn.addEventListener('click', showLogin));
  helpBtn.addEventListener('click', showLogin);
  requestBtn.addEventListener('click', showLogin);
  loginBtn.addEventListener('click', showLogin);
  registerBtn.addEventListener('click', showLogin);
}


export function radioBtnListener(): void {
  const radioOfflineBtn = document.getElementById('offline') as HTMLInputElement;
  const radioOnlineBtn = document.getElementById('online') as HTMLInputElement;

  radioOfflineBtn.addEventListener('click', enableInputs);
  radioOnlineBtn.addEventListener('click', disableInputs);
}

export function registerSubmitListener() {
  const form = document.querySelector('.modal-register__form') as HTMLFormElement;
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const elements = form.elements as RegisterElements;
    const user: User = {
      login: elements.login.value,
      pwd: elements.pwd.value,
      name: elements.name.value,
      email: elements.email.value,
    };
    const dataValidated = registerValidation(user);
    if (dataValidated.err) return alert(dataValidated.message);
    registerRequest(user);
  });
}

export function authSubmitListener() {
  const form = document.querySelector('.modal-login__form') as HTMLFormElement;
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const elements = form.elements as AuthorizeElements;
    const user: UserAuth = {
      login: elements.login.value,
      pwd: elements.pwd.value,
    };
    authorizeRequest(user);
  });
}

export function createRequestListener(): void {
  const requestForm = document.getElementById('regForm') as HTMLFormElement;
  requestForm.addEventListener('submit', getRequestFormData);
}
export function renderUserPageRequests(): void {
  const requestsBtn = document.querySelector('.buttons-section__btn-requests') as HTMLButtonElement;
  requestsBtn.addEventListener('click', userPageRequests);
  console.log('show');
  showTab(0);
  const prevBtn = document.getElementById('prevBtn') as HTMLElement;
  const nextBtn = document.getElementById('nextBtn') as HTMLElement;
  prevBtn.addEventListener('click', function () { nextPrev(-1); });
  nextBtn.addEventListener('click', function () { nextPrev(1); });
}

export function openUserRequestListener(): void {
  const openRequestBtn = document.querySelector('.buttons-section__btn-apply') as HTMLButtonElement;

  openRequestBtn.addEventListener('click', showRequest);
}

export function globalCloseModal(): void {
  let isOverlay = false;

  document.addEventListener('mousedown', (event: Event) => {
    if (!(event.target as Element).closest('.modal__content') && !(event.target as Element).closest('.btn')) {
      isOverlay = true;
    }
  });

  document.addEventListener('mousedown', (event: Event) => {
    if (!(event.target as Element).closest('.modal__content') && !(event.target as Element).closest('.btn')
      && isOverlay) {
      hideModal();
    }
  });
}
export function openUserCloseRequestListener(): void {
  const openRequestBtn: NodeListOf<Element> = document.querySelectorAll('.my-requests__close');
  [...openRequestBtn].map(item => item.addEventListener('click', showCloseRequest));
}

export function openRatingWindow(): void {
  const ratingbtn = document.querySelector('.thanks-section__btn') as HTMLButtonElement;

  ratingbtn.addEventListener('click', showRating);
}

export function sortRating(): void {
  const sortBtn = document.querySelector('.modal-rating__score-subtitle') as HTMLElement;
  const modal: Modal = new Modal();

  sortBtn.addEventListener('click', () => {
    const ratingContent = document.querySelector('.modal-rating') as HTMLElement;
    const sortBy = sessionStorage.getItem('sortBy') as string;
    
    if (sortBy === 'desc') {
      const arr: Rating = rating.sort((a, b) => b.score - a.score);
      ratingContent.innerHTML = '';
      ratingContent.innerHTML = modal.getSortedRating(arr);
      sessionStorage.setItem('sortBy', 'asc');    
    } else {
      const arr: Rating = rating.sort((a, b) => a.score - b.score);
      ratingContent.innerHTML = '';
      ratingContent.innerHTML = modal.getSortedRating(arr);
      sessionStorage.setItem('sortBy', 'desc');
    }
    
    closeModalWindowListener();
    sortRating();
  });
}

export function logoutListener(): void {
  const logoutBtn =  document.querySelector('.logout');
  logoutBtn?.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
}

export function addListeners(): void {
  openRegisterWindowListener();
  openLoginWindowListener();
  openRatingWindow();
  createRequestListener();
  closeModalWindowListener();
  registerSubmitListener();
  authSubmitListener();
  radioBtnListener();
  globalCloseModal();
  sortRating();
}

export function addUserListeners(): void {
  renderUserPageRequests();
  openUserRequestListener();
  closeModalWindowListener();
  globalCloseModal();
  openUserCloseRequestListener();
  logoutListener();
}
