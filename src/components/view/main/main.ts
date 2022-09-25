import back from '../../assets/img/back.png';
import { getParticipantsInThanks } from '../../controller/dataHandlers/userFilters';
import { Thanks } from '../../model/type/type';
import { allUsers } from '../../model/api/users';
import { allThanks } from '../../model/api/thanks';
import { getAllThanksWithDescription } from '../../controller/dataHandlers/thanksFilters';
import { UserVisualData } from '../../model/type/User';

export default class Main {
  wrapper: HTMLElement;

  constructor() {
    this.wrapper = document.createElement('main');
  }

  getWelcomeSection(): string {
    return `
    <section class="welcome-section">
      <div class="welcome-section__frame1"></div>
      <div class="welcome-section__frame2"></div>
      <div class="container">
        <h1 class="welcome-section__title">Мы уверены - доброта <br> скрывается внутри каждого из нас</h1>
        <p class="welcome-section__text">
          Оказывается так просто отыскать и подарить её тому, <br> кто в ней нуждается.
        </p>
      </div>
    </section>`;
  }

  getRequestSection(): string {
    return `
    <section class="requests-section main-request-section" id="requests">
      <div class="container">
        <div class="slider">
          <button class="btn slider__btn slider-prev prev">←</button>
          <div class="slider__wrapper">
            <div class="slider__items">
              <div class="slider__item-left"></div>
              <div class="slider__item-active"></div>
              <div class="slider__item-right"></div>
            </div>
          </div> 
          <button class="btn slider__btn slider-next next">→</button>
        </div>
        <p>... успей им помочь</p>
        <div class="slider__frame3"></div>
      </div>
    <section>`;
  }

  renderThanksCard(item: Thanks): string {
    const participants = getParticipantsInThanks(allUsers, item);
    const user = allUsers.find(u => u.id === item.userId);
    return `
    <div class="card thanks-card">
      <div class="card__header thanks-card__header">              
        <div class="card__avatar thanks-card-to__avatar">
          ${participants.reduce( (sum, p)=> sum += `<img src=${p.avatar} alt="Avatar" 
          class="avatar avatar_participant"><span class='username'>${p.name}</span>`, '')}
        </div>
        <p><span class="card__name thanks-card-to__name"></span>спасибо за</p>
      </div>
      <div class="card__title thanks-card__title">${item.description}</div>
      <div class="card__footer thanks-card__footer">
        <div class="thanks-card-from__name">${user?.name}</div>
        <div class="thanks-card-from__avatar">
          <img src=${user?.avatar} alt="Avatar" class='avatar'>
        </div>
      </div>        
    </div>`;
  }

  getThanksSection(arr: Thanks[]): string {
    return `
    <section class="thanks-section" id="thanks">
      <h2 class="thanks-section__title">Копилка добрых дел </h2>
      <button class="btn thanks-section__btn">Лучшие вoлoнтеры</button>
      <div class="thanks-section__cards">
        ${arr.map(item =>
    this.renderThanksCard(item)).join('')}      
      </div>        
      <div class="thanks-section__frame4"></div>        
      </section>
    `;
  }

  getUserThanksSection(arr: Thanks[]): string {
    return `
    <section class="thanks-section" id="thanks">
      <h2 class="thanks-section__title">Копилка добрых дел </h2>
      <div class="thanks-section__cards">
        ${arr.map(item =>
    this.renderThanksCard(item)).join('')}      
      </div>        
      </section>
    `;
  }

  getInfoSection(): string {
    return ` 
    <section class="info-section" id="info">
      <h2 class="info-section__title">Все просто:</h2>
      <ol class="info-list">
        <li class="info-list__item">
          1. Пройди регистрацию <span class="info-list__item-span" id="registerSpan">ТУТ</span>
        </li>
        <li class="info-list__item">
          2. Если твое сердце открыто для помощи - 
          нажимай <span class="info-list__item-span" id="helpSpan">"Помочь"</span>
          <br> И мы мгновенно доставим письмо-предложение о помощи получателю.
        </li>
        <li class="info-list__item">
          3. Если тебе самому нужна помощь - 
          жми <span class="info-list__item-span" id="requestSpan">"Новая заявка"</span>
        </li>
        <li class="info-list__item" style="font-size: 16px;">
          ВАЖНО! вся помощь оказывается на безвозмездной основе
        </li>
      </ol>
      <div class="info-section__frame5"></div>
    </section>`;
  }

  getWrapper(): string {
    return `
      <div class="user-section__wrapper">
        <div class="user-section__wrapper__frame8"></div>
        <div class="side-menu">
          <span class="side-menu__span">Показать фильтры</span>
        </div>
        ${this.getUserFiltersSection()}
        ${this.getUsersRequestsSection()}
      </div>
    `;
  }

  getUserWrapper(): string {
    return `
      <div class="user-section-main__wrapper">        
        ${this.getUserMenuSection()}
        ${this.getUsersMain()}        
      </div>
    `;
  }

