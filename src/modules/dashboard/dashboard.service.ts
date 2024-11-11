import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  create(createDashboardDto) {
    console.log(createDashboardDto);

    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, createDashboardDto) {
    console.log(createDashboardDto);

    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
