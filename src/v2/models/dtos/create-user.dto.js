import {
  USER_EMAIL_REGEX,
  USER_ERROR_MESSAGES,
  USER_FIRST_NAME_MIN_LENGTH,
  USER_LAST_NAME_MIN_LENGTH,
  USER_MIN_AGE,
  USER_PASSWORD_REGEX,
} from "../../../common/constants/user.constants.js";

export default class CreateUserDTO {
  constructor(data) {
    this.email = data.email ? data.email.trim() : undefined;
    this.password = data.password;
    this.firstName = data.firstName ? data.firstName.trim() : undefined;
    this.lastName = data.lastName ? data.lastName.trim() : undefined;
    this.dateOfBirth = data.dateOfBirth ? data.dateOfBirth.trim() : null;
  }

  static async validateUserInput(userDto) {
    const errors = [];

    if (!userDto.email) {
      errors.push(USER_ERROR_MESSAGES.NO_EMAIL);
    } else {
      if (!USER_EMAIL_REGEX.test(userDto.email)) {
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

    if (!userDto.dateOfBirth) {
      errors.push(USER_ERROR_MESSAGES.NO_BIRTH_DATE);
    } else {
      const dateOfBirth = new Date(userDto.dateOfBirth);
      if (dateOfBirth.toString() === "Invalid Date") {
        errors.push(USER_ERROR_MESSAGES.BIRTH_DATE_FORMAT);
      } else {
        const today = new Date();
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        age -=
          today.getMonth() < dateOfBirth.getMonth()
            ? 1
            : today.getMonth() > dateOfBirth.getMonth()
              ? 0
              : today.getDate() < dateOfBirth.getDate()
                ? 1
                : 0;

        if (age < USER_MIN_AGE) {
          errors.push(USER_ERROR_MESSAGES.MAX_BIRTH_DATE);
        }
      }
    }

    return errors;
  }
}
