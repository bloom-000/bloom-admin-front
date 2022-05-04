export class ActionDashboard {
  static initialLoadRequested() {
    return new DashboardInitialLoadRequested();
  }
}

export class DashboardInitialLoadRequested {
  static readonly type = '[dashboard] initial load requested';
}
