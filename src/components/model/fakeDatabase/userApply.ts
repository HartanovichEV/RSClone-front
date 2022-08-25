import vladimirAva from '../../assets/img/Владимир.png'; 
import elenaAva from '../../assets/img/Елена.png'; 
import svetlanaAva from '../../assets/img/Светлана.png'; 
import { ApplyWithLogin, Category, Format, Country } from '../type/type';

export const dataUserApply: ApplyWithLogin[] = [
  {
    login: 'Владимир',
    avatar: vladimirAva,
    category: Category.healthcare,
    format: Format.ofline,
    country: Country.belarus,
    location: 'г.Минск, пр. Независимости, д.64', 
    description: 'Прошу, может кто сможет передать продукты в 1 больницу.Все расходы готов оплатить.', 
    open: true,
  },
  {
    login: 'Елена',
    avatar: elenaAva,
    category: Category.emergency,
    format: Format.ofline,
    country: Country.belarus,
    location: 'Ж/д вокзал Минск', 
    description: 'Rаждое воскресенье еду с дачи с полными сумками.Кто может помочь их поднести хотябы до метро...', 
    open: true,
  },
  {
    login: 'Светлана',
    avatar: svetlanaAva,
    category: Category.science,
    format: Format.online,
    country: Country.belarus,    
    description: 'Вторые сутки жутко зависает комп, аж бесит...Нужна помощь в переустановке винды.', 
    open: true,
  },
  {
    login: 'Егор',
    avatar: vladimirAva,
    category: Category.veterans,
    format: Format.ofline,
    country: Country.russia,
    location: 'г.Москва', 
    description: 'Нужно вынести мебель', 
    open: true,
  },
  {
    login: 'Ольга',
    avatar: elenaAva,
    category: Category.invalid,
    format: Format.ofline,
    country: Country.russia,
    location: 'г.Солнечногорск', 
    description: 'Прошу оказать содействие по сбору подписей для установки пандуса', 
    open: true,
  },
  {
    login: 'Юля',
    avatar: svetlanaAva,
    category: Category.сhildren,
    format: Format.ofline,
    country: Country.russia,    
    description: 'нужна помощь детям сиротам: игрушки, одежда, предметы первой необходимости', 
    open: true,
  },
  {
    login: 'Денис',
    avatar: vladimirAva,
    category: Category.animal,
    format: Format.ofline,
    country: Country.ukraine,
    location: 'г.Киев', 
    description: 'Возьмите пожалуйста собаку на передержку, буквально на два дня', 
    open: true,
  },
  {
    login: 'Саша',
    avatar: elenaAva,
    category: Category.nature,
    format: Format.ofline,
    country: Country.ukraine,
    location: 'г.Одесса', 
    description: 'Ищу добровольцев убрать городской парк', 
    open: true,
  },
  {
    login: 'Юля',
    avatar: svetlanaAva,
    category: Category.education,
    format: Format.online,
    country: Country.ukraine,    
    description: 'Не понимаю задачку по математике', 
    open: true,
  },
  {
    login: 'Даша',
    avatar: svetlanaAva,
    category: Category.other,
    format: Format.ofline,
    country: Country.russia, 
    location: 'г.Гданьск',   
    description: 'Нужно машину помыть', 
    open: true,
  },
  {
    login: 'Виталик',
    avatar: vladimirAva,
    category: Category.veterans,
    format: Format.ofline,
    country: Country.belarus,
    location: 'д.Табуны', 
    description: 'Нужно починить забор соседу пенсионеру', 
    open: true,
  },
  {
    login: 'Фаина',
    avatar: elenaAva,
    category: Category.veterans,
    format: Format.ofline,
    country: Country.ukraine,
    location: 'г.Одесса', 
    description: 'Люди добрые, помогите собрать урожай, совсем старая стала.', 
    open: true,
  },
  {
    login: 'Зоя',
    avatar: svetlanaAva,
    category: Category.healthcare,
    format: Format.ofline,
    country: Country.ukraine,
    location: 'г.Одесса',     
    description: 'Организовываю дежурство по уходу за тяжелобольными', 
    open: true,
  },
  {
    login: 'Петя',
    avatar: svetlanaAva,
    category: Category.healthcare,
    format: Format.ofline,
    country: Country.ukraine, 
    location: 'г.Харьков',    
    description: 'Сбор вторсырья', 
    open: false,
  },
  {
    login: 'Анатолий',
    avatar: svetlanaAva,
    category: Category.healthcare,
    format: Format.ofline,
    country: Country.ukraine, 
    location: 'г.Львов',    
    description: 'Сбор вторсырья', 
    open: false,
  },  
];