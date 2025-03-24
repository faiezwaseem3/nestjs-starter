import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    
    // Find or create roles
    const roles = await Promise.all(
      (dto.roles || ['USER']).map(name => 
        this.prisma.role.upsert({
          where: { name },
          create: { name },
          update: {},
        })
      )
    );

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        roles: {
          connect: roles.map(role => ({ id: role.id })),
        },
      },
      include: { roles: true },
    });

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwt.signAsync(payload),
      user,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { roles: true },
    });

    if (!user) throw new Error('User not found');

    const pwMatches = await bcrypt.compare(dto.password, user.password);
    if (!pwMatches) throw new Error('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwt.signAsync(payload),
      user,
    };
  }

  async validateUser(payload: any) {
    return await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { roles: true },
    });
  }
}