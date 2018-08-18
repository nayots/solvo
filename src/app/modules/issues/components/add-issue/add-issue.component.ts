import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-issue",
  templateUrl: "./add-issue.component.html",
  styleUrls: ["./add-issue.component.scss"]
})
export class AddIssueComponent implements OnInit {
  public projectId: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params["projectId"];
      console.log(params);
    });
  }
}
