/**
 * 基础 Service 类
 * 封装通用的增删改查方法
 */
import { Repository, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCode } from '../constants/error-code.constant';

/**
 * 定义实体必须有 id 字段
 */
interface BaseEntity {
  id: number;
}

export class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  /**
   * 创建记录
   * @param createDto 创建 DTO
   */
  async create(createDto: Partial<T>): Promise<T> {
    try {
      const entity = this.repository.create(createDto as any);
      const result = await this.repository.save(entity);
      return result as unknown as T;
    } catch (error) {
      throw new BusinessException(
        ErrorCode.DATABASE_ERROR,
        `创建失败: ${error.message}`,
      );
    }
  }

  /**
   * 根据 ID 查找记录
   * @param id 记录 ID
   * @param throwError 找不到时是否抛出异常，默认 true
   */
  async findById(id: number, throwError: boolean = true): Promise<T | null> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });

    if (!entity && throwError) {
      throw BusinessException.notFound('记录不存在');
    }

    return entity;
  }

  /**
   * 根据条件查找单条记录
   * @param where 查询条件
   */
  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return await this.repository.findOne({ where });
  }

  /**
   * 查找所有记录
   * @param options 查询选项
   */
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  /**
   * 分页查询
   * @param page 页码
   * @param pageSize 每页数量
   * @param options 查询选项
   */
  async findPage(
    page: number = 1,
    pageSize: number = 10,
    options?: FindManyOptions<T>,
  ): Promise<{ list: T[]; total: number; page: number; pageSize: number }> {
    const skip = (page - 1) * pageSize;

    const [list, total] = await this.repository.findAndCount({
      ...options,
      skip,
      take: pageSize,
    });

    return {
      list,
      total,
      page,
      pageSize,
    };
  }

  /**
   * 更新记录
   * @param id 记录 ID
   * @param updateDto 更新 DTO
   */
  async update(id: number, updateDto: Partial<T>): Promise<T> {
    // 先查找记录是否存在
    const entity = await this.findById(id);

    try {
      // 合并更新数据
      const updatedEntity = this.repository.merge(entity, updateDto as any);
      const result = await this.repository.save(updatedEntity);
      return result as unknown as T;
    } catch (error) {
      throw new BusinessException(
        ErrorCode.DATABASE_ERROR,
        `更新失败: ${error.message}`,
      );
    }
  }

  /**
   * 删除记录（软删除）
   * @param id 记录 ID
   */
  async delete(id: number): Promise<void> {
    // 先查找记录是否存在
    await this.findById(id);

    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw BusinessException.notFound('删除失败，记录不存在');
      }
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ErrorCode.DATABASE_ERROR,
        `删除失败: ${error.message}`,
      );
    }
  }

  /**
   * 批量删除
   * @param ids 记录 ID 数组
   */
  async batchDelete(ids: number[]): Promise<void> {
    if (!ids || ids.length === 0) {
      throw BusinessException.paramsError('请提供要删除的记录ID');
    }

    try {
      const result = await this.repository.delete(ids);
      if (result.affected === 0) {
        throw BusinessException.notFound('删除失败，记录不存在');
      }
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException(
        ErrorCode.DATABASE_ERROR,
        `批量删除失败: ${error.message}`,
      );
    }
  }

  /**
   * 统计记录数
   * @param where 查询条件
   */
  async count(where?: FindOptionsWhere<T>): Promise<number> {
    return await this.repository.count({ where });
  }

  /**
   * 检查记录是否存在
   * @param where 查询条件
   */
  async exists(where: FindOptionsWhere<T>): Promise<boolean> {
    const count = await this.count(where);
    return count > 0;
  }
}
