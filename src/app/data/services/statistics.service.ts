import { Injectable } from '@angular/core';
import { ApiService } from '../network/api.service';
import { map, Observable } from 'rxjs';
import { StatUser } from '../model/statistics/stat-user.interface';
import { MonthlyIncomeStats } from '../model/statistics/monthly-income-stats.interface';
import { StatIncome } from '../model/statistics/stat-income.interface';

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  constructor(private readonly apiService: ApiService) {}

  getRegisteredUserStatsForLastDays(
    forLastDaysCount: number,
  ): Observable<StatUser[]> {
    return this.apiService
      .getRegisteredUserStatsForLastDays(forLastDaysCount)
      .pipe(
        map((res) =>
          res.map((e) => ({
            ...e,
            createdAt: new Date(e.createdAt),
            updatedAt: new Date(e.updatedAt),
            deletedAt: new Date(e.deletedAt),
          })),
        ),
      );
  }

  getTotalRegisteredUsersCount(): Observable<number> {
    return this.apiService
      .getTotalRegisteredUsersCount()
      .pipe(map((e) => e.count));
  }

  getMonthlyIncomeStats(): Observable<MonthlyIncomeStats> {
    return this.apiService.getMonthlyIncomeStats();
  }

  getIncomeStats(startDate: Date, endDate: Date): Observable<StatIncome[]> {
    return this.apiService.getIncomeStats(startDate, endDate).pipe(
      map((res) =>
        res.map((e) => ({
          ...e,
          createdAt: new Date(e.createdAt),
          updatedAt: new Date(e.updatedAt),
          deletedAt: new Date(e.deletedAt),
        })),
      ),
    );
  }
}
