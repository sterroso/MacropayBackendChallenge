export const USER_FIRST_NAME_MIN_LENGTH = 1;
export const USER_LAST_NAME_MIN_LENGTH = 1;
export const USER_EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const USER_PASSWORD_REGEX =
  /^(?=.+[a-zA-ZñÑáÁéÉíÍóÓúÚäÄëËïÏöÖüÜâÂêÊîÎôÔûÛàÀèÈìÌòÒùÙ])(?=.+\d)(?=.+[ #@"'$%&/¿¡!:;,<>_~¬°\=\?\(\)\{\}\[\]\|\+\*\-\t\.\^\\])(?=.{8,})/;
export const USER_MIN_AGE = 18;
export const USER_PASSWORD_HASH_ROUNDS = 10;
export const USER_ERROR_MESSAGES = {
  NO_EMAIL: 'Debe proporcionar un email para el usuario.',
  EMAIL_FORMAT: 'El email del usuario no tiene un formato válido.',
  NO_PASSWORD: 'Debe proporcionar una contraseña para el usuario.',
  PASSWORD_FORMAT: 'La contraseña debe tener, por lo menos, 8 caracteres, incluyendo al menos un número y un caracter especial.',
  NO_FIRST_NAME: 'Debe proporcional el/los nombre(s) de pila del usuario.',
  FIRST_NAME_MIN_LENGTH: `El/los nombre(s) de pila del usuario deben tener, por lo menos, ${USER_FIRST_NAME_MIN_LENGTH} caracteres.`,
  NO_LAST_NAME: 'Debe proporcionar el/los apellido(s) del usuario.',
  LAST_NAME_MIN_LENGTH: `El/los apellido(s) del usuario deben tener, por lo menos, ${USER_LAST_NAME_MIN_LENGTH} caracteres.`,
  NO_BIRTH_DATE: 'Debe proporcionar la fecha de nacimiento del usuario.',
  MAX_BIRTH_DATE: `Para registrarse, el usuario debe tener, por lo menos, ${USER_MIN_AGE} años cumplidos.`,
  BIRTH_DATE_FORMAT: 'La fecha de nacimiento del usuario no es válida.',
}
