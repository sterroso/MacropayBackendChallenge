import bcrypt from "bcryptjs";
const { hash } = bcrypt;

import prisma from "../../prismaClient.js";
import { USER_PASSWORD_HASH_ROUNDS } from "../../common/constants/user.constants.js";
import GetUserDto from "../models/dtos/get-user.dto.js";

export default class UserService {
  constructor() {
    this.prisma = prisma;
  }

  async findMany() {
    try {
      const users = await this.prisma.user.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
      });

      if (users.length > 0) {
        return users.map((user) => new GetUserDto(user));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  }

  async findOneById(id) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id, deletedAt: null },
      });

      if (user) {
        return new GetUserDto(user);
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  }

  async create(createDto) {
    try {
      const hashedPassword = await hash(
        createDto.password,
        USER_PASSWORD_HASH_ROUNDS
      );
      const newUser = await this.prisma.user.create({
        data: {
          ...createDto,
          password: hashedPassword,
        },
      });

      if (newUser) {
        return new GetUserDto(newUser);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }

  async update(id, updateDto) {
    let updatedUser;
    try {
      if (updateDto.password) {
        const hashedPassword = await hash(
          updateDto.password,
          USER_PASSWORD_HASH_ROUNDS
        );
        updatedUser = await this.prisma.user.update({
          where: { id },
          data: {
            ...updateDto,
            password: hashedPassword,
          }
        });
      } else {
        updatedUser = await this.prisma.user.update({
          where: { id },
          data: updateDto,
        });
      }

      return new GetUserDto(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  }

  async remove(id) {
    try {
      const deletedUser = await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      return new GetUserDto(deletedUser);
    } catch (error) {
      console.error("Error deleting user:", error);
      return null;
    }
  }
}
