import { dateFormatter, timeFormatter } from '../model/type/dateFormatter';
import { ApplyWithUser } from '../model/type/type';

export default function createDivItemCard(data: ApplyWithUser, page: string) {
  if (typeof data === 'undefined') return;
  const div: HTMLDivElement = document.createElement('div');
  div.setAttribute('applyId', '' + data.id);
  if (page === 'main') div.className = 'card';
  else div.className = 'card requests-section__card';

  div.innerHTML = `                   
                      <div class="card__header">
                        <div class="card__name">${data.name}</div>
                        <div class="card__avatar">
                          <img src=${data.avatar} alt="Avatar">
                        </div>
                      </div>
                      <div class="card__title" title="${data.description}">${data.description}</div>
                      <div class="card__info">
                        <ul>
                        <li><span class="card__span">Категория:</span> ${data.category}</li>
                        <li><span class="card__span">Формат:</span> ${data.format}</li>
                        <li><span class="card__span">Страна:</span> ${data.country}</li>
                        ${(data.location) ? '<li><span class="card__span">Адрес:</span>' + data.location + '</li>' : ''}
                        ${(data.date) ? '<li><span class="card__span">Дата:</span>'
                         + dateFormatter(new Date(data.date)) + '</li>' + 
                         '<li><span class="card__span">Время:</span>'
                         + timeFormatter(new Date(data.date)) + '</li>' : ''}
                        </ul>
                      </div>
                      <div class="card__btn">
                        <button class="btn card__login-btn color-btn" applyId = "${data.id}">Помочь</button>
                      </div>`;
  return div;
} 