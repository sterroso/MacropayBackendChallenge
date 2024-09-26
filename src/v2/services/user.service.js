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
        return users.map((user) => {
          const safeUser = new GetUserDTO(user);
          return {
            ...safeUser,
            age: safeUser.age,
          }
        });
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

      if (!user) return null;

      const safeUser = new GetUserDTO(user);

      return {
        ...safeUser,
        age: safeUser.age,
      };
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

      if (!newUser) return null;

      const safeNewUser = new GetUserDTO(newUser);

      return {
        ...safeNewUser,
        age: safeNewUser.age,
      }
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

      if (!updatedUser) return null;

      const safeUpdatedUser = new GetUserDTO(updatedUser);

      return {
        ...safeUpdatedUser,
        age: safeUpdatedUser.age,
      }
    } catch (error) {
      console.error('UserService [v2] update error', error.message);
      throw error;
    }
  }

  async remove(id) {
    try {
      const existsUser = await this.prisma.user.findUnique({
        where: { id, deletedAt: null },
      });

      if (!existsUser) return false;

      await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      return true;
    } catch (error) {
      console.error('UserService [v2] remove error', error.message);
      throw error;
    }
  }
}
