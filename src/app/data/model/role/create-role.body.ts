export interface CreateRoleBody {
  name: string;
  description: string;
  permissionIds: number[];
}
