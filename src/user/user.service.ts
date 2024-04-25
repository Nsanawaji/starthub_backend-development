import {
  BadRequestException,
  HttpException,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { Request, Response } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(payload: CreateUserDto) {
    //Converting the email to lower case
    payload.email = payload.email.toLowerCase();
    //Destructuring the dto(payload) to extract the different properties
    const { email, password, ...rest } = payload;
    //This searches the database for an identical email
    const isUser = await this.userRepo.findOne({ where: { email } });
    //Throw error if email already exists
    if (isUser)
      throw new HttpException(
        'Sorry, user with this email currently exist',
        400,
      );

    //The number 10 is the salt number. It makes it difficult for the hashed password to be predicted by a hacker.
    //The higher the salt number, the higher the difficulty level
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userRepo.save({
        email,
        password: hashPassword,
        ...rest,
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error.code === '22P02') {
        throw new BadRequestException('admin role should be lowercase');
      }
      return error;
    }
  }

  async login(payload: LoginDto, @Res() res: Response): Promise<any> {
    //Ensure the Request and Response are from express.
    const { email, password } = payload;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new HttpException('Invalid Credentials', 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid Credentials', 404);
    }

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie('userAuthenticated', token, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true,
    });

    delete user.password;
    return res.send({
      message: 'User logged in successfully',
      userToken: token,
      userDetails: user,
    });
  }
}
