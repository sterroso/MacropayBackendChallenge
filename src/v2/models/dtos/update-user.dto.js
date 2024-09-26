import {
  USER_EMAIL_REGEX,
  USER_ERROR_MESSAGES,
  USER_FIRST_NAME_MIN_LENGTH,
  USER_LAST_NAME_MIN_LENGTH,
  USER_MIN_AGE,
  USER_PASSWORD_REGEX
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

    if (data.dateOfBirth) {
      this.dateOfBirth = data.dateOfBirth;
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

    if (userDto.dateOfBirth) {
      const dateOfBirth = new Date(userDto.dateOfBirth);

      if (dateOfBirth.toString() === "Ivalid Date") {
        errors.push(USER_ERROR_MESSAGES.BIRTH_DATE_FORMAT);
      } else {
        const today = new Date();
        let age = today.getFullYear() - dateOfBirth.getFullYear();

        age -= today.getMonth() < dateOfBirth.getMonth() ? 1 :
          today.getMonth() > dateOfBirth.getMonth() ? 0 : 
          today.getDate() < dateOfBirth.getDate() ? 1 : 0;

        if (age < USER_MIN_AGE) {
          errors.push(USER_ERROR_MESSAGES.MAX_BIRTH_DATE);
        }
      }
    }

    return errors;
  }
}
