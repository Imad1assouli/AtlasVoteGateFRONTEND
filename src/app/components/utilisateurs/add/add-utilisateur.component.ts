import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateurs/utilisateur.service';

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UtilisateurService,
    private router: Router
  ) {
    this.addForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.userService.addUtilisateur(this.addForm.value).subscribe({
        next: () => {
          this.router.navigate(['/utilisateurs']);
        },
        error: (err) => {
          console.error('Error adding user:', err);
        }
      });
    }
  }
}
