import { ErrorMessageCode } from './error-code';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ErrorHandler implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    if (
      error.message.includes('Bad Request Exception') &&
      error?.response?.message &&
      error.response.message.length
    ) {
      // Handling/Wrapping class validator errors here.
      // API validators removing redunant messages during login, User must not see the quality of password in login, all vvalidation messaged as Invalid Password
      const errMessages = new Set(error.response.message);
      response.status(error.status).json({
        statusCode: error.status,
        path: request.url,
        errorMessage: Array.from(errMessages),
      });
    } else {
      // Handling other custom errors here.
      switch (error.message) {
        case ErrorMessageCode.UNAUTHORISED_USER:
          response.status(403).json({
            statusCode: 403,
            path: request.url,
            errorMessage: 'Invalid User',
            displayMessage: 'Unauthorised User',
          });
          break;
        case ErrorMessageCode.EMAIL_ALREADY_EXISTS:
          response.status(400).json({
            statusCode: 400,
            path: request.url,
            errorMessage: 'Email already in use',
            displayMessage: 'Email ID already in use',
          });
          break;
        case ErrorMessageCode.USER_NOT_FOUND:
          response.status(404).json({
            statusCode: 404,
            path: request.url,
            errorMessage: 'User Not Found',
            displayMessage: 'User does not exist',
          });
          break;
        case ErrorMessageCode.INCORRET_PASSWORD:
          response.status(403).json({
            statusCode: 403,
            path: request.url,
            errorMessage: 'Invalid Password',
            displayMessage: 'Password Is Incorrect',
          });
          break;
        default:
          response.status(500).json({
            statusCode: 500,
            path: request.url,
            errorMessage: error.message,
            displayMessage: 'Internal Server Error',
          });
      }
    }
  }
}
