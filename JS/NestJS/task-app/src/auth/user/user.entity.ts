import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypy from 'bcrypt';
import {Task} from "../../tasks/task/task.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  async isPasswordMatched(password: string): Promise<boolean> {
    const hashedPassword = await bcrypy.hash(password, this.salt);
    return (this.password === hashedPassword);
  }

  private constructor(username: string, password: string, salt: string) {
    super();

    this.username = username;
    this.password = password;
    this.salt = salt;
  }

  static newUser(username: string, password: string, salt: string): User {
    if (!username || username.length < 4) {
      throw new Error('username validation');
    }

    if (!password || password.length < 4) {
      throw new Error('password validation');
    }

    return new User(username, password, salt);
  }
}
