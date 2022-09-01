export interface Apply { 
  category: string,
  format: string,
  contact?: (string | null)[],
  country: string,
  location?: string, 
  time?: string,
  description: string, 
  open: boolean,
} 
export interface ApplyWithLogin extends Apply {
  login: string,
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
  invalid = 'Люди с ОВС',
  children = 'Дети/подростки',
  animal = 'Животные',
  nature = 'Природа',
  science = 'Наука',
  education = 'Образование',
  other = 'Другое',
}
export enum Format {
  online = 'Онлайн',
  ofline = 'Офлайн',
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