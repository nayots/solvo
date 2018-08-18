import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
