/**
 * 响应数据转换拦截器
 * 统一处理所有接口的响应格式
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../dto/response.dto';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ResponseDto<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        // 如果返回的数据已经是 ResponseDto 格式，直接返回
        if (data instanceof ResponseDto) {
          return data;
        }
        // 否则包装成统一格式
        return new ResponseDto(HttpStatus.OK, '操作成功', data);
      }),
    );
  }
}
