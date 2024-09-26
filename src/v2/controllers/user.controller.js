import CreateUserDTO from "../models/dtos/create-user.dto.js";
import UpdateUserDTO from "../models/dtos/update-user.dto.js";
import UserService from "../services/user.service.js";

const service = new UserService();

export const getAllUsers = async (req, res) => {
  try {
    const users = await service.findMany();

    if (!users || users.length === 0) {
      return res.status(404).json({ status: 'Error', error: 'No se encontraron usuarios en la base de datos.' });
    }

    res.status(200).json({ status: 'Success', users });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
      stack: error.stack,
    });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await service.findOneById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        error: `No se encontró el usuario con ID '${userId}' en la Base de Datos.`,
      });
    }

    res.status(200).json({ status: 'Success', user });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
      stack: error.stack,
    });
  }
};

export const createUser = async (req, res) => {
  const { body } = req;

  try {
    const errors = await CreateUserDTO.validateUserInput(body);

    if (errors) {
      return res.status(400).json({ status: 'Error', errors });
    }

    const createDto = new CreateUserDTO(body);

    const newUser = await service.create(createDto);

    if (!newUser) {
      return res.status(500).json({
        status: 'Error',
        error: 'No pudo crearse el usuario en la Base de Datos.'
      });
    }

    res.status(201).json({ status: 'Success', newUser });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
      stack: error.stack,
    });
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  try {
    const errors = await UpdateUserDTO.validateUserInput(body);

    if (errors.length > 0) {
      return res.status(400).json({ status: 'Error', errors });
    }

    const updateDto = new UpdateUserDTO(body);

    const updatedUser = await service.update(userId, updateDto);

    if (!updatedUser) {
      return res.status(404).json({
        status: 'Error',
        error: `No se encontró el usuario con ID '${userId}' en la Base de Datos.`,
      });
    }

    res.status(200).json({ status: 'Success', updatedUser });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
      stack: error.stack,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const wasDeleted = await service.remove(userId);

    if (!wasDeleted) {
      return res.status(404).json({
        status: 'Error',
        error: `No se encontró el usuario con ID '${userId}' en la Base de Datos.`,
      });
    }

    res.status(204);
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message,
      stack: error.stack,
    });
  }
};
