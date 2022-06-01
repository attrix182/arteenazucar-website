import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: firebase.User;

  currentUser: any;
  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user) => (this.isLogged = user));
  }

  async onLogin(user: any) {
    const result = await this.afAuth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        localStorage.setItem('token', userCredential.user.uid);
        return true;
      });
    return result;
  }

  async onRegister(user: any) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(
        user.correo,
        user.clave
      );
    } catch (error) {

      return error;
    }
  }

  GetCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  LogOutCurrentUser() {
    localStorage.removeItem('token');
    this.afAuth.signOut();
  }
}