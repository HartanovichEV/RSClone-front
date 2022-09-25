import logo from '../../assets/img/Logo.png';
import logoUser from '../../assets/img/logoUser.png';
import handshake from '../../assets/icons/handshake.png';
import thanks from '../../assets/icons/thank-you.png';
import question from '../../assets/icons/question.png';
import { getAuthUserData } from '../../model/api/users';

export default class Header {
  wrapper: HTMLElement;

  constructor() {
    this.wrapper = document.createElement('header');
  }

  getHeader(): string {
    return `
    <div class="container">
      <div class="header__wrapper">
        <div class="header__logo">
          <a href="#"><img class="header__logo-img" src=${logo} alt="Logo"></a>
        </div>
        <nav class="header__nav">
          <a class="header__nav-mobile-links" href="#requests">
            <img class="header__nav-img" src=${handshake} alt="Help"></img>
          </a>
          <a class="header__nav-mobile-links" href="#thanks">
            <img class="header__nav-img" src=${thanks} alt="Gratitude"></img>
          </a>
          <a class="header__nav-mobile-links" href="#info">
            <img class="header__nav-img" src=${question} alt="Question"></img>
          </a>
          <ul class="header__nav-list header-main__nav-list">
            <li class="header__nav-item">
              <a href="#requests">Успей помочь</a>
            </li>
            <li class="header__nav-item">
              <a href="#thanks">Копилка добрых дел</a>
            </li>
            <li class="header__nav-item">
              <a href="#info">Как это работает?</a>
            </li>
          </ul>
        </nav>
        <div class="header__btns">
          <button class="btn header__login-btn color-btn" id="login">Вход</button>
          <button class="btn header__register-btn" id="register">Регистрация</button>
        </div>
      </div>
    </div>`;
  }

  getUserHeader(): string {
    const user = getAuthUserData();
    if (!user) return '</h1>you are not authorized</>';
    return `
    <div class="container">
      <div class="header__wrapper">
        <div class="users-rating">${user.goodThings}</div>
        <div class="header__logo">
          <a href="#"><img class="header__logoUser-img" src=${logoUser} alt="Logo"></a>
        </div>
        <nav class="header__nav">
          <ul class="header__nav-list">
            <li class="header__nav-item">Здравствуйте, ${user.name}!</li>
            <li class="header__nav-item header__avatar">
              <img class="header__avatar" src=${user.avatar} alt="Avatar">
              <ul class="header__submenu">
                <li class="header__submenu-item submenu-profile"><a href="">Редактировать</a></li>
                <li class="header__submenu-item header__logout">
                  <a class='logout' href="">Выйти</a>          
                </li>
              </ul>
            </li>
          </ul>
        </nav>          
      </div>
    </div>`;
  }

  render(page = 'main'): HTMLElement {
    switch (page) {
      case ('main'): {
        this.wrapper.innerHTML = this.getHeader();
        break;
      }
      case ('user'): {
        this.wrapper.innerHTML = this.getUserHeader();
        break;
      }
    }
    this.wrapper.classList.add('header');
    return this.wrapper;
  }
}