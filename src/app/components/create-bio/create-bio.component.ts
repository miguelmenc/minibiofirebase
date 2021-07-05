import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-create-bio',
  templateUrl: './create-bio.component.html',
  styleUrls: ['./create-bio.component.scss']
})
export class CreateBioComponent implements OnInit {

  user: any
  formulario: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.formulario = this.fb.group({
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      urlimagen: ["", [Validators.required]],
      tituloEnlace1: ["", [Validators.required]],
      urlenlace1: ["", [Validators.required]],
      tituloEnlace2: ["", [Validators.required]],
      urlenlace2: ["", [Validators.required]],
      tituloEnlace3: ["", [Validators.required]],
      urlenlace3: ["", [Validators.required]]
    })
   }

  ngOnInit(): void {
    this.user = this.authService.userData()
  }

  logout(){
    this.authService.signOut()
  }
}