  getUserFiltersSection(): string {
    return ` 
    <section class="filters-section">
      <a href="user.html">
        <button class="btn filters-section__btn-back color-btn">
          <img src=${back} alt="back">
        </button>
      </a> 
        <div class="filters-section__filters">
          <div class="filters-section__format">
            <h5 class="filters-section__title format__title">Выбрать формат</h5>
            <div class="filters-section__body">
              <button class="filters-section__btn offline">Офлайн</button>
              <button class="filters-section__btn online">Онлайн</button>
            </div>
          </div>
          <div class="filters-section__country">
            <h5 class="filters-section__title country__title">Выбрать страну</h5>
            <div class="filters-section__body">
              <button class="filters-section__btn belarus">Беларусь</button>
              <button class="filters-section__btn russia">Россия</button>
              <button class="filters-section__btn ukraine">Украина</button>
            </div>
          </div>
          <div class="filters-section__category">
            <h5 class="filters-section__title category__title">Выбрать категорию</h5>
            <div class="filters-section__body">
              <button class="filters-section__btn healthcare">Здравоохранение</button>
              <button class="filters-section__btn emergency">ЧС</button>
              <button class="filters-section__btn veterans">Пенсионеры</button>
              <button class="filters-section__btn сhildren">Дети</button>
              <button class="filters-section__btn invalid">Люди с ОВС</button>
              <button class="filters-section__btn science">Наука</button>
              <button class="filters-section__btn animal">Животные</button>
              <button class="filters-section__btn nature">Природа</button>
              <button class="filters-section__btn education">Образование</button>
              <button class="filters-section__btn other">Другое</button>
            </div>
          </div>
        </div>

    </section>`;
  }

  getUserMenuSection(): string {
    return ` 
    <section class="menu-section">
      <div class="menu-section__filters">
        <div class="menu-section__country">
          <div class="menu-section__body">
            <button class="menu-section__btn buttons-section__btn-requests">Все заявки</button>
            <button class="menu-section__btn my-requests-btn">Мои заявки</button>
            <button class="menu-section__btn my-thanks-btn">Благодарности</button>
            <button class="menu-section__btn my-participates-btn">Мои отклики</button>
            <button class="menu-section__btn thanks-section-btn">Рейтинг</button>
          </div>
        </div>
      </div>
    </section>`;
  }

  getUsersRequestsSection(): string {
    return `
    <section class="container requests-section"> 
      <div class="requests-section__cards">

      </div>  
    </section>`;
  }

  getUsersMain(): string {
    return `
    <section class="container users-main-section"> 
      <div class="users-main-section__content">
        <h5 class="users-main-section__title">Один-единственный добрый поступок 
        <br>пускает корни во все стороны, 
        <br>и из этих корней вырастают 
        <br>новые деревья!</h5>
      </div> 
      <div class="users-main-section__frame9"></div>
      <div class="users-main-section__frame10"></div> 
    </section>`;
  }

  getMyRequests(): string {
    return `
    <div class="my-requests">
      <h5 class="my-requests__title">Мои заявки:</h5>
      <button class="btn my-requests__btn buttons-section__btn-apply">+</button>
    </div>
    <div class="card-requests"></div>    
    `;
  }

  getMyParticipates(): string {
    return `
    <div class="my-requests">
      <h5 class="my-requests__title">Мои отклики - предложения о помощи:</h5>      
    </div>
    <div class="card-requests"></div>    
    `;
  }

  renderRatingTable(num: number, ava: string, name: string, score: number): string {
    return `
    <div class="user-rating__main">
     
        <div class="user-rating__name-body">
          <div>${num}</div>
          <div class="user-rating__main-ava">
            <img class="avatar" src="${ava}" alt="Avatar">
          </div>
          <span class="user-rating__name-name">${name}</span>
        </div>
        <div class="user-rating__score">      
          <span class="user-rating__score-score">${score}</span>
        </div>
      </div> 
    `;
  }

  getRating(arr: UserVisualData[]): string {
    return `
    <div class="user-rating">  
      <div class="user-rating__content">
        <div class="user-rating__table">
          <h6 class="user-rating__name-subtitle">№</h6>
          <h6 class="user-rating__score-subtitle">Добрые<br>дела</h6>
        </div>
        <div class="user-rating__body">
  ${arr.map((item, index) => {
    return this.renderRatingTable(index + 1, item.avatar, item.name, item.goodThings);
  }).join('')}
        </div>
      </div>     
    </div>
    <div class="user-rating__frame11"></div>
    `;
  }

  getUserPaginationBtnsSection(): string {
    return `
    <section class="pagination-btns-section">
      <div class="pagintaion-btns-section__navigation">
        <button class="btn pagination-btns-section__btn start-page no-active">&lt; &lt;</button>
        <button class="btn pagination-btns-section__btn prev no-active">&lt;</button>
        <button class="btn pagination-btns-section__btn page">1</button>
        <button class="btn pagination-btns-section__btn next">></button>
        <button class="btn pagination-btns-section__btn end-page">> ></button>
      </div>
    </section>`;
  }

  render(page = 'main'): HTMLElement {
    switch (page) {
      case ('main'): {
        this.wrapper.innerHTML += this.getWelcomeSection();
        this.wrapper.innerHTML += this.getRequestSection();
        this.wrapper.innerHTML += this.getThanksSection(getAllThanksWithDescription(allThanks));
        this.wrapper.innerHTML += this.getInfoSection();
        break;
      }
      case ('user'): {
        this.wrapper.innerHTML += this.getUserWrapper();             
        break;        
      }
    }    
    return this.wrapper;    
  }
}