import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-delete-issue",
  templateUrl: "./delete-issue.component.html",
  styleUrls: ["./delete-issue.component.scss"]
})
export class DeleteIssueComponent implements OnInit {
  public issueId: string;
  public projectId: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.issueId = params["id"];
      this.projectId = params["projectId"];
    });
  }
}
