import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { LoginDto } from 'src/dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/role.guard';
import { userRole } from 'src/enum/role.enum';
import { Roles } from 'src/guard/role';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.signUp(payload);
  }


  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const token = await this.userService.login(payload, res);
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
    @Roles(userRole.admin, userRole.member)
  findAll() {
    return this.userService.getAllUser()
  }
}
 