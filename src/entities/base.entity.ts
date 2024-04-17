import {timeStamp} from "console";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Base{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @CreateDateColumn()
    created_date:Date
}