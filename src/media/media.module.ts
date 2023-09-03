import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaSchema } from 'src/schemas/media.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Media',
        schema: MediaSchema,
      },
    ]),
  ],
  providers: [MediaResolver, MediaService],
})
export class MediaModule {}
