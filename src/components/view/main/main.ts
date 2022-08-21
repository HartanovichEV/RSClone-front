import vladimirAva from '../../assets/img/Владимир.png';
import elenaAva from '../../assets/img/Елена.png';
import svetlanaAva from '../../assets/img/Светлана.png';

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
        <h2 class="welcome-section__title">Мы уверены - доброта <br> скрывается внутри каждого из нас</h2>
        <p>Оказывается так просто отыскать и подарить её тому, <br> кто в ней нуждается.</p>
      </div>
    </section>`;
  }

  getRequestSection() {
    return `
    <section class="requests-section" id="requests">
      <div class="container">
        <div class="slider">
          <button class="btn slider__btn prev">←</button>
          <div class="slider__wrapper">
            <div class="slider__items">
              <div class="slider__item-left"></div>
              <div class="slider__item-active">
                <div class="card">
                  <div class="card__header">
                    <div class="card__name">Владимир</div>
                    <div class="card__avatar">
                      <img src=${vladimirAva} alt="Avatar">
                    </div>
                  </div>
                  <div class="card__title">
                    Прошу, может кто сможет передать продукты в 1 больницу. 
                    Все расходы готов оплатить. Буду очень благодарен.
                  </div>
                  <div class="card__info">
                    <ul>
                      <li><span class="card__span">Категория</span>: другое</li>
                      <li><span class="card__span">Адрес:</span> г.Минск, пр. Независимости, д.64</li>
                    </ul>
                  </div>
                  <div class="card__btn">
                    <button class="btn card__login-btn">Помочь</button>
                  </div>                
                </div>
                <div class="card">
                  <div class="card__header">
                    <div class="card__name">Елена</div>
                    <div class="card__avatar">
                      <img src=${elenaAva} alt="Avatar">
                    </div>
                  </div>
                  <div class="card__title">
                    Ребята, мужчины, каждое воскресенье еду с дачи с полными сумками. 
                    Может кто может помочь их поднести хотябы до метро...
                  </div>
                  <div class="card__info">
                    <ul>
                      <li><span class="card__span">Категория</span>: пожелые люди</li>
                      <li><span class="card__span">Адрес:</span> Ж/д вокзал Минск</li>
                    </ul>
                  </div>
                  <div class="card__btn">
                    <button class="btn card__login-btn">Помочь</button>
                  </div>                
                </div>
                <div class="card">
                  <div class="card__header">
                    <div class="card__name">Светлана</div>
                    <div class="card__avatar">
                      <img src=${svetlanaAva} alt="Avatar">
                    </div>
                  </div>
                  <div class="card__title">
                    Вторые сутки жутко зависает комп, аж бесит...Нужна помощь в переустановке винды.
                  </div>
                  <div class="card__info">
                    <ul>
                      <li><span class="card__span">Категория:</span> наука</li>
                      <li><span class="card__span">Адрес:</span> онлайн</li>
                    </ul>
                  </div>
                  <div class="card__btn">
                    <button class="btn card__login-btn">Помочь</button>
                  </div>                
                </div>
              </div>
              <div class="slider__item-right"></div>
            </div>
          </div> 
          <button class="btn slider__btn next">→</button>
        </div>
        <p>... успей им помочь</p>
        <div class="slider__frame3"></div>
      </div>
    <section>`;
  }

  getThanksSection(): string {
    return `
    <section class="thanks-section" id="thanks">
      <h2 class="thanks-section__title">Копилка добрых дел </h2>
      <button class="btn thanks-section__btn">Лучшие вoлoнтеры</button>
      <div class="thanks-section__cards">
        <div class="card thanks-card">
          <div class="card__header thanks-card__header">              
            <div class="card__avatar thanks-card-to__avatar">
              <img src=${svetlanaAva} alt="Avatar">
            </div>
            <p><span class="card__name thanks-card-to__name">Зоя, </span>спасибо за</p>
          </div>
          <div class="card__title thanks-card__title">Спасибо ребятом из БГУИР общаги за покраску забора. 
          Ваша помощь была очень нужна.</div>
          <div class="card__footer thanks-card__footer">
            <div class="thanks-card-from__name">Владимир</div>
            <div class="thanks-card-from__avatar">
              <img src=${vladimirAva} alt="Avatar">
            </div>
          </div>        
        </div>
        <div class="card thanks-card">
          <div class="card__header thanks-card__header">              
            <div class="card__avatar thanks-card-to__avatar">
              <img src=${svetlanaAva} alt="Avatar">
            </div>
            <p><span class="card__name thanks-card-to__name">Зоя, </span>спасибо за</p>
          </div>
          <div class="card__title thanks-card__title">Спасибо ребятом из БГУИР общаги за покраску забора. 
          Ваша помощь была очень нужна.</div>
          <div class="card__footer thanks-card__footer">
            <div class="thanks-card-from__name">Владимир</div>
            <div class="thanks-card-from__avatar">
              <img src=${vladimirAva} alt="Avatar">
            </div>
          </div>        
        </div>
        <div class="card thanks-card">
          <div class="card__header thanks-card__header">              
            <div class="card__avatar thanks-card-to__avatar">
              <img src=${svetlanaAva} alt="Avatar">
            </div>
            <p><span class="card__name thanks-card-to__name">Зоя, </span>спасибо за</p>
          </div>
          <div class="card__title thanks-card__title">Спасибо ребятом из БГУИР общаги за покраску забора. 
          Ваша помощь была очень нужна.</div>
          <div class="card__footer thanks-card__footer">
            <div class="thanks-card-from__name">Владимир</div>
            <div class="thanks-card-from__avatar">
              <img src=${vladimirAva} alt="Avatar">
            </div>
          </div>        
        </div>
        <div class="card thanks-card">
          <div class="card__header thanks-card__header">              
            <div class="card__avatar thanks-card-to__avatar">
              <img src=${svetlanaAva} alt="Avatar">
            </div>
            <p><span class="card__name thanks-card-to__name">Зоя, </span>спасибо за</p>
          </div>
          <div class="card__title thanks-card__title">Спасибо ребятом из БГУИР общаги за покраску забора. 
          Ваша помощь была очень нужна.</div>
          <div class="card__footer thanks-card__footer">
            <div class="thanks-card-from__name">Владимир</div>
            <div class="tthanks-card-from__avatar">
              <img src=${vladimirAva} alt="Avatar">
            </div>
          </div>        
        </div>
        <div class="card thanks-card">
          <div class="card__header thanks-card__header">              
            <div class="card__avatar thanks-card-to__avatar">
              <img src=${svetlanaAva} alt="Avatar">
            </div>
            <p><span class="card__name thanks-card-to__name">Зоя, </span>спасибо за</p>
          </div>
          <div class="card__title thanks-card__title">Спасибо ребятом из БГУИР общаги за покраску забора. 
          Ваша помощь была очень нужна.</div>
          <div class="card__footer thanks-card__footer">
            <div class="thanks-card-from__name">Владимир</div>
            <div class="tthanks-card-from__avatar">
              <img src=${vladimirAva} alt="Avatar">
            </div>
          </div>        
        </div>
        <div class="card thanks-card">
          <div class="card__header thanks-card__header">              
            <div class="card__avatar thanks-card-to__avatar">
              <img src=${svetlanaAva} alt="Avatar">
            </div>
            <p><span class="card__name thanks-card-to__name">Зоя, </span>спасибо за</p>
          </div>
          <div class="card__title thanks-card__title">Спасибо ребятом из БГУИР общаги за покраску забора. 
          Ваша помощь была очень нужна.</div>
          <div class="card__footer thanks-card__footer">
            <div class="thanks-card-from__name">Владимир</div>
            <div class="tthanks-card-from__avatar">
              <img src=${vladimirAva} alt="Avatar">
            </div>
          </div>       
        </div>          
      </div>        
      <div class="thanks-section__frame4"></div>        
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
        </li>
        <li class="info-list__item">
          3. Если тебе самому нужна помощь - 
          жми <span class="info-list__item-span" id="requestSpan">"Оставить заявку"</span>
        </li>
        <li class="info-list__item" style="font-size: 16px;">
          ВАЖНО! вся помощь оказывается на безвозмездной основе
        </li>
      </ol>
      <div class="info-section__frame5"></div>
    </section>`;
  }

  render(): HTMLElement {
    this.wrapper.innerHTML += this.getWelcomeSection();
    this.wrapper.innerHTML += this.getRequestSection();
    this.wrapper.innerHTML += this.getThanksSection();
    this.wrapper.innerHTML += this.getInfoSection();
    return this.wrapper;
  }
}