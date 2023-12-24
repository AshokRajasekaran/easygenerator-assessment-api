import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MongooseModuleConfig } from './mongoose/mongoose.module';

@Module({
  imports: [MongooseModuleConfig],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
