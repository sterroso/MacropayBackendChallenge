import {
  USER_FIRST_NAME_MIN_LENGTH,
  USER_LAST_NAME_MIN_LENGTH,
  USER_EMAIL_REGEX,
  USER_PASSWORD_REGEX,
  USER_ERROR_MESSAGES,
} from "../../../common/constants/user.constants.js";

export default class UpdateUserDTO {
  constructor(data) {
    if (data.email) {
      this.email = data.email.trim();
    }

    if (data.password) {
      this.password = data.password;
    }

    if (data.firstName) {
      this.firstName = data.firstName.trim();
    }

    if (data.lastName) {
      this.lastName = data.lastName.trim();
    }
  }

  static async validateUserInput(userDto) {
    const errors = [];

    if (
      userDto.email && 
      !USER_EMAIL_REGEX.test(userDto.email.trim())
    ) {
      errors.push(USER_ERROR_MESSAGES.EMAIL_FORMAT);
    }

    if (
      userDto.password &&
      !USER_PASSWORD_REGEX.test(userDto.password)
    ) {
      errors.push(USER_ERROR_MESSAGES.PASSWORD_FORMAT);
    }

    if (
      userDto.firstName &&
      userDto.firstName.trim().length < USER_FIRST_NAME_MIN_LENGTH
    ) {
      errors.push(USER_ERROR_MESSAGES.FIRST_NAME_MIN_LENGTH);
    }

    if (
      userDto.lastName &&
      userDto.lastName.trim().length < USER_LAST_NAME_MIN_LENGTH
    ) {
      errors.push(USER_ERROR_MESSAGES.LAST_NAME_MIN_LENGTH);
    }

    return errors;
  }
}
