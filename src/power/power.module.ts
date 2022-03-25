import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  // EXPORT COPY OF POWER SERVICE TO OTHER MODULES (CPU,DISK)
  exports: [PowerService],
})
export class PowerModule {}
