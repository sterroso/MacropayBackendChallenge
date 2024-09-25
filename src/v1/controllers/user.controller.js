import UserService from "../services/user.service.js";
import CreateUserDTO from "../models/dtos/create-user.dto.js";
import UpdateUserDTO from "../models/dtos/update-user.dto.js";

const userService = new UserService();

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.findMany();

    if (!users) {
      return res
        .status(404)
        .json({
          status: "error",
          error: "No se encontraron usuarios en la base de datos.",
        });
    }

    res.status(200).json({ status: "success", users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userService.findOneById(userId);

    if (!user) {
      return res
        .status(404)
        .json({
          status: "error",
          error: `No se encontró el usuario con ID '${userId}'.`,
        });
    }

    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { body } = req;

  try {
    const createDto = new CreateUserDTO(body);
    const errors = await CreateUserDTO.validateUserInput(createDto);

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", errors });
    }

    const newUser = await userService.create(createDto);

    res.status(201).json({ status: "success", newUser });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { body } = req;
  const { userId } = req.params;

  try {
    const updateDto = new UpdateUserDTO(body);
    const errors = await UpdateUserDTO.validateUserInput(updateDto);

    if (errors.length > 0) {
      return res.status(400).json({ status: "error", errors });
    }

    const updatedUser = await userService.update(userId, updateDto);

    res.status(200).json({ status: "success", updatedUser });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const existingUser = await userService.findOneById(userId);

    if (!existingUser) {
      return res
        .status(404)
        .json({
          status: "error",
          error: `No se encontró el usuario con ID '${userId}'.`,
        });
    }

    const deletedUser = await userService.remove(userId);

    if (!deletedUser) {
      return res
        .status(400)
        .json({ status: "error", error: "No se pudo eliminar el usuario." });
    }

    res.status(204).json({ status: "success", deletedUser });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
