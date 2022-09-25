import { UserVisualData } from '../../model/type/User';
import { Apply, ApplyWithUser, Thanks, ThanksWithUser } from '../../model/type/type';
import { getUsers } from '../../model/api/users';
import { getThanks } from '../../model/api/thanks';

export function createThanksWithUser(users: UserVisualData[], thanks :Thanks[]) {
  const thanksWithUser: ThanksWithUser[] = [];
  thanks.forEach(thank => {
    const user = users.find(u => thank.userId === u.id);
    thanksWithUser.push({
      ...thank,
      name: user?.name as string,
      avatar: user?.avatar as string,
    });
  });
  return thanksWithUser;
}


export async function allThanksWithUsers() : Promise<ThanksWithUser[]> {
  const users = await getUsers();
  const thanks =  await getThanks();
  const allThanks = createThanksWithUser(users as UserVisualData[], thanks as ThanksWithUser[]);
  return allThanks;
}