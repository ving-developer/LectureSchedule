export class User {
  constructor(
    public username:string,
    public email: string,
    public password: string,
    public primeiroNome: string,
    public ultimoNome: string,
    public token: string
  ){ }
}
