import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>){}
  async create(payload: CreateUserDto) {
    //Converting the email to lower case
    payload.email = payload.email.toLowerCase();
    //Destructuring the dto(payload) to extract the different properties
    const {email, password, ...rest}=payload
    //This searches the database for an identical email
    const isUser = await this.userRepo.findOne({where:{email}})
    //Throw error if email already exists
    if(isUser) throw new HttpException('Sorry, user with this email currently exist', 400);

    //The number 10 is the salt number. It makes it difficult for the hashed password to be predicted by a hacker.
    //The higher the salt number, the higher the difficulty level
    const hashPassword= await bcrypt.hash(password, 10)

    try {
      const user = await this.userRepo.save({email, password:hashPassword, ...rest});
      delete user.password;
      return user;
    } catch (error){
      if(error.code === '22P02'){
        throw new BadRequestException('admin role should be lowercase')
      }
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
