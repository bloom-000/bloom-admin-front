export class ActionNewRole {
  static savePressed(payload: NewRoleSavePressedPayload) {
    return new NewRoleSavePressed(payload);
  }

  static initialRoleIdLoaded(payload: NewRoleInitialRoleIdLoadedPayload) {
    return new NewRoleInitialRoleIdLoaded(payload);
  }
}

interface NewRoleSavePressedPayload {
  name: string;
  description: string;
  permissionIds: number[];
}
export class NewRoleSavePressed {
  static readonly type = '[new-role] save';

  constructor(public payload: NewRoleSavePressedPayload) {}
}

interface NewRoleInitialRoleIdLoadedPayload {
  roleId: number;
}
export class NewRoleInitialRoleIdLoaded {
  static readonly type = '[new-role] initial role id loaded';

  constructor(public readonly payload: NewRoleInitialRoleIdLoadedPayload) {}
}
