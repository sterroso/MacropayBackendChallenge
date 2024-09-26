export default class GetUserDTO {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.dateOfBirth = data.dateOfBirth;
  }

  get age() {
    if (this.dateOfBirth) {
      const dateOfBirth = new Date(this.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dateOfBirth.getFullYear();

      age -= today.getMonth() < dateOfBirth.getMonth() ? 1 :
        today.getMonth() > dateOfBirth.getMonth() ? 0 :
        today.getDate() < dateOfBirth.getDate() ? 1 : 0;

      return age;
    }

    return undefined;
  }
}
