import { User } from "./../../../../core/models/user";
import { AuthService } from "./../../../../core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public user: User;
  public loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.router.navigate(["/projects/my"]);
      }
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.auth
      .login(
        this.loginForm.get("email").value,
        this.loginForm.get("password").value
      )
      .then(r => console.log(r));
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
