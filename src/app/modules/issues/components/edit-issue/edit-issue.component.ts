import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-issue",
  templateUrl: "./edit-issue.component.html",
  styleUrls: ["./edit-issue.component.scss"]
})
export class EditIssueComponent implements OnInit {
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
