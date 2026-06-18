/**
 * 统一响应数据传输对象
 */
export class ResponseDto<T = any> {
  /**
   * 状态码
   */
  code: number;

  /**
   * 响应消息
   */
  message: string;

  /**
   * 响应数据
   */
  data?: T;

  /**
   * 时间戳
   */
  timestamp: number;

  constructor(code: number, message: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = Date.now();
  }
}
