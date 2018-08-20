import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class AnnonymousGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(["/projects/my"]);
    this.snackBar.open("You are already authenticated", "⚠", {
      duration: 3000
    });
    return false;
  }
}
