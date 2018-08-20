import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MyProjectsComponent } from "./components/my-projects/my-projects.component";
import { AppRoutingModule } from "../app-routing.module";
import { AddProjectComponent } from "./components/add-project/add-project.component";
import { EditProjectComponent } from "./components/edit-project/edit-project.component";
import { ViewProjectComponent } from "./components/view-project/view-project.component";
import { DeleteProjectComponent } from "./components/delete-project/delete-project.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MyProjectsComponent,
    AddProjectComponent,
    EditProjectComponent,
    ViewProjectComponent,
    DeleteProjectComponent
  ],
  exports: [MyProjectsComponent]
})
export class ProjectModule {}
