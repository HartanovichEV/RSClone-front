export const dateFormatter = new Intl.DateTimeFormat('ru', {
  
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
}).format;

export const timeFormatter = new Intl.DateTimeFormat('ru', {
  hour: 'numeric',
  minute: 'numeric',
}).format;