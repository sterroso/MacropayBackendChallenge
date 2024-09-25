import {
  USER_MIN_FIRST_NAME_LENGTH,
  USER_MIN_LAST_NAME_LENGTH,
  USER_EMAIL_REGEX,
  USER_PASSWORD_REGEX,
} from "../../../common/constants/user.constants.js";

export default class CreateUserDTO {
  constructor(data) {
    this.email = data.email ? data.email.trim() : undefined;
    this.password = data.password;
    this.firstName = data.firstName ? data.firstName.trim() : undefined;
    this.lastName = data.lastName ? data.lastName.trim() : undefined;
  }

  static async validateUserInput(userDto) {
    const errors = [];

    if (!userDto.email) {
      errors.push("Debe proporcionar un email del usuario.");
    }

    if (!USER_EMAIL_REGEX.test(userDto.email.trim())) {
      errors.push("Debe proporcionar un email válido.");
    }

    if (!userDto.password) {
      errors.push("Debe proporcionar una contraseña.");
    }

    if (!USER_PASSWORD_REGEX.test(userDto.password)) {
      errors.push(
        "La contraseña debe contener por lo menos 8 caracteres, por lo menos 1 número y 1 caracter especial."
      );
    }

    if (!userDto.firstName) {
      errors.push("Debe proporcional el/los nombre(s) de pila del usuario.");
    }

    if (userDto.firstName.trim().length < USER_MIN_FIRST_NAME_LENGTH) {
      errors.push(
        `El/los nombre(s) de pila del usuario deben contener al menos ${USER_MIN_FIRST_NAME_LENGTH} caracteres.`
      );
    }

    if (!userDto.lastName) {
      errors.push("Debe proporcional el/los apellido(s) del usuario.");
    }

    if (userDto.lastName.trim().length < USER_MIN_LAST_NAME_LENGTH) {
      errors.push(
        `El/los apellido(s) del usuario deben contener al menos ${USER_MIN_LAST_NAME_LENGTH} caracteres.`
      );
    }

    return errors;
  }
}
