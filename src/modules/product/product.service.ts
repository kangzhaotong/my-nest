/**
 * 商品服务
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { BaseService } from '../../common/utils/base.service';
import { BusinessException, ValidatorUtil } from '../../common';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }

  /**
   * 创建商品（带参数验证）
   */
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // 参数验证
    if (!createProductDto.name || ValidatorUtil.isEmpty(createProductDto.name)) {
      throw BusinessException.paramsError('商品名称不能为空');
    }

    if (
      createProductDto.price === undefined ||
      createProductDto.price === null
    ) {
      throw BusinessException.paramsError('商品价格不能为空');
    }

    if (createProductDto.price < 0) {
      throw BusinessException.paramsError('商品价格不能为负数');
    }

    if (createProductDto.stock && createProductDto.stock < 0) {
      throw BusinessException.paramsError('库存数量不能为负数');
    }

    // 检查商品名称是否已存在
    const existProduct = await this.findOne({ name: createProductDto.name } as any);
    if (existProduct) {
      throw BusinessException.paramsError('商品名称已存在');
    }

    return await this.create(createProductDto);
  }

  /**
   * 更新商品（带参数验证）
   */
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // 参数验证
    if (Object.keys(updateProductDto).length === 0) {
      throw BusinessException.paramsError('更新数据不能为空');
    }

    if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
      throw BusinessException.paramsError('商品价格不能为负数');
    }

    if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
      throw BusinessException.paramsError('库存数量不能为负数');
    }

    // 如果更新商品名称，检查是否重复
    if (updateProductDto.name) {
      const existProduct = await this.productRepository.findOne({
        where: { name: updateProductDto.name } as any,
      });
      if (existProduct && existProduct.id !== id) {
        throw BusinessException.paramsError('商品名称已存在');
      }
    }

    return await this.update(id, updateProductDto);
  }

  /**
   * 查询商品列表（带条件查询和分页）
   */
  async queryProducts(queryDto: QueryProductDto) {
    const { page = 1, pageSize = 10, name, status, category, minPrice, maxPrice } = queryDto;

    // 构建查询条件
    const where: any = {};

    // 商品名称模糊查询
    if (name) {
      where.name = Like(`%${name}%`);
    }

    // 商品状态精确查询
    if (status) {
      where.status = status;
    }

    // 商品分类精确查询
    if (category) {
      where.category = category;
    }

    // 价格区间查询
    if (minPrice !== undefined || maxPrice !== undefined) {
      const min = minPrice ?? 0;
      const max = maxPrice ?? 999999999;
      where.price = Between(min, max);
    }

    return await this.findPage(page, pageSize, {
      where,
      order: {
        createdAt: 'DESC', // 按创建时间倒序
      },
    });
  }

  /**
   * 获取商品详情
   */
  async getProductDetail(id: number): Promise<Product> {
    return await this.findById(id);
  }

  /**
   * 删除商品
   */
  async deleteProduct(id: number): Promise<void> {
    await this.delete(id);
  }

  /**
   * 批量删除商品
   */
  async batchDeleteProducts(ids: number[]): Promise<void> {
    await this.batchDelete(ids);
  }

  /**
   * 更新商品状态
   */
  async updateStatus(id: number, status: string): Promise<Product> {
    if (!['active', 'inactive'].includes(status)) {
      throw BusinessException.paramsError('商品状态只能是 active 或 inactive');
    }

    return await this.update(id, { status } as any);
  }

  /**
   * 更新商品库存
   */
  async updateStock(id: number, stock: number): Promise<Product> {
    if (stock < 0) {
      throw BusinessException.paramsError('库存数量不能为负数');
    }

    return await this.update(id, { stock } as any);
  }
}
