import { RegisterElements } from '../../model/interfaces/RegisterElements';
import { User, UserAuth } from '../../model/type/User';
import { registerRequest, registerValidation } from '../../model/api/registration';
import getRequestFormData from '../dataHandlers/getRequestFormData';
import { AuthorizeElements } from '../../model/interfaces/AuthorizeElements';
import { authorizeRequest, logout } from '../../model/api/authorization';
import { pagination } from '../../utils/pagination';
import Main from '../../view/main/main';
import getFilter from '../../utils/filters';
import Modal from '../../view/modal/modal';
import { Apply, Thanks, ThanksCollection } from '../../model/type/type';
import { showFiltersMenu, innerTextClosed, hideFiltersMenu } from '../../utils/filtersMenuToggle';
import { closeApply, createApply, getApply, removeParticipation } from '../../model/api/applies';
import getPageMyRequests from '../../utils/renderMyRequestCard';
import getPageMyParticipates from '../../utils/renderMyParticipateCard';
import { allApplies, getMyCreatedApplies, getOpenApplies, 
  getNotMyApplies, getMyParticipateApplies, getNotMyParticipateApplies } from '../dataHandlers/applyFilters';
import {  getParticipantsInApply, getUsersRating  } from '../dataHandlers/userFilters';
import { allUsers } from '../../model/api/users';
import { allThanks, createThanks } from '../../model/api/thanks';
import { showMessage } from '../../utils/showMessage';
import { getAllThanksWithDescription } from '../dataHandlers/thanksFilters';
import { nextPrev, showTab } from '../../utils/form';

const openApplies =  getOpenApplies(allApplies);
const myApplies =  getMyCreatedApplies(openApplies);
const myParticipates =  getMyParticipateApplies(openApplies);
const NotMyApplies = getNotMyApplies(openApplies);
const appliesForPagination = getNotMyParticipateApplies(NotMyApplies);

const sortedUsers = getUsersRating(allUsers);


function hideModal(): void {
  const registerModal: NodeListOf<Element> = document.querySelectorAll('.modal');

  [...registerModal].map(item => {
    item.classList.remove('modal--active');
    item.classList.add('modal--hidden');
    document.body.classList.remove('modal--open');
  });
}

export function sideMenuListener(): void {
  const sideMenu = document.querySelector('.side-menu') as HTMLElement;
  let isOverlay = false;

  sideMenu.onclick = (): void => {
    if ((sideMenu.querySelector('.side-menu__span') as HTMLElement).innerText === innerTextClosed) {
      showFiltersMenu();
    } else hideFiltersMenu();
  };

  document.onmousedown = (event: Event): void => {
    if (!(event.target as HTMLElement).closest('.filters-section__filters') && 
    !(event.target as HTMLElement).closest('.side-menu')) {
      isOverlay = true;
    }
  };

  document.onmouseup = (event: Event): void => {
    if (!(event.target as HTMLElement).closest('.filters-section__filters') && 
    !(event.target as HTMLElement).closest('.side-menu') && isOverlay) {
      isOverlay = false;
      hideFiltersMenu();
    }
  };
}

function userPageRequests(): void {
  const main = document.querySelector('main') as HTMLElement;
  const newMain: Main = new Main();
  main.innerHTML = '';
  main.innerHTML += newMain.getWrapper();
  main.innerHTML += newMain.getUserPaginationBtnsSection();
  pagination(appliesForPagination);
  const filtersBtns: NodeListOf<Element> = document.querySelectorAll('.filters-section__btn');
  [...filtersBtns].map(item => item.addEventListener('click', getFilter));

  sideMenuListener();
}

