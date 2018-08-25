import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Issue } from "../../../../core/models/issue";
import { IssueService } from "../../../../core/services/issue.service";
import { Status } from "../../../../core/models/status.enum";

@Component({
  selector: "app-view-issue",
  templateUrl: "./view-issue.component.html",
  styleUrls: ["./view-issue.component.scss"]
})
export class ViewIssueComponent implements OnInit {
  public issueId: string;
  public projectId: string;
  public issue: Issue;
  public status: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.issueId = params["id"];
      this.projectId = params["projectId"];
      this.issueService.getIssueByUid(params["id"]).subscribe(is => {
        this.issue = is;
        this.status = Status[is.status];
      });
    });
  }
}
