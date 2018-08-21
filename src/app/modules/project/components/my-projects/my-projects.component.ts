import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../../../core/services/project.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";
import { User } from "../../../../core/models/user";
import { Observable } from "rxjs";
import { Project } from "../../../../core/models/project";

@Component({
  selector: "app-my-projects",
  templateUrl: "./my-projects.component.html",
  styleUrls: ["./my-projects.component.scss"]
})
export class MyProjectsComponent implements OnInit {
  public user: User;
  public ownedProjects$: Observable<Project[]>;
  public sharedProjects$: Observable<Project[]>;
  constructor(
    private auth: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.ownedProjects$ = this.projectService.getOwnedProjectsForUser(
          user.uid
        );
        this.sharedProjects$ = this.projectService.getSharedProjectsForUser(
          user.email
        );
      }
    });
  }
}
