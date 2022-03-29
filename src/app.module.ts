import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputerModule } from './computer/computer.module';
import { Report } from './report/report.entity';
import { ReportModule } from './report/report.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UserModule,
    ComputerModule,
    ReportModule,
  ],
})
export class AppModule {}
