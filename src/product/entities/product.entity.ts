import { Base } from "src/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'products' })
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column()
  price: number;

  @Column()
  isEmpty: boolean;
}
