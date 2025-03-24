import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ // This is important
      isGlobal: true, // Makes ConfigService available globally
    }),

    PrismaModule, AuthModule, PaymentModule, FileModule, AdminModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
