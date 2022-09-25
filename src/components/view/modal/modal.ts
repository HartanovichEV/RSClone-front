import vladimirAva from '../../assets/img/Владимир.png'; 
import elenaAva from '../../assets/img/Елена.png'; 
import svetlanaAva from '../../assets/img/Светлана.png'; 
import { allUsers } from '../../model/api/users';
import { UserVisualData } from '../../model/type/User';
import { getUsersRating } from '../../controller/dataHandlers/userFilters';
import { getAuthUserData } from '../../model/api/users';


const sortedUsers = getUsersRating(allUsers);

export default class Modal {
  wrapper: HTMLDivElement;

  constructor() {
    this.wrapper = document.createElement('div');
  }

  getRegister(): string {
    return `<div class="modal modal-register modal--hidden">  
              <div class="modal__content modal-register__content">
                <div class="modal__header modal-register__header">
                  <span class="modal__title modal-register__title">Регистрация</span>
                  <span class="modal__close modal-register__close">&times;</span>
                </div> 
                <form action="#"
                  class="modal__form modal-register__form" enctype="multipart/form-data">
                  <input type="email" name="email" class="modal__input register__email"
                    placeholder="Введите ваш email" required>
                  <input type="text" name="login" class="modal__input register__username" 
                  placeholder="Выберите ваш логин" required>
                  <input type="text" name="name" class="modal__input register__name" 
                  placeholder="Введите ваше имя" required>
                  <input type="password" name="pwd" class="modal__input register__password"
                    placeholder="Введите Пароль" minlength="6" required>
                  <label for="register__avatar" class="modal__input file-style">Загрузите аватар</label>
                  <input type="file" class = "modal__input" id="register__avatar" name = "avatar">
                  <div class="modal-register__btns">
                    <button class="btn modal__btn register__btn color-btn" type="submit">Регистрация</button>
                    <button class="btn modal__btn register__btn-to-login">Войти</button>
                  </div>
                </form>
              </div>
            </div>`;
  }

  getLogin(): string {
    return `<div class="modal modal-login modal--hidden">
              <div class="modal__content modal-login__content">
                <div class="modal__header modal-login__header">
                  <span class="modal__title modal-login__title">Вход</span>
                  <span class="modal__close modal-login__close">&times;</span>
                </div> 
                <form action="" class="modal__form modal-login__form">

                  <input type="text" name="login" class="modal__input login__email" placeholder="Введите ваш логин">
                  <input type="password" name="pwd" class="modal__input login__password"
                    placeholder="Введите ваш Пароль">
                  <div class="modal__btns">
                    <button class="btn modal__btn login__btn color-btn" type="submit">Войти</button>
                    <button class="btn modal__btn login__btn-to-register">Регистрация</button>
                  </div>
                </form>
              </div>
            </div>`;
  }

