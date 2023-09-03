import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from '../schemas/auth.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authSchema: mongoose.Model<Auth>,
    private jwtService: JwtService,
  ) {}
  async create(createAuthDto: CreateAuthDto) {
    try {
      const hash = await bcrypt.hash(createAuthDto.password, 10);
      createAuthDto.password = hash;
      const auth = await this.authSchema.create(createAuthDto);
      return { auth };
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          {
            error: {
              message: 'User already exists!',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const auth = await this.authSchema.findOne({
        username: loginAuthDto.username,
      });
      if (auth === null) {
        throw new NotFoundException({
          error: {
            message: 'Auth not found!',
          },
        });
      }
      const isAMatch = await bcrypt.compare(
        loginAuthDto.password,
        auth.password,
      );
      if (!isAMatch) {
        throw new UnauthorizedException({
          success: false,
          error: { message: 'Invalid credentials' },
        });
      }
      const payload = {
        sub: auth.id,
        username: auth.username,
        roles: auth.roles,
      };
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });
      return {
        access_token: token,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const auths = await this.authSchema.find();
      if (auths.length == 0) {
        throw new NotFoundException({
          error: {
            message: 'Auths not found!',
          },
        });
      }
      return auths;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const auth = await this.authSchema.findById(id);
      if (auth === null) {
        throw new NotFoundException({
          error: {
            message: 'Auth not found!',
          },
        });
      }
      return auth;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      const hash = await bcrypt.hash(updateAuthDto.password, 10);
      updateAuthDto.password = hash;
      const auth = await this.authSchema.updateOne({ _id: id }, updateAuthDto);
      if (auth.modifiedCount === 1) {
        return await this.authSchema.findOne({
          username: updateAuthDto.username,
        });
      } else {
        throw new NotFoundException({
          error: {
            message: 'Auth not found!',
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const auth = await this.authSchema.deleteOne({ _id: id });
      if (auth.deletedCount === 1) {
        return {};
      } else {
        throw new NotFoundException({
          error: {
            message: 'Auth not found!',
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
