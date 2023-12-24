import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();
    this.logger.log(`Method: ${method} | URL: ${originalUrl} ++ Request initiated`);
    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      this.logger.log(`Method: ${method} | URL: ${originalUrl} | StatusCode: ${statusCode} | TimeTaken: ${duration}ms ++ Response Sent`);
    });

    next();
  }
}