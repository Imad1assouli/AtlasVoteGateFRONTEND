import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../../model/Utilisateur.model';
import { Role } from '../../../enum/Role.enum';
import { FormBuilder } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateurs/utilisateur.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUtilisateur(this.id).subscribe((data: Utilisateur) => this.utilisateur = data);

  }
  utilisateur: Utilisateur = {
    nom: '',
    prenom: '',
    login: '',
    password: '',
    role: Role.ROLE_ADMINISTRATEUR,
    id: 0
  };
  id!:number;
  constructor(
    private fb: FormBuilder,
    private userService: UtilisateurService,
    private router: Router,
    private route: ActivatedRoute
  ){}
onSubmit() {
  this.userService.updateUtilisateur(this.id, this.utilisateur).subscribe(
    (data) => {
      console.log(data);
      this.gotoUsersList();
    },
    (error) => {
      console.error('Error updating user:', error);
    }
  );
}
  gotoUsersList() {
    this.router.navigate(['/utilisateurs']);
  }

}
