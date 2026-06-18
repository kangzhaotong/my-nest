/**
 * 商品控制器
 * 完整的增删改查示例
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { ResponseUtil } from '../../common';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * 创建商品
   * POST /product
   */
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);
    return ResponseUtil.success(product, '创建商品成功');
  }

  /**
   * 查询商品列表（支持分页和条件查询）
   * GET /product?page=1&pageSize=10&name=手机&status=active
   */
  @Get()
  async findAll(@Query() queryDto: QueryProductDto) {
    const result = await this.productService.queryProducts(queryDto);
    return ResponseUtil.page(
      result.list,
      result.total,
      result.page,
      result.pageSize,
    );
  }

  /**
   * 获取商品详情
   * GET /product/:id
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productService.getProductDetail(id);
    return ResponseUtil.success(product, '获取商品详情成功');
  }

  /**
   * 更新商品
   * PUT /product/:id
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.updateProduct(
      id,
      updateProductDto,
    );
    return ResponseUtil.success(product, '更新商品成功');
  }

  /**
   * 删除商品
   * DELETE /product/:id
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);
    return ResponseUtil.success(null, '删除商品成功');
  }

  /**
   * 批量删除商品
   * DELETE /product/batch
   */
  @Delete('batch/delete')
  async batchRemove(@Body() body: { ids: number[] }) {
    await this.productService.batchDeleteProducts(body.ids);
    return ResponseUtil.success(null, '批量删除商品成功');
  }

  /**
   * 更新商品状态
   * PUT /product/:id/status
   */
  @Put(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: string },
  ) {
    const product = await this.productService.updateStatus(id, body.status);
    return ResponseUtil.success(product, '更新商品状态成功');
  }

  /**
   * 更新商品库存
   * PUT /product/:id/stock
   */
  @Put(':id/stock')
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { stock: number },
  ) {
    const product = await this.productService.updateStock(id, body.stock);
    return ResponseUtil.success(product, '更新商品库存成功');
  }
}
