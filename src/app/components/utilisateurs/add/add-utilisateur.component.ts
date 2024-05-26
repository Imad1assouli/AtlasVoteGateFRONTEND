import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateurs/utilisateur.service';
import { Utilisateur } from '../../../model/Utilisateur.model';
import { Role } from '../../../enum/Role.enum';


@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
})
export class AddUtilisateurComponent implements OnInit {

  editUtilisateurFormGroup!: FormGroup;
  utilisateur: Utilisateur = {
    nom: '',
    prenom: '',
    login: '',
    password: '',
    role: Role.ROLE_ADMINISTRATEUR,
    id: 0
  };
  id: any;

  constructor(
    private fb: FormBuilder,
    private userService: UtilisateurService,
    private router: Router
  ){}
  ngOnInit(): void {
  }

  onSubmit(): void {

      this.userService.addUtilisateur(this.utilisateur).subscribe({
        next: () => {
          this.router.navigate(['/utilisateurs']);
        },
        error: (err) => {
          console.error('Error adding user:', err);
        }
      });
    }

}