function showRequest(): void {
  const requestModal = document.querySelector('.modal-request') as HTMLElement;

  document.body.classList.add('modal--open');
  requestModal.classList.remove('modal--hidden');
  requestModal.classList.add('modal--active');
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

function showCloseRequest(): void {
  const applyId = (event?.target as HTMLElement).getAttribute('applyId');

  if (applyId)
    localStorage.setItem('applyId', applyId);
  const requestModal = document.querySelector('.modal-close-request') as HTMLElement;
  document.body.classList.add('modal--open');
  requestModal.classList.remove('modal--hidden');
  requestModal.classList.add('modal--active');
  const btnYes = document.querySelector('.get-help-yes') as HTMLElement;
  const btnNo = document.querySelector('.get-help-no') as HTMLElement;
  btnNo.addEventListener('click', () => {
    if (applyId)
      closeApply(+applyId);
    hideModal();

  });
  async function showCloseRequestBtns() {
    hideModal();
    const participantsBlock = document.querySelector('.close-request__checkboxes') as HTMLElement;
    let applyInfo: Apply[];
    if (applyId) {
      applyInfo =  await getApply(+applyId);
      const participants = getParticipantsInApply(allUsers, applyInfo[0]);
      if (participants.length === 0) {
        closeApply(+applyId, 'Мы рады что вам помогли, хоть и не с нашего сайта');
        setTimeout(() => location.reload(), 4000); 
        return;
      }
      participantsBlock.innerHTML = participants.reduce( (sum, part) =>
        sum +=  `<label for="userId${part.id}" class="close-request__label">
      <input type="checkbox" class="close-request__checkbox" value = "${part.id}" id="userId${part.id}">
      <div class="close-request__volunteers">
        <img src=${part.avatar} class="avatar" alt="Avatar">
        ${part.name}
      </div></label>`, '');

    }
    const requestModalHelp = document.querySelector('.close-request') as HTMLElement;
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
  const loginBtns: NodeListOf<Element> = document.querySelectorAll('.my-requests__close_login-btn');
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
    console.log('sub');
    event.preventDefault();
    const elements = form.elements as RegisterElements;
    const user: User = {
      login: elements.login.value,
      pwd: elements.pwd.value,
      name: elements.name.value,
      email: elements.email.value,
      avatar: elements.avatar.files?.[0],
    };
    const result = new FormData(form);
    console.log(result.get('login'));
    const dataValidated = registerValidation(user);
    if (dataValidated.err) return alert(dataValidated.message);
    registerRequest(result);
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

export function giveThanksListener() {
  const thanksForm = document.querySelector('.close-request__form') as HTMLFormElement;
  thanksForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = thanksForm.elements as ThanksCollection;
    const participants: number[] = [];
    const checkboxes = thanksForm.querySelectorAll('input[type=checkbox]:checked') ;
    checkboxes.forEach(cb => participants.push(+(cb as HTMLInputElement).value));
    if (participants.length === 0) 
      return showMessage('Вы должны выбрать тех кто вам помог, или закрыть форму', true);
    const thank: Thanks = {
      description: data.description.value,
      participants: participants,
      applyId: +(localStorage.getItem('applyId') as string),
    };
    createThanks(thank);
  });
}

export function createRequestListener(): void {
  const requestForm = document.getElementById('regForm') as HTMLFormElement;
  requestForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const result = await createApply(getRequestFormData());
    if (!result) hideModal();
    return result;
  });
}
export function renderUserRequest(): void {
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
export function renderUserPageRequests(): void {
  const requestsBtn = document.querySelector('.buttons-section__btn-requests') as HTMLButtonElement;

  requestsBtn.addEventListener('click', userPageRequests);
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
      && isOverlay && !(event.target as Element).closest('.filters-section__filters')) {
      hideModal();
    }
  });
}
export function openUserCloseRequestListener(): void {
  const openRequestBtn: NodeListOf<Element> = document.querySelectorAll('.my-requests__close');
  [...openRequestBtn].map(item => item.addEventListener('click', showCloseRequest));
}

