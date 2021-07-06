import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Minibio } from '../models/minibio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MinibioService {
  constructor(
    private fireStore: AngularFirestore,
    private authService: AuthService
  ) {}

  createMinibio(data: Minibio) {
    const uid = this.authService.userData().uid;
    return this.fireStore
      .collection('users')
      .doc(uid)
      .collection('minibios')
      .add(data);
  }

  loadMinibio() {
    const uid = this.authService.userData().uid;
    return this.fireStore
      .collection('users')
      .doc(uid)
      .collection('minibios')
      .get();
  }

  deleteMinibio(id: string) {
    const uid = this.authService.userData().uid;
    return this.fireStore
      .collection('users')
      .doc(uid)
      .collection('minibios').doc(id).delete();
  }

  getMiniBio(id: string) {
    const uid = this.authService.userData().uid
    return this.fireStore.collection('users').doc(uid).collection('minibios').doc(id).get()
  }

  updateMinibio(id: string, data: any) {
    const uid = this.authService.userData().uid
    return this.fireStore.collection('users').doc(uid).collection('minibios').doc(id).update(data)
  }

}
