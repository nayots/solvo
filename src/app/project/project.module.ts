import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyProjectsComponent } from "./my-projects/my-projects.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatBadgeModule } from "@angular/material/badge";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatBadgeModule,
    AppRoutingModule
  ],
  declarations: [MyProjectsComponent],
  exports: [MyProjectsComponent]
})
export class ProjectModule {}
