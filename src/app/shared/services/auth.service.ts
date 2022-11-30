import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = afAuth.authState;
  }

  loginByEmail(email: string, password: string ) {
    this.afAuth.signInWithEmailAndPassword(email,password).then(res => {
      localStorage.setItem('token', 'true');
      if(res.user?.emailVerified == false) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/verify-email']);
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  logout() {
    this.afAuth.signOut();
  }
}
