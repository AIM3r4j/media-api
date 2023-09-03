import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from 'src/schemas/media.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name)
    private mediaSchema: mongoose.Model<Media>,
  ) {}
  async create(createMediaDto: CreateMediaDto) {
    try {
      const { director, producer, actors, ...rest } = createMediaDto;

      const media = await this.mediaSchema.create({
        director: new Types.ObjectId(director),
        producer: new Types.ObjectId(producer),
        actors: actors,
        ...rest,
      });

      (await (await media.populate('director')).populate('producer')).populate(
        'actors',
      );

      return media;
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(
          {
            error: {
              message: 'Media already exists!',
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
      const medias = await this.mediaSchema
        .find()
        .populate('director')
        .populate('producer')
        .populate('actors');
      if (medias.length == 0) {
        throw new NotFoundException({
          error: {
            message: 'Medias not found!',
          },
        });
      }
      return medias;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const media = await this.mediaSchema
        .findById(id)
        .populate('director')
        .populate('producer')
        .populate('actors');
      if (media === null) {
        throw new NotFoundException({
          error: {
            message: 'Media not found!',
          },
        });
      }
      return media;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    try {
      const media = await this.mediaSchema.updateOne(
        { _id: id },
        updateMediaDto,
      );
      if (media.modifiedCount === 1) {
        return await this.mediaSchema
          .findById(id)
          .populate('director')
          .populate('producer')
          .populate('actors');
      } else {
        throw new NotFoundException({
          error: {
            message: 'Media not found!',
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const media = await this.mediaSchema.deleteOne({ _id: id });
      if (media.deletedCount === 1) {
        return {};
      } else {
        throw new NotFoundException({
          error: {
            message: 'Media not found!',
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
