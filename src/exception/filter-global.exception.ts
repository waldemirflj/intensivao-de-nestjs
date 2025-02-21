import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FilterGlobalException implements ExceptionFilter {
  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.adapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    // const status = exception.getStatus();
    // const body = exception.getResponse();

    const { body, status } =
      exception instanceof HttpException
        ? {
            body: exception.getResponse(),
            status: exception.getStatus(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              path: httpAdapter.getRequestUrl(request),
              timestamp: new Date().toISOString(),
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            },
          };

    httpAdapter.reply(response, body, status);
  }
}
