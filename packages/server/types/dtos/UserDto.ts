export type CreateUserDto = {
   name: string;
   email: string;
   password: string;
};
export type UpdateUserDto = {
   name?: string;
   email?: string;
   password?: string;
};
export type UserDto = {
   id: number;
   name: string;
   email: string;
   createdAt: Date;
   updatedAt: Date;
};
