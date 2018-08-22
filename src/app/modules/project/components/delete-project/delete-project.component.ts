import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../../core/services/auth.service";
import { ProjectService } from "../../../../core/services/project.service";
import { MatSnackBar } from "@angular/material";
import { User } from "../../../../core/models/user";
import { Project } from "../../../../core/models/project";

@Component({
  selector: "app-delete-project",
  templateUrl: "./delete-project.component.html",
  styleUrls: ["./delete-project.component.scss"]
})
export class DeleteProjectComponent implements OnInit {
  public user: User;
  public project: Project;
  constructor(
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => (this.user = user));
    this.activatedRoute.params.subscribe(params => {
      this.projectService.getProjectByUid(params["id"]).subscribe(pr => {
        if (this.user && pr.ownerId !== this.user.uid) {
          this.snackBar.open("You are not the owner of this project :(", "⚠️", {
            duration: 3000
          });
          this.router.navigate(["/projects/my"]);
          return;
        }

        this.project = pr;
      });
    });
  }

  deleteProj() {
    this.projectService
      .deleteProjectByUid(this.project.uid)
      .then(r => {
        this.snackBar.open("Project deleted", "⭐", {
          duration: 3000
        });
        this.router.navigate(["/projects/my"]);
      })
      .catch(err => {
        console.log(err);
        this.snackBar.open("Error deleting this project :(", "⚠️", {
          duration: 3000
        });
        this.router.navigate(["/projects/my"]);
      });
  }
}
