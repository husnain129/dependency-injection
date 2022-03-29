import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { AuthGuard } from './../gurards/auth.guard';
import { User } from './../user/user.entity';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportService } from './report.service';
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Get('/:id')
  getReport(@Param('id') id: string) {
    return this.reportService.getOneReport(id);
  }

  @Patch('/:id')
  approvedReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
    return this.reportService.changeApproval(parseInt(id), body.approved);
  }
}
