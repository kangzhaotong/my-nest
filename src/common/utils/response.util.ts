/**
 * 统一响应工具类
 */
import { HttpStatus } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';

export class ResponseUtil {
  /**
   * 成功响应
   * @param data 响应数据
   * @param message 响应消息
   * @param code 状态码
   */
  static success<T>(
    data?: T,
    message: string = '操作成功',
    code: number = HttpStatus.OK,
  ): ResponseDto<T> {
    return new ResponseDto(code, message, data);
  }

  /**
   * 失败响应
   * @param message 错误消息
   * @param code 状态码
   * @param data 额外数据
   */
  static error<T>(
    message: string = '操作失败',
    code: number = HttpStatus.BAD_REQUEST,
    data?: T,
  ): ResponseDto<T> {
    return new ResponseDto(code, message, data);
  }

  /**
   * 分页响应
   * @param list 数据列表
   * @param total 总数
   * @param page 当前页
   * @param pageSize 每页数量
   */
  static page<T>(
    list: T[],
    total: number,
    page: number,
    pageSize: number,
  ): ResponseDto<{
    list: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    return this.success({
      list,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  }
}
