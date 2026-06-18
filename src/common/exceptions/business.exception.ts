/**
 * 业务异常类
 * 用于抛出业务逻辑相关的异常
 */
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ErrorMessage } from '../constants/error-code.constant';

export class BusinessException extends HttpException {
  constructor(
    errorCode: number = ErrorCode.UNKNOWN_ERROR,
    message?: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        code: errorCode,
        message: message || ErrorMessage[errorCode] || '操作失败',
      },
      statusCode,
    );
  }

  /**
   * 创建参数错误异常
   */
  static paramsError(message?: string): BusinessException {
    return new BusinessException(ErrorCode.PARAMS_ERROR, message);
  }

  /**
   * 创建未授权异常
   */
  static unauthorized(message?: string): BusinessException {
    return new BusinessException(
      ErrorCode.UNAUTHORIZED,
      message,
      HttpStatus.UNAUTHORIZED,
    );
  }

  /**
   * 创建禁止访问异常
   */
  static forbidden(message?: string): BusinessException {
    return new BusinessException(
      ErrorCode.FORBIDDEN,
      message,
      HttpStatus.FORBIDDEN,
    );
  }

  /**
   * 创建资源不存在异常
   */
  static notFound(message?: string): BusinessException {
    return new BusinessException(
      ErrorCode.NOT_FOUND,
      message,
      HttpStatus.NOT_FOUND,
    );
  }
}
