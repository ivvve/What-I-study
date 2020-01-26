export class User {
  id: string;
  name: string;
  age: number;

  constructor(id: string, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  isSameId(id: string): boolean {
    return (this.id === id);
  }
}
