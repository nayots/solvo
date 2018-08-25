import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProjectService } from "../../../../core/services/project.service";
import { Project } from "../../../../core/models/project";
import { Observable } from "rxjs";
import { Issue } from "../../../../core/models/issue";
import { IssueService } from "../../../../core/services/issue.service";

@Component({
  selector: "app-view-project",
  templateUrl: "./view-project.component.html",
  styleUrls: ["./view-project.component.scss"]
})
export class ViewProjectComponent implements OnInit {
  public projectId: string;
  public project: Project;
  public issues$: Observable<Issue[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projService: ProjectService,
    private issueService: IssueService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params["id"];
      this.projService
        .getProjectByUid(params["id"])
        .subscribe(pr => (this.project = pr));
      this.issues$ = this.issueService.getIssuesForProjectByUid(params["id"]);
    });
  }
}
