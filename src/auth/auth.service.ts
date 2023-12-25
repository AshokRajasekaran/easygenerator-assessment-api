import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { generateJwtToken } from 'src/utils/jwt';
import { ErrorMessageCode } from 'src/utils/error-code';
import { SignupDto, SignupResponseDto } from './dto/signup.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signUp(user: SignupDto): Promise<SignupResponseDto> {
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();
    return {
      _id: savedUser._id,
      email: savedUser.email,
      name: savedUser.name,
    };
  }

  async login(loginPayload: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({
      email: loginPayload.email,
    });
    if (!user) {
      throw new Error(ErrorMessageCode.USER_NOT_FOUND);
    }
    const token = generateJwtToken({
      id: user._id,
      name: user.name,
      email: user.email,
    });
    return {
      token: `Bearer ${token}`,
      expireTime: process.env.JWT_TIMEOUT,
      userId: user._id,
      name: user.name,
      userEmail: user.email,
    };
  }
}
