import { Role } from '../../../data/model/role/role.interface';

export class ActionRoles {
  static initialLoadRequested() {
    return new RolesInitialLoadRequested();
  }

  static deletePressed(payload: Role) {
    return new RolesDeletePressed(payload);
  }

  static pageChanged(payload: { page: number }) {
    return new RolesPageChanged(payload);
  }

  static pageSizeChanged(payload: { pageSize: number }) {
    return new RolesPageSizeChanged(payload);
  }
}

export class RolesInitialLoadRequested {
  static readonly type = '[roles] initial load requested';
}

export class RolesPageSizeChanged {
  static readonly type = '[roles] page size changed';

  constructor(public readonly payload: { pageSize: number }) {}
}

export class RolesDeletePressed {
  static readonly type = '[roles] delete';

  constructor(public readonly payload: Role) {}
}

export class RolesPageChanged {
  static readonly type = '[roles] page changed';

  constructor(public readonly payload: { page: number }) {}
}
