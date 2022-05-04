import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { Select, Store } from '@ngxs/store';
import { ActionDashboard } from './state/dashboard.actions';
import { DashboardState } from './state/dashboard.state';
import { Observable } from 'rxjs';
import { StatUser } from '../../data/model/statistics/stat-user.interface';
import { DateUtils } from '../../common/date.utils';
import { StatIncome } from '../../data/model/statistics/stat-income.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly store: Store) {}

  @Select(DashboardState.totalUsersCount)
  totalUsersCount$!: Observable<number>;

  @Select(DashboardState.monthlyIncome)
  monthlyIncome$!: Observable<number>;

  @Select(DashboardState.averageOrderValue)
  averageOrderValue$!: Observable<number>;

  @Select(DashboardState.monthlyOrdersCount)
  monthlyOrdersCount$!: Observable<number>;

  @Select(DashboardState.previousDayUserStats)
  previousDayUserStats$!: Observable<StatUser[]>;

  @Select(DashboardState.incomeStats)
  incomeStats$!: Observable<StatIncome[]>;

  options: EChartsOption = {};

  ngOnInit(): void {
    this.store.dispatch(ActionDashboard.initialLoadRequested());

    this.incomeStats$.subscribe((res) => {
      const date = [];
      const data = [];
      for (const statIncome of res) {
        date.push(
          [
            statIncome.createdAt.getFullYear(),
            statIncome.createdAt.getMonth() + 1,
            statIncome.createdAt.getDate(),
          ].join('/'),
        );
        data.push(statIncome.amount);
      }

      console.log(data);
      console.log(date);

      this.options = {
        grid: { left: 50, right: 32, top: 12, bottom: 20 },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: date,
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '20%'],
          axisLabel: { formatter: (value: number) => '$' + value },
        },
        color: '#ebb66dff',
        series: [
          {
            name: 'Income',
            type: 'bar',
            data: data,
          },
        ],
      };
    });
  }

  onPeriodChanged(event: NzTabChangeEvent) {
    switch (event.index) {
      case 0:
        console.log('day');
        break;
      case 1:
        console.log('week');
        break;
      case 2:
        console.log('month');
        break;
    }
  }

  calculateDiffDays(date: Date) {
    return DateUtils.calculateDayDiff(date, new Date());
  }
}
