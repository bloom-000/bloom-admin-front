import { Permission } from './permission.interface';

export interface Role {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  permissions: Permission[];
}
