import {Role} from "../enum/Role.enum";

export interface Utilisateur {
  id: number
  login: string
  password: string
  nom: string
  prenom: string
  role: Role
}
