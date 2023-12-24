import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { generateJwtToken } from 'src/utils/jwt';
import { ErrorMessageCode } from 'src/utils/error-code';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signUp(user: any): Promise<any> {
    const newUser = new this.userModel(user);
    return await newUser.save().catch(error => {
        console.log(error)
        throw error;
    });
  }

  async login(loginPayload: any): Promise<Object> {
    const user = await this.userModel.findOne({
      email: loginPayload.email,
    });
    if (!user) {
        throw new Error(ErrorMessageCode.USER_NOT_FOUND)
    }
    const token = generateJwtToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    return {
      token,
    };
  }
}
