import {Utilisateur} from "./Utilisateur.model";

export interface Vote {
  id: number;
  user_id: number;
  electoral_party_id: number;
  timestamp: Date;
}
