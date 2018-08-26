import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Observable, of, from } from "rxjs";
import { User, Roles } from "../models/user";
import { AuthService } from "./auth.service";
import { switchMap, filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  public getAllUsers(): Observable<User[]> {
    return this.authService.user$.pipe<User[]>(
      switchMap(usr => {
        return this.afs
          .collection<User>("users")
          .valueChanges()
          .pipe(
            map(u => {
              return u.filter(cu => cu.uid !== usr.uid);
            })
          );
      })
    );
  }

  public changeAdminStatus(
    isAdmin: boolean,
    userUid: string
  ): Observable<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc<User>(
      `users/${userUid}`
    );
    const roles: Roles = {
      member: true,
      admin: isAdmin
    };
    const data: any = {
      roles: roles
    };
    return from(userRef.set(data, { merge: true }));
  }
}
