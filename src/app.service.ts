import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  // Method to check the server status
  checkServer(): string {
    return 'Server is live';
  }
}