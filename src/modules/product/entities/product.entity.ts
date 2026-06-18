/**
 * 商品实体
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({
    comment: '商品ID',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    comment: '商品名称',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '商品描述',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '商品价格',
  })
  price: number;

  @Column({
    type: 'int',
    default: 0,
    comment: '库存数量',
  })
  stock: number;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'active',
    comment: '商品状态: active-上架, inactive-下架',
  })
  status: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '商品分类',
  })
  category: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updatedAt: Date;
}
