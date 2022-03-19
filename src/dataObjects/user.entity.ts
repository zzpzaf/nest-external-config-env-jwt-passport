import { Exclude, Expose, Type } from 'class-transformer';

export class User {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Exclude({ toPlainOnly: true })
  password: string;
  @Expose()
  email: string;
  @Expose()
  @Type(() => Date)
  registrationdate: Date;
  @Expose()
  @Type(() => Boolean)
  confirmed: boolean;
  @Expose()
  @Type(() => Boolean)
  canceled: boolean;
  @Expose()
  @Type(() => Number)
  typeid: number;
  @Expose()
  @Type(() => Number)
  countryid: number;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
