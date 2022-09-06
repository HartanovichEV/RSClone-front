import { Apply, Category, Country, Format } from '../../model/type/type';

export default function getRequestFormData(): Apply {
  const requestForm = document.getElementById('regForm') as HTMLFormElement;
  const data = new FormData(requestForm);
  const category = data.get('category') as keyof typeof Category;
  const format = data.get('format') as keyof typeof Format;
  const country = data.get('location') as keyof typeof Country;
  const address = data.get('address') as string;
  const time = data.get('time') as string;
  const date = data.get('date') as string;
  const text = data.get('textarea') as string;


  const formData: Apply = {
    category: Category[category],
    format: Format[format],
    country: Country[country],
    location: address,
    participants: [],
    date: new Date(`${date}T${time}`),
    description: text,
    open: true,
  };
  return formData;
}