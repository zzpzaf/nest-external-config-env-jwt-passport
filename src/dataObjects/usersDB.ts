import { User } from './user.entity';

export class UsersDB {
  private static user1 = new User({
    id: '6ae90891-0c5d-44c3-96f6-c3b154bc1dac',
    username: 'panos1',
    password: '$2b$10$ouJGyLJHpR9aexPLmHqcXe/vLMc.GmR0.VzfwvQduvxz6j6FcKWcq', //Pwpanos1!
    email: 'panos1@email.com',
    registrationdate: new Date('2022-01-10T09:38:00'),
    confirmed: true,
    canceled: false,
    typeid: 1,
    countryid: 28,
  });

  private static user2 = new User({
    id: '2ba7b5ca-8e99-44d4-92d9-6e3e3830335c',
    username: 'panos2',
    password: '$2b$10$puLUsUfVhozjR7uNxrF0YOCGwNg1apM6UNOBmHZRE.b8exFk3TwP6', //Pwpanos2@
    email: 'panos2@email.com',
    registrationdate: new Date('2022-01-10T11:21:00'),
    confirmed: true,
    canceled: false,
    typeid: 2,
    countryid: 28,
  });

  public static getInitialUsers(): User[] {
    const initUsers: User[] = [];
    initUsers.push(this.user1, this.user2);
    return initUsers;
  }
}
