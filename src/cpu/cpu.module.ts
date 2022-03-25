import { Module } from '@nestjs/common';
import { PowerModule } from './../power/power.module';
import { CpuService } from './cpu.service';

@Module({
  // NOW CPU MODULE HAVE ACCESS TO
  // ALL OF SERVICE FROM POWER MODULE
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
