import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  private constructor(username: string, password: string) {
    super();

    this.username = username;
    this.password = password;
  }

  static newUser(username: string, password: string): User {
    if (!username || username.length < 4) {
      throw new Error('username validation');
    }

    if (!password || password.length < 4) {
      throw new Error('password validation');
    }

    return new User(username, password);
  }
}
