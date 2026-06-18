/**
 * 更新商品 DTO
 */
export class UpdateProductDto {
  /**
   * 商品名称
   */
  name?: string;

  /**
   * 商品描述
   */
  description?: string;

  /**
   * 商品价格
   */
  price?: number;

  /**
   * 库存数量
   */
  stock?: number;

  /**
   * 商品状态
   */
  status?: string;

  /**
   * 商品分类
   */
  category?: string;
}
