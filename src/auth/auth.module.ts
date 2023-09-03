import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from '../schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CustomAuthGuard } from './strategy/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Auth',
        schema: AuthSchema,
      },
    ]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: CustomAuthGuard,
    },
  ],
})
export class AuthModule {}
