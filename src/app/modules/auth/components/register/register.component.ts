import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../../core/models/user";
import { AuthService } from "../../../../core/services/auth.service";
import { PasswordValidation } from "../../../../core/validators/passwordValidation";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  public user: User;
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        email: ["", [Validators.required, Validators.pattern(/^.+@.+\..+$/)]],
        password: [
          "",
          [Validators.required, Validators.pattern("^[A-Za-z0-9]{4,16}$")]
        ],
        confirmPassword: ["", [Validators.required]]
      },
      {
        validator: PasswordValidation.MatchPassword
      }
    );
    this.auth.user$.subscribe(user => (this.user = user));
  }

  onSubmit() {
    console.log(this.registerForm.value);

    this.auth.register(
      this.registerForm.get("email").value,
      this.registerForm.get("password").value
    );
  }

  get email() {
    return this.registerForm.get("email");
  }

  get password() {
    return this.registerForm.get("password");
  }

  get confirmPassword() {
    return this.registerForm.get("confirmPassword");
  }
}