function myPageRequests(): void {
  const usersMainSection = document.querySelector('.users-main-section') as HTMLElement;
  const newMain: Main = new Main();
  usersMainSection.innerHTML = '';
  usersMainSection.innerHTML += newMain.getMyRequests();
  getPageMyRequests(myApplies); 
  const avatars = usersMainSection.querySelectorAll('.avatar_participant');
  [...avatars].map((avatar) => (avatar as HTMLInputElement).addEventListener('click', (event) =>{
    const img = event.target as HTMLImageElement;
    const userId = img.getAttribute('userId');
    if (!userId) return;
    const currentUser = allUsers.find(user => user.id === +userId);
    console.log(currentUser);
    const email = document.querySelector('.modal__user-info') as HTMLElement;
    console.log(email);
    email.innerHTML = `Почта пользователя : ${currentUser?.email}`;
    showMessageEmail();

  }));
  openUserCloseRequestListener();

  const wrapper = document.querySelector('.user-section-main__wrapper') as HTMLElement;
  wrapper.classList.add('my-requests-section-wrapper');
  const openRequestBtn = document.querySelector('.buttons-section__btn-apply') as HTMLButtonElement;
  openRequestBtn.addEventListener('click', showRequest);
}
export function renderMyRequests(): void {
  const myRequestsBtn = document.querySelector('.my-requests-btn') as HTMLButtonElement;  
  myRequestsBtn.addEventListener('click', myPageRequests);
}

function myPageParticipates(): void {
  const usersMainSection = document.querySelector('.users-main-section') as HTMLElement;
  const newMain: Main = new Main();
  usersMainSection.innerHTML = '';
  usersMainSection.innerHTML += newMain.getMyParticipates(); 
  getPageMyParticipates(myParticipates);
  openUserCloseRequestListener();
  const btns = document.querySelectorAll('.my-participate__close');
  [...btns].map(btn => btn.addEventListener('click', (event)=> {
    event.preventDefault();
    const currentBtn = event.target as HTMLButtonElement;
    const applyId = currentBtn.getAttribute('applyId');
    if (!applyId) return showMessage('что-то пошло не так', true);
    removeParticipation(+applyId);
    setTimeout(()=>location.reload(), 2500);
  }));
}
export function renderMyParticipates(): void {
  const myParticipatesBtn = document.querySelector('.my-participates-btn') as HTMLButtonElement;  
  myParticipatesBtn.addEventListener('click', myPageParticipates);
}

function UserRating(): void {
  const usersMainSection = document.querySelector('.users-main-section') as HTMLElement;
  const newMain: Main = new Main();  
  usersMainSection.innerHTML = '';
  usersMainSection.innerHTML += newMain.getRating(sortedUsers);    
  openUserCloseRequestListener();
}
export function renderUserRating(): void {
  const thanksSectionBtn = document.querySelector('.thanks-section-btn') as HTMLButtonElement;  
  thanksSectionBtn.addEventListener('click', UserRating);
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
      const arr = allUsers.sort((a, b) => b.goodThings - a.goodThings);
      ratingContent.innerHTML = '';
      ratingContent.innerHTML = modal.getSortedRating(arr);
      sessionStorage.setItem('sortBy', 'asc');    
    } else {
      const arr = allUsers.sort((a, b) => a.goodThings - b.goodThings);
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

export function openUserProfile(): void {
  const profileBtn = document.querySelector('.submenu-profile') as HTMLElement;
  const profile = document.querySelector('.profile') as HTMLElement;

  profileBtn.onclick = (event: Event): void => {
    event.preventDefault();
    document.body.classList.add('modal--open');
    profile.classList.remove('modal--hidden');
    profile.classList.add('modal--active');
  };
} 

function myThanksPage(): void {
  const usersMainSection = document.querySelector('.users-main-section') as HTMLElement;
  const newMain: Main = new Main();
  usersMainSection.innerHTML = '';
  usersMainSection.innerHTML += newMain.getUserThanksSection(getAllThanksWithDescription(allThanks));
}

export function renderMyThanks(): void {
  const myThanksBtn = document.querySelector('.my-thanks-btn') as HTMLButtonElement;

  myThanksBtn.addEventListener('click', myThanksPage);
}

export function addListeners(): void {
  openRegisterWindowListener();
  openLoginWindowListener();
  openRatingWindow();
  closeModalWindowListener();
  registerSubmitListener();
  authSubmitListener();
  radioBtnListener();
  globalCloseModal();
  //sortRating();
}

export function addUserListeners(): void {
  renderUserPageRequests();
  closeModalWindowListener();
  globalCloseModal();
  renderMyRequests();
  logoutListener();
  createRequestListener();
  openUserProfile();
  renderMyRequests();
  renderMyParticipates();
  renderMyThanks();
  giveThanksListener();
  //sortRating();
  renderUserRating();
  renderUserRequest();
}
