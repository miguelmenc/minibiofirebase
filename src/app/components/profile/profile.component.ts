import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Minibio } from 'src/app/shared/models/minibio';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MinibioService } from 'src/app/shared/services/minibio.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  misPost: Array<Minibio> = [];
  user: any;

  constructor(
    private authService: AuthService,
    private firestore: AngularFirestore,
    private minibioService: MinibioService,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.userData();
    this.loadData();
    
  }

  logout() {
    this.authService.signOut();
  }

  loadData() {
    this.minibioService.loadMinibio().subscribe((data) => {
      this.misPost = [];

      data.forEach((doc: any) => {
        let myPost: Minibio = doc.data();
        myPost.uid = doc.id;
        this.misPost.push(myPost);
      });
    });
  }

  deleteData(id: any){
    this.minibioService.deleteMinibio(id).then(success => {
      this.notifier.notify('success', "Se ha borrado correctamente!"),
      this.loadData()
    }).catch(error => {
      this.notifier.notify('error', "Ha habido un problama al borrar!")
    })
  }

  

}


