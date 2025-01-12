export type ProjectType = {
  id: string;
  name: string;
  description: string | null;
  ownerId: string;
  status: ProjectStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type UserType = {
  name: string;
  id: string;
  clerkUserId: string;
  email: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UserProjectType = {
  id: string;
  projectId: string;
  role: UserRoleEnum;
  userId: string;
};

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
  MANAGER = "MANAGER",
  DEVELOPER = "DEVELOPER",
  TESTER = "TESTER",
}

export enum ProjectStatusEnum {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  HOLD = "HOLD",
}
