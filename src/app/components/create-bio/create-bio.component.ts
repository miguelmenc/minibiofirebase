import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { MinibioService } from 'src/app/shared/services/minibio.service';
import { Minibio } from 'src/app/shared/models/minibio';

@Component({
  selector: 'app-create-bio',
  templateUrl: './create-bio.component.html',
  styleUrls: ['./create-bio.component.scss'],
})
export class CreateBioComponent implements OnInit {
  user: any;
  formulario: FormGroup;
  isEditMode: boolean = false;
  misPost: Array<Minibio> = [];
  bioId: any = "";


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private notifier: NotifierService,
    private minibioService: MinibioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      urlimagen: ['', Validators.required],
      tituloEnlace1: ['', Validators.required],
      urlenlace1: ['', Validators.required],
      tituloEnlace2: ['', Validators.required],
      urlenlace2: ['', Validators.required],
      tituloEnlace3: ['', Validators.required],
      urlenlace3: ['', Validators.required],
    });

    this.bioId = this.route.snapshot.paramMap.get('id') // Leemos el parametro de la url
    if(this.bioId) { // si está en modo edicion
      this.isEditMode = true

      this.minibioService.getMiniBio(this.bioId).subscribe(data => {

        const minibio: any = data.data()
        minibio.id = data.id

        this.formulario.patchValue(minibio)

      })
    }
  }

  ngOnInit(): void {
    this.user = this.authService.userData();
  }

  logout() {
    this.authService.signOut();
  }

  saveData() {
    if (this.formulario.invalid) {
      console.error('Ojo, no es valido');
      return;
    }
    console.log('Guardar minibio', this.formulario.value);
    const miniBio: Minibio = {
      titulo: this.formulario.controls.titulo.value,
      descripcion: this.formulario.controls.descripcion.value,
      urlimagen: this.formulario.controls.urlimagen.value,
      tituloEnlace1: this.formulario.controls.tituloEnlace1.value,
      urlenlace1: this.formulario.controls.urlenlace1.value,
      tituloEnlace2: this.formulario.controls.tituloEnlace2.value,
      urlenlace2: this.formulario.controls.urlenlace2.value,
      tituloEnlace3: this.formulario.controls.tituloEnlace3.value,
      urlenlace3: this.formulario.controls.urlenlace3.value,
    };

    this.minibioService
      .createMinibio(miniBio)
      .then((success) => {
        this.notifier.notify('success', 'Todo ok!');
      })
      .catch((error) => {
        this.notifier.notify('error', 'Ups, ha ocurrido un error');
      });
  }

  getData(){
    
  }

  editData(){
    if(this.formulario.invalid) {
      this.notifier.notify('error', 'Los datos no son válidos');
      return
    }

    console.log("Actualizar minibio", this.formulario.value)

    this.minibioService.updateMinibio(this.bioId, this.formulario.value).then(success => {
      this.notifier.notify('success', "Actualizado!")
    }).catch(error =>  {
      this.notifier.notify('error', 'Ups, ha ocurrido un error');
    })
  }

}
