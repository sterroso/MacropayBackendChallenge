export const USER_MIN_FIRST_NAME_LENGTH = 1;
export const USER_MIN_LAST_NAME_LENGTH = 1;
export const USER_EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const USER_PASSWORD_REGEX =
  /^(?=.+[a-zA-ZñÑáÁéÉíÍóÓúÚäÄëËïÏöÖüÜâÂêÊîÎôÔûÛàÀèÈìÌòÒùÙ])(?=.+\d)(?=.+[ #@"'$%&/¿¡!:;,<>_~¬°\=\?\(\)\{\}\[\]\|\+\*\-\t\.\^\\])(?=.{8,})/;
export const USER_PASSWORD_HASH_ROUNDS = 10;
