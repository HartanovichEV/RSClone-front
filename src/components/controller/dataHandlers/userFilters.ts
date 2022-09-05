import { Apply, Thanks } from '../../model/type/type';
import { UserVisualData } from '../../model/type/User';

export const getUsersRating = (users: UserVisualData[]) => users.sort((a, b) => b.goodThings - a.goodThings);

export const getParticipantsInApply =  (users: UserVisualData[], apply:Apply)  =>
  users.filter(user => apply.participants.some(part => part === user.id));

export const getParticipantsInThanks =  (users: UserVisualData[], thanks:Thanks)  => 
  users.filter(user => thanks.participants.some(thank => thank === user.id));

