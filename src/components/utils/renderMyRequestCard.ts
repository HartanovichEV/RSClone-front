import { getParticipantsInApply } from '../controller/dataHandlers/userFilters';
import { dateFormatter, timeFormatter } from '../model/type/dateFormatter';
import { ApplyWithUser } from '../model/type/type';
import { allUsers } from '../model/api/users';
function createDivMyRequestCard(data: ApplyWithUser) {
  const div: HTMLDivElement = document.createElement('div');
  const participants = getParticipantsInApply(allUsers, data);
  div.className = 'card';
  div.setAttribute('applyId', '' + data.id);
  div.innerHTML = `                  
        <div class="card__header"></div>
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
        
          <button class="btn color-btn my-requests__close" applyId = "${data.id}">Закрыть заявку</button>
        </div>    
        <div class="card__avatar avatar__participants">
          ${participants.reduce( (sum, p)=> sum += `<img src=${p.avatar} alt="Avatar" 
          class="avatar avatar_participant" userId='${p.id}'><span class='username'>${p.name}</span>`, '')}
        </div>            
      `;
  return div;
} 

export default function getPageMyRequests(myApplies: ApplyWithUser[] ) {
  const cardRequests = document.querySelector('.card-requests') as HTMLButtonElement;
  if (myApplies.length === 0) cardRequests.innerHTML = 'У вас пока нет заявок. Нажмите на + для добавления.';

  for (let i = 0; i < myApplies.length; i++) {              
    const div = createDivMyRequestCard(myApplies[i]);
    if (div) cardRequests.appendChild(div); 
  }
}