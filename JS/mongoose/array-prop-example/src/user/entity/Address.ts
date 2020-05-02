import { prop } from '@typegoose/typegoose';

export class Address {
  @prop()
  private city: string;

  @prop()
  private detail: string;

  constructor(city: string, detail: string) {
    this.city = city;
    this.detail = detail;
  }

  update(city: string, detail: string) {
    this.city = city;
    this.detail = detail;
  }
}
