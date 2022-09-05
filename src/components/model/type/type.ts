
export interface Apply { 
  id?: number,
  userId?: number,
  participants: number[],
  category: string,
  format: string,
  country: string,
  location?: string, 
  date?: Date,
  description: string, 
  open: boolean,
} 



export interface ApplyWithUser extends Apply {
  name: string,
  avatar: string,
}

export interface Thanks {
  id: number,
  applyId : number,
  userId: number,
  participants: number[]
  description?: string
}

export interface ThanksWithUser extends Thanks {
  name: string,
  avatar: string,
}

export type UserThanks = {
  name: string, 
  avatar: string,
  body: string,
  target: string, 
  targetAvatar: string,
}[];

export enum Category {
  healthcare = 'Здравоохранение',
  emergency = 'ЧС',
  veterans = 'Пенсионеры',
  people = 'Люди с ОВС',
  children = 'Дети и подростки',
  animals = 'Животные',
  nature = 'Природа',
  science = 'Наука',
  education = 'Образование',
  else = 'Другое',
}
export enum Format {
  online = 'Онлайн',
  offline = 'Офлайн',
}
export enum Country {
  belarus = 'Беларусь',
  russia = 'Россия',
  ukraine = 'Украина',
}

export type Rating = {
  ava: string, 
  name: string, 
  score: number,
}[];

export type PageState = [
  main: string,
  user: string,
];

export type Vars = {
  sideMenu: HTMLElement,
  sideMenuSpan: HTMLElement,
  filtersWrapper: HTMLElement,
  filters: HTMLElement,
};