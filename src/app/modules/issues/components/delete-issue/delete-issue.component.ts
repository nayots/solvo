import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Issue } from "../../../../core/models/issue";
import { IssueService } from "../../../../core/services/issue.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-delete-issue",
  templateUrl: "./delete-issue.component.html",
  styleUrls: ["./delete-issue.component.scss"]
})
export class DeleteIssueComponent implements OnInit {
  public issueId: string;
  public projectId: string;
  public issue: Issue;
  constructor(
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.issueId = params["id"];
      this.projectId = params["projectId"];
      this.issueService.getIssueByUid(params["id"]).subscribe(is => {
        this.issue = is;
      });
    });
  }

  onConfirm() {
    this.issueService
      .deleteIssueByUid(this.issueId, this.projectId)
      .then(() => {
        this.snackBar.open("Issue deleted", "⭐", {
          duration: 3000
        });
        this.router.navigate([`/projects/view/${this.projectId}`]);
      });
  }
}
