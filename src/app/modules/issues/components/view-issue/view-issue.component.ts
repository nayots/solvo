import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-view-issue",
  templateUrl: "./view-issue.component.html",
  styleUrls: ["./view-issue.component.scss"]
})
export class ViewIssueComponent implements OnInit {
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
