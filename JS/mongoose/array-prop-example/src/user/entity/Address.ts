export class Address {
  private city: string;
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
