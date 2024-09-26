import bcrypt from "bcryptjs";

import prisma from "../../prismaClient.js";
import GetUserDTO from "../models/dtos/get-user.dto.js";
import { USER_PASSWORD_HASH_ROUNDS } from "../../common/constants/user.constants.js";

const { hash } = bcrypt;

export default class UserService {
  constructor() {
    this.prisma = prisma;
  }

  async findMany() {
    try {
      const users = await this.prisma.user.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });

      if (users && users.length > 0) {
        return users.map((user) => new GetUserDTO(user));
      }

      return [];
    } catch (error) {
      console.error('UserService [v2] findMany error', error.message);
      throw error;
    }
  }

  async findOneById(id) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id, deletedAt: null }
      });

      return user ? new GetUserDTO(user) : null;
    } catch (error) {
      console.error('UserService [v2] findOneById error', error.message);
      throw error;
    }
  }

  async create(createDto) {
    try {
      const hashedPassword = await hash(createDto.password, USER_PASSWORD_HASH_ROUNDS);
      const newUser = await this.prisma.user.create({
        data: {
          ...createDto,
          password: hashedPassword,
        }
      });

      return newUser ? new GetUserDTO(newUser) : null;
    } catch (error) {
      console.error('USerService [v2] create error', error.message);
      throw error;
    }
  }

  async update(id, updateDto) {
    let updatedUser;
    try {
      if (updateDto.password) {
        const hashedPassword = await hash(updateDto.password, USER_PASSWORD_HASH_ROUNDS);
        updatedUser = await this.prisma.user.update({
          where: { id, deletedAt: null },
          data: {
            ...updateDto,
            password: hashedPassword,
          }
        });
      } else {
        updatedUser = await this.prisma.user.update({
          where: { id, deletedAt: null },
          data: {
            ...updateDto,
          }
        });
      }

      return updatedUser.id ? new GetUserDTO(updatedUser) : null;
    } catch (error) {
      console.error('UserService [v2] update error', error.message);
      throw error;
    }
  }

  async remove(id) {
    try {
      const deletedUser = await this.prisma.user.update({
        where: { id, deletedAt: null },
        data: { deletedAt: new Date() },
      });

      return deletedUser ? true : false;
    } catch (error) {
      console.error('UserService [v2] remove error', error.message);
      throw error;
    }
  }
}