  getRequest(): string {
    return `
    <div class="modal modal-request modal--hidden">
      <div class="modal__content modal-request__content">
        <div class="modal__header modal-request__header">
          <span class="modal__title modal-request__title">Заявка</span>
          <span class="modal__close modal-request__close">&times;</span>
        </div>
        <form action="" class="modal__form modal-request__form" id="requestForm">
          <div class="select-category">
            <h4 class="select-category__title">Категория:</h4>
            <div class="select-wrapper">
              <select class="select-category__select select" name="category" id="category">
                <option value="" selected disabled>Выберите категорию</option>
                <option value="healthcare">Здравоохранение</option>
                <option value="emergency">ЧС</option>
                <option value="veterans">Ветераны и историческая память</option>
                <option value="people">Люди с ОВС</option>
                <option value="children">Дети и подростки</option>
                <option value="animals">Животные</option>
                <option value="nature">Природа</option>
                <option value="science">Наука</option>
                <option value="education">Образование</option>
                <option value="else">Другое</option>
              </select>
            </div>
          </div>
          <div class="request-radio">
            <h4 class="request-radio__title">Формат проведения:</h4>
            <div class="request-radio__inputs">   
              <label class="request-radio__inputs-label" for="online">
                <input class="request-radio__inputs-input" type="radio" name="format" id="online" value="online">
                <span class="request-radio__inputs-custom"></span>
                <span class="request-radio__inputs-span">Онлайн</span>
              </label>        
              <label class="request-radio__inputs-label" for="offline">
                <input class="request-radio__inputs-input" type="radio" name="format" id="offline" value="offline">
                <span class="request-radio__inputs-custom"></span>
                <span class="request-radio__inputs-span">Офлайн</span>
              </label>
            </div>
          </div>
          <div class="request-location">
            <h4 class="request-location__title">Локация и дата оказания помощи:</h4>
            <div class="select-wrapper">
              <select class="request-location__select select" name="location" id="location">
                <option value="country" selected disabled>Страна</option>
                <option value="belarus">Республика Беларусь</option>
                <option value="russia">Российская Федерация</option>
                <option value="ukraine">Украина</option>
              </select>
            </div>
            <input class="request-location__select-input select-input" name="address"
              type="text" placeholder="Адрес" autocomplete="off" id="address">
            <input class="request-location__select-input select-input select-input_date-time" name="date"
              type="date" placeholder="Дата" autocomplete="off" id="time">
              <input class="request-location__select-input select-input select-input_date-time" name="time"
              type="time" placeholder="Время" autocomplete="off" id="date">
          </div>
          <div class="request-textarea">
            <h4 class="request-textarea__title">Суть проблемы и необходимая помощь:</h4>
            <textarea name="textarea" cols="80" rows="10" class="request-textarea__textarea" id="textarea"></textarea>
          </div>
          <button class="btn modal__btn modal-request__btn" type="submit" id="createRequest">Создать</button>
        </form>
        <div class="modal__footer">
        <p class="modal__footer-text">
          Поля, отмеченные <span class="modal__footer-span">*</span>, обязательны для заполнения.
        </p>
      </div>
      </div>
    </div>`;   
  }

  getCloseRequest(): string {
    return `<div class="modal modal-close-request modal--hidden">
              <div class="modal__content modal-login__content">
                <div class="modal__header modal-login__header"> 
                  <span class="modal__close modal-login__close"></span>
                  <span class="modal__close modal-login__close">&times;</span>
                </div> 
                <span class="modal__title modal-login__title">Помощь была оказана?</span>
                <div class="modal__btns">
                  <button class="btn modal__btn login__btn get-help-yes">Да</button>
                  <button class="btn modal__btn login__btn get-help-no">Нет</button>
                </div>
              </div>
            </div>`;
  }

  getCloseRequestWithHelp(): string {
    return `
    <div class="modal close-request modal--hidden">
      <div class="modal__content close-request__content">
        <div class="modal__header">
          <span class="modal__title">Выберите волонтеров:</span>
          <span class="modal__close">&times;</span>
        </div>
        <form action="" class="close-request__form">
          <div class="close-request__checkboxes">
            <label for="vlad" class="close-request__label">
              <input type="checkbox" class="close-request__checkbox" id="vlad">
              <div class="close-request__volunteers">
                <img src=${vladimirAva} alt="Avatar">
                Владимир
              </div>
            </label>
            <label for="lena" class="close-request__label">
              <input type="checkbox" class="close-request__checkbox" id="lena">
              <div class="close-request__volunteers">
                <img src=${elenaAva} alt="Avatar">
                Елена
              </div>
            </label>
            <label for="sveta" class="close-request__label">
              <input type="checkbox" class="close-request__checkbox" id="sveta">
              <div class="close-request__volunteers">
                <img src=${svetlanaAva} alt="Avatar">
                Светлана
              </div>
            </label>
          </div>
          <h4 class="close-request__ta-title">Оставьте благодарность:</h4>
          <textarea name="description" class="close-request__textarea" id="crTa"></textarea>
          <button class="btn close-request__form-btn" type="submit">Оставить благодарность</button>
        </form>
      </div>
    </div>`;
  }

  getMessageEmail(email:string): string {
    return `<div class="modal modal-message-email modal--hidden">
              <div class="modal__content modal-login__content">
                <div class="modal__header modal-login__header message-email">                  
                  <span class="modal__title"></span>
                  <span class="modal__close modal-login__close">&times;</span> 
                </div>
              <div class="modal__header modal-login__header" style="color: #793CFB;">                
                <span class="modal__title modal__user-info">Почта пользователя : ${email}</span>
              </div>                                  
              </div>
            </div>`;
  }

