import { Module } from '@nestjs/common';
import { CastAndCrewService } from './castandcrew.service';
import { CastAndCrewResolver } from './castandcrew.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CastAndCrewSchema } from 'src/schemas/castandcrew.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'CastAndCrew',
        schema: CastAndCrewSchema,
      },
    ]),
  ],
  providers: [CastAndCrewResolver, CastAndCrewService],
})
export class CastAndCrewModule {}
