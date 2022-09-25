import { Thanks } from '../../model/type/type';

export function getAllThanksWithDescription(thanks: Thanks[]) {
  return thanks.filter(thank => thank.description);
}