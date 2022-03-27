import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    console.log('Before the handler');

    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out

        // plainToClass
        return plainToInstance(this.dto, data, {
          // this setting tells to expose only
          // that data that is marked expose in UserDto

          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
