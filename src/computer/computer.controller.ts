import { Controller, Get, UseGuards } from '@nestjs/common';
import { CpuService } from './../cpu/cpu.service';
import { DiskService } from './../disk/disk.service';
import { AuthGuard } from './../gurards/auth.guard';

@Controller('computer')
export class ComputerController {
  constructor(
    private readonly cpuService: CpuService,
    private readonly diskService: DiskService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  run() {
    return [this.cpuService.compute(2, 4), this.diskService.getData()];
  }
}
