import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCastAndCrewDto } from './dto/create-castandcrew.dto';
import { UpdateCastAndCrewDto } from './dto/update-castandcrew.dto';
import { CastAndCrew } from 'src/schemas/castAndCrew.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class CastAndCrewService {
  constructor(
    @InjectModel(CastAndCrew.name)
    private castAndCrewSchema: mongoose.Model<CastAndCrew>,
  ) {}
  async create(createCastAndCrewDto: CreateCastAndCrewDto) {
    try {
      const castAndCrew = await this.castAndCrewSchema.create(
        createCastAndCrewDto,
      );
      return castAndCrew;
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          {
            error: {
              message: 'CastAndCrew already exists!',
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }

  async findAll() {
    try {
      const castAndCrews = await this.castAndCrewSchema.find();
      if (castAndCrews.length == 0) {
        throw new NotFoundException({
          error: {
            message: 'CastAndCrews not found!',
          },
        });
      }
      return castAndCrews;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const castAndCrew = await this.castAndCrewSchema.findById(id);
      if (castAndCrew === null) {
        throw new NotFoundException({
          error: {
            message: 'CastAndCrew not found!',
          },
        });
      }
      return castAndCrew;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateCastAndCrewDto: UpdateCastAndCrewDto) {
    try {
      const castAndCrew = await this.castAndCrewSchema.updateOne(
        { _id: id },
        updateCastAndCrewDto,
      );
      if (castAndCrew.modifiedCount === 1) {
        return await this.castAndCrewSchema.findById(id);
      } else {
        throw new NotFoundException({
          error: {
            message: 'CastAndCrew not found!',
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const castAndCrew = await this.castAndCrewSchema.deleteOne({ _id: id });
      if (castAndCrew.deletedCount === 1) {
        return {};
      } else {
        throw new NotFoundException({
          error: {
            message: 'CastAndCrew not found!',
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
