import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminGuard } from './../gurards/admin.guard';
import { User } from './../user/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async getOneReport(id: string) {
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }
    return report;
  }

  @UseGuards(AdminGuard)
  async changeApproval(id: number, approved: boolean) {
    console.log('id:', id);
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