  renderRatingTable(ava: string, name: string, score: number): string {
    return `
    <div class="modal__main modal-rating__main">   
        <div class="modal-rating__name-body">
          <div class="modal-rating__main-ava">
            <img src="${ava}" alt="Avatar">
          </div>
          <span class="modal-rating__name-name">${name}</span>
        </div>
        <div class="modal-rating__score">      
          <span class="modal-rating__score-score">${score}</span>
        </div>
      </div> 
    `;
  }

  getRating(arr: UserVisualData[]): string {
    return `
    <div class="modal modal-rating modal--hidden">  
      <div class="modal__content modal-rating__content">
        <div class="modal__header modal-rating__header">
          <span class="modal__title modal-rating__title">Таблица рейтинга волонтёров</span>
          <span class="modal__close modal-rating__close">&times;</span>
        </div> 
        <div class="modal-rating__table">
          <h6 class="modal-rating__name-subtitle">Имя</h6>
          <h6 class="modal-rating__score-subtitle">Дела</h6>
        </div>
        <div class="modal-rating__body">
          ${arr.map(item => this.renderRatingTable(item.avatar, item.name, item.goodThings)).join('')}
        </div>
      </div>
    </div>
    `;
  }

  getSortedRating(arr: UserVisualData[]): string {
    return `
      <div class="modal__content modal-rating__content">
        <div class="modal__header modal-rating__header">
          <span class="modal__title modal-rating__title">Таблица рейтинга волонтёров</span>
          <span class="modal__close modal-rating__close">&times;</span>
        </div> 
        <div class="modal-rating__table">
          <h6 class="modal-rating__name-subtitle">Имя</h6>
          <h6 class="modal-rating__score-subtitle">Дела</h6>
        </div>
        <div class="modal-rating__body">
          ${arr.map(item => this.renderRatingTable(item.avatar, item.name, item.goodThings)).join('')}
        </div>
      </div>
    `;
  }

  getUserProfile(): string {
    const user = getAuthUserData();
    if (!user) return '';

    return `
    <div class="modal profile modal--hidden">
    <div class="modal__content profile__wrapper">
      <div class="modal__header">                  
        <span class="modal__title"></span>
        <span class="modal__close modal-login__close">&times;</span> 
      </div>
      <div class="profile__content">
        <div class="user">
          <h6 class="user__title">Пользователь сайта</h6>
          <div class="user__img">
            <img class="user__ava" src="${user.avatar}" alt="Avatar">
            <label for="change__avatar" class="modal__input file-style user__ava-choose">Загрузите аватар</label>       
          </div>
          <h4 class="user__name">${user.name}</h4>
        </div>
        <div class="user-info">
          <h6 class="user-info__title">История профиля</h6>
          <div class="user-info__content">
            <div class="user-info__subtitles">
              <p class="user-info__subtitle">Логин:</p>
              <p class="user-info__subtitle">Почта:</p>
              <p class="user-info__subtitle">Имя:</p>
            </div>
            <form class="user-info__form" id="changeProfileForm">
              <div class="user-info__inputs">
                <input type="text" class="user-info__input content__login" name="login" placeholder="${user.login}">
                <input type="text" class="user-info__input content__email" name="email" placeholder="${user.email}">
                <input type="text" class="user-info__input content__name" name="name" placeholder="${user.name}">
                <input type="file" class="modal__input" id="change__avatar" name="avatar">
                <button type="submit" class="user-info__submit-input" id="changeProfile" 
                form = "changeProfileForm"></button>
              </div>
            </form>
          </div>
          <label class="btn user-info__submit-btn" for="changeProfile">Сохранить</label>
        </div>
      </div>
    </div>
  </div>`;
  }

  render(): HTMLDivElement {
    this.wrapper.innerHTML += this.getRegister();
    this.wrapper.innerHTML += this.getLogin();
    this.wrapper.innerHTML += this.getRequest();
    this.wrapper.innerHTML += this.getCloseRequestWithHelp();
    this.wrapper.innerHTML += this.getCloseRequest();
    this.wrapper.innerHTML += this.getMessageEmail('');
    this.wrapper.innerHTML += this.getRating(sortedUsers);
    this.wrapper.innerHTML += this.getUserProfile();
    this.wrapper.classList.add('modal-wrapper');
    return this.wrapper;
  }
}