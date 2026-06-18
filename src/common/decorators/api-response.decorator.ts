/**
 * API 响应装饰器
 * 用于快速返回统一格式的响应
 */
import { SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE_METADATA = 'response_message';

/**
 * 设置成功响应的消息
 * @param message 消息内容
 */
export const ApiResponseMessage = (message: string) =>
  SetMetadata(RESPONSE_MESSAGE_METADATA, message);
