export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
  createdAt: Date;
  updatedAt: Date;
}

export type NewUserData = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserData = Partial<Omit<User, "id" | "createdAt">>;

export class UserModule {
  private users: User[] = [];

  private generateId(): string {
    return `user_${Math.random().toString(36).slice(2, 10)}`;
  }

  createUser(data: NewUserData): User {
    const now = new Date();
    const user: User = {
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
      role: data.role || "user",
      ...data,
    };

    this.users.push(user);
    return user;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: string, updates: UpdateUserData): User | undefined {
    const user = this.getUserById(id);
    if (!user) {
      return undefined;
    }

    Object.assign(user, {
      ...updates,
      updatedAt: new Date(),
    });

    return user;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }

    this.users.splice(index, 1);
    return true;
  }

  listUsers(): User[] {
    return [...this.users];
  }
}
