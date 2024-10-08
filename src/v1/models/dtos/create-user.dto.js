import {
  USER_EMAIL_REGEX,
  USER_ERROR_MESSAGES,
  USER_FIRST_NAME_MIN_LENGTH,
  USER_LAST_NAME_MIN_LENGTH,
  USER_PASSWORD_REGEX,
} from "../../../common/constants/user.constants.js";

export default class CreateUserDTO {
  constructor(data) {
    this.email = data.email.trim();
    this.password = data.password;
    this.firstName = data.firstName.trim();
    this.lastName = data.lastName.trim();
  }

  static async validateUserInput(userDto) {
    const errors = [];

    if (!userDto.email) {
      errors.push(USER_ERROR_MESSAGES.NO_EMAIL);
    } else {
      if (!USER_EMAIL_REGEX.test(userDto.email.trim())) {
        errors.push(USER_ERROR_MESSAGES.EMAIL_FORMAT);
      }
    }

    if (!userDto.password) {
      errors.push(USER_ERROR_MESSAGES.NO_PASSWORD);
    } else {
      if (!USER_PASSWORD_REGEX.test(userDto.password)) {
        errors.push(USER_ERROR_MESSAGES.PASSWORD_FORMAT);
      }
    }

    if (!userDto.firstName) {
      errors.push(USER_ERROR_MESSAGES.NO_FIRST_NAME);
    } else {
      if (userDto.firstName.trim().length < USER_FIRST_NAME_MIN_LENGTH) {
        errors.push(USER_ERROR_MESSAGES.FIRST_NAME_MIN_LENGTH);
      }
    }

    if (!userDto.lastName) {
      errors.push(USER_ERROR_MESSAGES.NO_LAST_NAME);
    } else {
      if (userDto.lastName.trim().length < USER_LAST_NAME_MIN_LENGTH) {
        errors.push(USER_ERROR_MESSAGES.LAST_NAME_MIN_LENGTH);
      }
    }

    return errors;
  }
}
