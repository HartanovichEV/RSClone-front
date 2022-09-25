import { UserVisualData } from '../../model/type/User';
import { Apply, ApplyWithUser } from '../../model/type/type';
import { getUsers } from '../../model/api/users';
import { getApplies } from '../../model/api/applies';

export function createAppliesWithUser(users: UserVisualData[], applies :Apply[]) {
  const appliesWithUser: ApplyWithUser[] = [];
  applies.forEach(apply => {
    const user = users.find(u => apply.userId === u.id);
    appliesWithUser.push({
      ...apply,
      name: user?.name as string,
      avatar: user?.avatar as string,
    });
  });
  return appliesWithUser;
}


export async function allAppliesWithUsers() : Promise<ApplyWithUser[]> {
  const users = await getUsers();
  const applies =  await getApplies();
  const allApplies = createAppliesWithUser(users as UserVisualData[], applies as Apply[]);
  return allApplies;
}