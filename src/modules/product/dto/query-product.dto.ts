/**
 * 查询商品 DTO
 */
export class QueryProductDto {
  /**
   * 页码
   */
  page?: number = 1;

  /**
   * 每页数量
   */
  pageSize?: number = 10;

  /**
   * 商品名称（模糊搜索）
   */
  name?: string;

  /**
   * 商品状态
   */
  status?: string;

  /**
   * 商品分类
   */
  category?: string;

  /**
   * 最低价格
   */
  minPrice?: number;

  /**
   * 最高价格
   */
  maxPrice?: number;
}
