import { dateFormatter, timeFormatter } from '../model/type/dateFormatter';
import { ApplyWithUser } from '../model/type/type';

function createDivMyParticipateCard(data: ApplyWithUser) {
  const div: HTMLDivElement = document.createElement('div'); 
  div.className = 'card requests-section__card';
  div.setAttribute('participateId', '' + data.id);
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
        <button class="btn color-btn my-participate__close" applyId = "${data.id}">Отклонить мое предложение</button>
      </div>                
      `;
  return div;
} 

export default function getPageMyParticipates(myApplies: ApplyWithUser[] ) {
  const cardRequests = document.querySelector('.card-requests') as HTMLButtonElement;  
  if (myApplies.length === 0) cardRequests.innerHTML = 'Пока нет заявок, на которые Вы откликнулись.';
  for (let i = 0; i < myApplies.length; i++) {              
    const div = createDivMyParticipateCard(myApplies[i]);
    if (div) cardRequests.appendChild(div); 
  }
}