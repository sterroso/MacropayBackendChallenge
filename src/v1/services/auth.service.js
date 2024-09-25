import bcrypt from "bcryptjs";

import prisma from "../../prismaClient.js";
import GetUserDto from "../models/dtos/get-user.dto.js";

const { compare } = bcrypt;

export default class AuthService {
  constructor() {
    this.prisma = prisma;
  }

  async login(credentials) {
    const { email, password } = credentials;

    try {
      const user = await this.prisma.user.findUnique({
        where: { email, deletedAt: null },
      });

      if (!user) {
        return [false, null];
      }

      const match = await compare(password, user.password);

      if (!match) {
        return [false, null];
      }

      const redactedUser = new GetUserDto(user);

      return [true, redactedUser];
    } catch (error) {
      throw error;
    }
  }
}
