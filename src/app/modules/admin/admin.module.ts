import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminViewComponent } from "./components/admin-view/admin-view.component";
import { MaterialModule } from "../material/material.module";
import { AppRoutingModule } from "../app-routing.module";
import { ChangeUserRoleComponent } from './components/change-user-role/change-user-role.component';

@NgModule({
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  declarations: [AdminViewComponent, ChangeUserRoleComponent]
})
export class AdminModule {}
