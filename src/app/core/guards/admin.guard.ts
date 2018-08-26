import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe<boolean>(
      switchMap(usr => {
        console.log(usr);
        if (usr && usr.roles.admin) {
          return of(true);
        } else {
          this.snackBar.open(
            "You aren ot alloed in the special admin zone!",
            "⚠️",
            {
              duration: 3000
            }
          );
          this.router.navigate(["/"]);
          return of(false);
        }
      })
    );
  }
}
