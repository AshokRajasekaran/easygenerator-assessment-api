import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserSchema, { User } from '../models/user.model';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [MongooseModule],
})
export class MongooseModuleConfig {}