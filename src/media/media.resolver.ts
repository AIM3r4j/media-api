import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Public, Roles } from 'utils/custom_decorators/auth.decorator';
import { Role } from 'utils/enums/role.enum';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Media } from 'src/schemas/media.schema';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(() => Media, {
    name: 'createMedia',
  })
  @Roles(Role.Admin)
  create(@Args('createMediaDto') createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Public()
  @Query(() => [Media], { name: 'medias' })
  findAll() {
    return this.mediaService.findAll();
  }

  @Roles(Role.Admin, Role.User)
  @Query(() => Media, { name: 'media' })
  findOne(@Args('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => Media, {
    name: 'updateMedia',
  })
  update(@Args('updateMediaDto') updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(updateMediaDto.id, updateMediaDto);
  }

  @Roles(Role.Admin)
  @Mutation(() => Media, {
    name: 'deleteMedia',
  })
  remove(@Args('id', { type: () => String }) id: string) {
    return this.mediaService.remove(id);
  }
}
