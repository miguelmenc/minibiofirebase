import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'minibio-definitivo';
  items: Observable<any[]>;

  
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('users').valueChanges();
  }

}

