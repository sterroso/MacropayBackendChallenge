import jwt from "jsonwebtoken";
import AuthService from "../services/auth.service.js";

import { configDotenv } from "dotenv";

configDotenv();

const auth = new AuthService();

export const login = async (req, res) => {
  const { body } = req;

  try {
    const [success, user] = await auth.login(body);

    if (!success) {
      return res.
        status(404).
        json({
          status: 'Not found',
          error: 'No se encontró usuario con las credenciales proporcionadas.'
        });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        status: 'Error',
        error: 'Error de configuración de la llave de encriptación.',
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        status: "Success",
        user,
      });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
      stack: error.stack,
    });
  }
};
