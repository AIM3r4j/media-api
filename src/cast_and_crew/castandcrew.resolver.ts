import { CastAndCrewService } from './castandcrew.service';
import { CreateCastAndCrewDto } from './dto/create-castandcrew.dto';
import { UpdateCastAndCrewDto } from './dto/update-castandcrew.dto';
import { Roles } from 'utils/custom_decorators/auth.decorator';
import { Role } from 'utils/enums/role.enum';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CastAndCrew } from 'src/schemas/castandcrew.schema';

@Resolver(() => CastAndCrew)
export class CastAndCrewResolver {
  constructor(private readonly castAndCrewService: CastAndCrewService) {}

  @Mutation(() => CastAndCrew, {
    name: 'createCastAndCrew',
  })
  @Roles(Role.Admin)
  create(
    @Args('createCastAndCrewDto') createCastAndCrewDto: CreateCastAndCrewDto,
  ) {
    return this.castAndCrewService.create(createCastAndCrewDto);
  }

  @Query(() => [CastAndCrew], { name: 'castandcrews' })
  @Roles(Role.Admin)
  findAll() {
    return this.castAndCrewService.findAll();
  }

  @Roles(Role.Admin, Role.User)
  @Query(() => CastAndCrew, { name: 'castandcrew' })
  findOne(@Args('id') id: string) {
    return this.castAndCrewService.findOne(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => CastAndCrew, {
    name: 'updateCastAndCrew',
  })
  update(
    @Args('updateCastAndCrewDto') updateCastAndCrewDto: UpdateCastAndCrewDto,
  ) {
    return this.castAndCrewService.update(
      updateCastAndCrewDto.id,
      updateCastAndCrewDto,
    );
  }

  @Roles(Role.Admin)
  @Mutation(() => CastAndCrew, {
    name: 'deleteCastAndCrew',
  })
  remove(@Args('id', { type: () => String }) id: string) {
    return this.castAndCrewService.remove(id);
  }
}
