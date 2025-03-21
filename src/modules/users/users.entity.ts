import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "src/utils/enum-role";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "250", unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: "enum", enum: UserType, default: UserType.CLIENT })
  role: UserType;

  @Column({ type: "float", default: 0 })
  rating: number;

  @Column({ nullable: true })
  experience: number;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: "simple-array", nullable: true })
  skills: string[];

  @Column({ type: "simple-array", nullable: true })
  portfolio: string[];
};