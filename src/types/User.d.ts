interface Permission {
  departmentId: string[];
  get: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface UserPermissions {
  content: Permission[];
  user: Permission[];
}

interface User {
  id: string;
  departmentId: string[];
  name: string;
  role: string[];
  createdAt: string;
  permissions: UserPermissions;
}
