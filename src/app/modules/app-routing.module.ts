import { MyProjectsComponent } from "./project/components/my-projects/my-projects.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddProjectComponent } from "./project/components/add-project/add-project.component";
import { LoginComponent } from "./auth/components/login/login.component";
import { RegisterComponent } from "./auth/components/register/register.component";
import { EditProjectComponent } from "./project/components/edit-project/edit-project.component";
import { ViewProjectComponent } from "./project/components/view-project/view-project.component";
import { DeleteProjectComponent } from "./project/components/delete-project/delete-project.component";
import { NotFoundComponent } from "../shared/components/not-found/not-found.component";
import { AddIssueComponent } from "./issues/components/add-issue/add-issue.component";
import { EditIssueComponent } from "./issues/components/edit-issue/edit-issue.component";
import { DeleteIssueComponent } from "./issues/components/delete-issue/delete-issue.component";
import { ViewIssueComponent } from "./issues/components/view-issue/view-issue.component";
import { LandingComponent } from "../shared/components/landing/landing.component";

const routes: Routes = [
  {
    path: "projects",
    children: [
      { path: "my", component: MyProjectsComponent },
      { path: "add", component: AddProjectComponent },
      { path: "edit/:id", component: EditProjectComponent },
      { path: "view/:id", component: ViewProjectComponent },
      { path: "delete/:id", component: DeleteProjectComponent }
    ]
  },
  {
    path: "issues",
    children: [
      { path: ":projectId/add", component: AddIssueComponent },
      { path: ":projectId/edit/:id", component: EditIssueComponent },
      { path: ":projectId/view/:id", component: ViewIssueComponent },
      { path: ":projectId/delete/:id", component: DeleteIssueComponent }
    ]
  },
  {
    path: "auth",
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent }
    ]
  },
  { path: "", component: LandingComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
