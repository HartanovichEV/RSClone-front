import { Rating } from '../model/type/type';

export const sortedArr = (arr: Rating) => {
  return arr.sort((a, b) => b.score - a.score);
};