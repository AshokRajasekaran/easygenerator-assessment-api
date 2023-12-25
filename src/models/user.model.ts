import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ErrorMessageCode } from 'src/utils/error-code';
import { encodepassword } from 'src/utils/password';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    const existingUser = await this.model('User').findOne({
      email: this.email,
    });
    if (existingUser) {
      throw new Error(ErrorMessageCode.EMAIL_ALREADY_EXISTS);
    }
  }
  this.password = await encodepassword(this.password);
  next();
});

export default UserSchema;
