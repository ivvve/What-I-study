import { buildSchema, index, prop } from '@typegoose/typegoose';
import { Address } from './Address';

@index({ name: 1 }, { unique: true })
export class User {
  @prop()
  name: String;

  @prop()
  addresses: Address[];

  constructor(name: String) {
    this.name = name;
    this.addresses = [];
  }

  addAddress(city: string, detail: string): void {
    this.addresses.push(new Address(city, detail));
  }

  updateAddress(addressIndex: number, city: string, detail: string): void {
    const address = this.addresses[addressIndex];
    address.update(city, detail);
  }
}

export const UserSchema = buildSchema(User, { versionKey: false });
