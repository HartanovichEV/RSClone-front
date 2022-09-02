import vladimirAva from '../../assets/img/Владимир.png'; 
import elenaAva from '../../assets/img/Елена.png'; 
import svetlanaAva from '../../assets/img/Светлана.png'; 
import { Category, Format, Country } from '../../model/type/type';
import { Rating } from '../../model/type/type';

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
                  class="modal__form modal-register__form">
                  <input type="email" name="email" class="modal__input register__email"
                    placeholder="Введите ваш email" required>
                  <input type="text" name="login" class="modal__input register__username" 
                  placeholder="Выберите ваш логин" required>
                  <input type="text" name="name" class="modal__input register__name" 
                  placeholder="Введите ваше имя" required>
                  <input type="password" name="pwd" class="modal__input register__password"
                    placeholder="Введите Пароль" minlength="6" required>
                  <div class="modal-register__btns">
                    <button class="btn modal__btn register__btn color-btn" type="submit">Зарегистрироваться</button>
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
                    <button class="btn modal__btn login__btn-to-register">Зарегистрироваться</button>
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
          <span class="modal__close modal-request__close"></span>
          <div style="text-align:center; margin:20px;">
            <span class="step"></span>
            <span class="step"></span>
            <span class="step"></span>
          </div>
          <span class="modal__close modal-request__close">&times;</span>

        </div>
        <form id="regForm" action="">        
        <h1>Создание заявки на волонтерскую помощь</h1>
        <div class="tab">Выберите категорию и формат проведения:
        <div class="__select" data-state="">
          <div class="__select__title"></div>
          <div class="__select__content">
            <input id="singleSelect0" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect0" tabindex="0" class="__select__label" data-value="${Category.healthcare}"></label>
            <input id="singleSelect1" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect1" tabindex="0" class="__select__label" data-value="${Category.emergency}"></label>
            <input id="singleSelect2" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect2" tabindex="0" class="__select__label" data-value="${Category.veterans}"></label>
            <input id="singleSelect3" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect3" tabindex="0" class="__select__label" data-value="${Category.invalid}"></label>
            <input id="singleSelect4" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect4" tabindex="0" class="__select__label" data-value="${Category.children}"></label>
            <input id="singleSelect5" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect5" tabindex="0" class="__select__label" data-value="${Category.animal}"></label>
            <input id="singleSelect6" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect6" tabindex="0" class="__select__label" data-value="${Category.nature}"></label>
            <input id="singleSelect7" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect7" tabindex="0" class="__select__label" data-value="${Category.science}"></label>
            <input id="singleSelect8" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect8" tabindex="0" class="__select__label" data-value="${Category.education}"></label>
            <input id="singleSelect9" class="__select__input" type="radio" name="singleSelect" />
            <label for="singleSelect9" tabindex="0" class="__select__label" data-value="${Category.other}"></label>
          </div>
        </div>

        <div class="request-radio">
            <h4 class="request-radio__title">Формат проведения:</h4>
            <div class="request-radio__inputs">   
              <label class="request-radio__inputs-label" for="online">
                <input class="request-radio__inputs-input" type="radio" name="format" id="online" value="онлайн">
                <span class="request-radio__inputs-custom"></span>
                <span class="request-radio__inputs-span">${Format.online}</span>
              </label>        
              <label class="request-radio__inputs-label" for="offline">
                <input class="request-radio__inputs-input" type="radio" name="format" id="offline" value="офлайн">
                <span class="request-radio__inputs-custom"></span>
                <span class="request-radio__inputs-span">${Format.ofline}</span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="tab">Локация и дата оказания помощи:
          <div class="request-location">
          <div class="request-radio__inputs">
            <label class="request-radio__inputs-label" for="online">
              <input class="request-radio__inputs-input" type="radio" 
              name="format" id="belarus" value="${Country.belarus}">
              <span class="request-radio__inputs-custom"></span>
              <span class="request-radio__inputs-span">${Country.belarus}</span>
            </label>        
            <label class="request-radio__inputs-label" for="offline">
              <input class="request-radio__inputs-input" type="radio" 
              name="format" id="russia" value="${Country.russia}">
              <span class="request-radio__inputs-custom"></span>
              <span class="request-radio__inputs-span">${Country.russia}</span>
            </label>
            <label class="request-radio__inputs-label" for="offline">
              <input class="request-radio__inputs-input" type="radio" 
              name="format" id="ukraine" value="${Country.ukraine}">
              <span class="request-radio__inputs-custom"></span>
              <span class="request-radio__inputs-span">${Country.ukraine}</span>
            </label>
            </div>
            <input class="request-location__select-input" name="address"
              type="text" placeholder="Адрес" autocomplete="off" id="address">
            <input class="request-location__select-input" name="time"
              type="text" placeholder="Дата и время" autocomplete="off" id="time">
          </div>          
        </div>
        
        <div class="tab">Опишите суть проблемы и необходимую помощь:
          <div class="request-textarea">            
            <textarea name="textarea" cols="80" rows="10" class="request-textarea__textarea" id="textarea"></textarea>
          </div>
        </div>      
          <div class="nextprev__btns">
            <button class="btn" type="button" id="prevBtn">Назад</button>
            <button class="btn color-btn" type="button" id="nextBtn">Следующий</button>
          </div>
        </form>
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
    return `<div class="modal modal-close-request-with-help modal--hidden">
              <div class="modal__content modal-login__content">
                <div class="modal__header modal-login__header"> 
                  <span class="modal__close modal-login__close"></span>
                  <span class="modal__close modal-login__close">&times;</span>
                </div> 
                <span class="modal__title modal-login__title">Выберите волонтера:</span>
                <div class="choose-volunteers">
                  <img src=${vladimirAva} alt="Avatar">
                  Владимир
                </div>
                <div class="choose-volunteers"> 
                  <img src=${elenaAva} alt="Avatar">
                  Елена
                </div>
                <div class="choose-volunteers">
                  <img src=${svetlanaAva} alt="Avatar">
                  Светлана
                </div>
                <div class="modal__btns">                  
                  <button class="btn modal__btn login__btn give-thanks">Оставить благодарность</button>
                </div>
              </div>
            </div>`;
  }

  getMessageEmail(): string {
    return `<div class="modal modal-message-email modal--hidden">
              <div class="modal__content modal-login__content">
                <div class="modal__header modal-login__header message-email">                  
                  <span class="modal__title"></span>
                  <span class="modal__close modal-login__close">&times;</span> 
                </div>
              <div class="modal__header modal-login__header" style="color: #793CFB;">                
                <span class="modal__title">Письмо с предложением <br> 
                помощи отправлено!</span>
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

  getRating(arr: Rating): string {
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
          ${arr.map(item => this.renderRatingTable(item.ava, item.name, item.score)).join('')}
        </div>
      </div>
    </div>
    `;
  }

  getSortedRating(arr: Rating): string {
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
          ${arr.map(item => this.renderRatingTable(item.ava, item.name, item.score)).join('')}
        </div>
      </div>
    `;
  }

  render(arr: Rating): HTMLDivElement {
    this.wrapper.innerHTML += this.getRegister();
    this.wrapper.innerHTML += this.getLogin();
    this.wrapper.innerHTML += this.getRequest();
    this.wrapper.innerHTML += this.getCloseRequest();
    this.wrapper.innerHTML += this.getMessageEmail();
    this.wrapper.innerHTML += this.getCloseRequestWithHelp();
    this.wrapper.innerHTML += this.getRating(arr);
    this.wrapper.classList.add('modal-wrapper');
    return this.wrapper;
  }
}