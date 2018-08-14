import { MyProjectsComponent } from "./project/my-projects/my-projects.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "projects",
    children: [
      { path: "my", component: MyProjectsComponent },
      { path: "*", redirectTo: "/" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
