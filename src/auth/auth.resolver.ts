import { Response } from 'express';
import { HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public, Roles } from 'utils/custom_decorators/auth.decorator';
import { Role } from 'utils/enums/role.enum';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth, Token } from 'src/schemas/auth.schema';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth, {
    name: 'createAuth',
  })
  @Roles(Role.Admin)
  create(@Args('createAuthDto') createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Mutation(() => Token, {
    name: 'login',
  })
  async login(
    @Args('loginAuthDto') loginAuthDto: LoginAuthDto,
    @Context() context: { res: Response },
  ) {
    const token = await this.authService.login(loginAuthDto);

    context.res.cookie('jwt', token.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });
    return token;
  }

  @Query(() => [Auth], { name: 'auths' })
  @Roles(Role.Admin)
  findAll() {
    return this.authService.findAll();
  }

  @Query(() => Auth, { name: 'auth' })
  @Roles(Role.Admin)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.authService.findOne(id);
  }

  @Mutation(() => Auth, {
    name: 'updateAuth',
  })
  @Roles(Role.Admin)
  update(@Args('updateAuthDto') updateAuthDto: UpdateAuthDto) {
    return this.authService.update(updateAuthDto.id, updateAuthDto);
  }

  @Mutation(() => Auth, {
    name: 'deleteAuth',
  })
  @Roles(Role.Admin)
  remove(@Args('id', { type: () => String }) id: string) {
    return this.authService.remove(id);
  }
}
