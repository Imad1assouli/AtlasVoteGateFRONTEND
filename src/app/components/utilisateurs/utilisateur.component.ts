import { Component, OnInit } from '@angular/core';
import { Utilisateur } from "../../model/Utilisateur.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilisateurService } from "../../services/utilisateurs/utilisateur.service";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit  {

  editUtilisateurFormGroup!: FormGroup;
  utilisateur!: Utilisateur;
  id: any;
  utilisateurs: any;

  constructor(private fb: FormBuilder, public utilisateurService: UtilisateurService, private route: ActivatedRoute, private router: Router) { //route : pour obtient le id qui est dans la route{ }
  }
  ngOnInit(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe({
      next: (data: Utilisateur[]) => {
        this.utilisateurs = data; // Assigner les données retournées à utilisateurs
      },
      error: (err) => {
        console.log(err); // Gérer les erreurs si nécessaire
      }
    });
  }
  
  Edit() {
    this.router.navigateByUrl("/navbar/edit-utilisateur/"+1);
  }

  onDelete(id:number) {
    this.utilisateurService.deleteUtilisateur(id).subscribe({
      next: (data) => {
        this.router.navigateByUrl("/navbar/utilisateurs");
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  addUtilisateur() {
    this.router.navigate(['/utilisateurs/add']);
  }
}
