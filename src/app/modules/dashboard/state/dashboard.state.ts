import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { StatisticsService } from '../../../data/services/statistics.service';
import { DashboardInitialLoadRequested } from './dashboard.actions';
import { StatUser } from '../../../data/model/statistics/stat-user.interface';
import { StatIncome } from '../../../data/model/statistics/stat-income.interface';
import { DurationConstants } from '../../../common/duration.constants';

interface DashboardStateModel {
  totalUsersCount: number;
  monthlyIncome: number;
  averageOrderValue: number;
  monthlyOrdersCount: number;
  previousDayUserStats: StatUser[];
  incomeStats: StatIncome[];
}

const DASHBOARD_STATE_TOKEN = new StateToken<DashboardStateModel>('dashboard');

@State<DashboardStateModel>({
  name: DASHBOARD_STATE_TOKEN,
  defaults: {
    totalUsersCount: 0,
    monthlyIncome: 0,
    averageOrderValue: 0,
    monthlyOrdersCount: 0,
    previousDayUserStats: [],
    incomeStats: [],
  },
})
@Injectable()
export class DashboardState {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Selector([DASHBOARD_STATE_TOKEN])
  static totalUsersCount(state: DashboardStateModel) {
    return state.totalUsersCount;
  }

  @Selector([DASHBOARD_STATE_TOKEN])
  static monthlyIncome(state: DashboardStateModel) {
    return state.monthlyIncome;
  }

  @Selector([DASHBOARD_STATE_TOKEN])
  static averageOrderValue(state: DashboardStateModel) {
    return state.averageOrderValue;
  }

  @Selector([DASHBOARD_STATE_TOKEN])
  static monthlyOrdersCount(state: DashboardStateModel) {
    return state.monthlyOrdersCount;
  }

  @Selector([DASHBOARD_STATE_TOKEN])
  static previousDayUserStats(state: DashboardStateModel) {
    return state.previousDayUserStats;
  }

  @Selector([DASHBOARD_STATE_TOKEN])
  static incomeStats(state: DashboardStateModel) {
    return state.incomeStats;
  }

  @Action(DashboardInitialLoadRequested)
  async initialLoadRequested(ctx: StateContext<DashboardStateModel>) {
    this.statisticsService
      .getTotalRegisteredUsersCount()
      .subscribe((res) => ctx.patchState({ totalUsersCount: res }));

    this.statisticsService.getMonthlyIncomeStats().subscribe((res) =>
      ctx.patchState({
        monthlyIncome: res.amount,
        averageOrderValue: Math.floor(res.amount / res.orderCount),
        monthlyOrdersCount: res.orderCount,
      }),
    );

    this.statisticsService
      .getRegisteredUserStatsForLastDays(8)
      .subscribe((res) => ctx.patchState({ previousDayUserStats: res }));

    const now = new Date();
    this.statisticsService
      .getIncomeStats(
        new Date(now.getTime() - DurationConstants.MILLIS_IN_DAY * 10),
        now,
      )
      .subscribe((res) => ctx.patchState({ incomeStats: res }));
  }
}
