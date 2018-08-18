import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-delete-project",
  templateUrl: "./delete-project.component.html",
  styleUrls: ["./delete-project.component.scss"]
})
export class DeleteProjectComponent implements OnInit {
  public projectId: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params["id"];
    });
  }
}
