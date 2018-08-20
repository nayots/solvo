import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "../models/user";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<User>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  register(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.router.navigate(["/auth/login"]);
        this.snackBar.open("Yay you are registered", "🚪", {
          duration: 3000
        });
      })
      .catch(err => {
        this.snackBar.open(err.message, "⚠", {
          duration: 3000
        });
      });
  }

  login(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.updateUserData(credential.user);
        this.router.navigate(["/projects/my"]);
        this.snackBar.open("Yay you are loged in", "🔑", {
          duration: 3000
        });
      })
      .catch(err => {
        this.snackBar.open(err.message, "⚠", {
          duration: 3000
        });
      });
  }

  signOut() {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate(["/"]);
        this.snackBar.open("Yay just loged out :( ", "🚪", {
          duration: 3000
        });
      })
      .catch(err => {
        this.snackBar.open(err.message, "⚠", {
          duration: 3000
        });
      });
  }

  isAuthenticated() {
    return this.afAuth.auth.currentUser;
  }

  public checkAuthorization(user: User): boolean {
    if (!user) {
      console.log("no user");
      return false;
    }
    return true;
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        member: true
      }
    };
    return userRef.set(data, { merge: true });
  }
}
