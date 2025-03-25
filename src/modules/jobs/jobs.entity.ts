import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: "float" })
  price: number;
};