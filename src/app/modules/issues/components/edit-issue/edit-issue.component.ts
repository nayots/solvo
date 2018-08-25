import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Issue } from "../../../../core/models/issue";
import { IssueService } from "../../../../core/services/issue.service";
import { MatSnackBar } from "@angular/material";
import { Status } from "../../../../core/models/status.enum";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-issue",
  templateUrl: "./edit-issue.component.html",
  styleUrls: ["./edit-issue.component.scss"]
})
export class EditIssueComponent implements OnInit {
  public issueId: string;
  public projectId: string;
  public issue: Issue;
  public issueForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.issueId = params["id"];
      this.projectId = params["projectId"];
      this.issueService
        .currentUserHasIssueRights(this.projectId)
        .subscribe(hasRights => {
          if (!hasRights) {
            this.snackBar.open(
              "You are not the owner or a member of the project :(",
              "⚠️",
              {
                duration: 3000
              }
            );
            this.router.navigate(["/projects/my"]);
          }
        });
      this.issueService.getIssueByUid(params["id"]).subscribe(is => {
        this.issue = is;
        this.status.setValue(Status[is.status]);
        this.title.setValue(is.title);
        this.description.setValue(is.description);
      });
    });
    this.issueForm = this.fb.group({
      title: [
        { value: "", disabled: true },
        [Validators.required, Validators.pattern("^[^\\s].*")]
      ],
      description: ["", [Validators.pattern("^[^\\s].*")]],
      status: ["", [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.issueForm.value);
    const updateData: any = {
      description: this.description.value,
      status: Status[this.status.value]
    };

    console.log(updateData);
    console.log(this.issue.uid);
    console.log(Status[this.status.value]);
    this.issueService.updateIssueByUid(this.issue.uid, updateData).then(() => {
      this.snackBar.open("Issue updated", "⭐", {
        duration: 3000
      });
      this.router.navigate([`/issues/${this.projectId}/view/${this.issueId}`]);
    });
  }

  get title() {
    return this.issueForm.get("title");
  }

  get description() {
    return this.issueForm.get("description");
  }

  get status() {
    return this.issueForm.get("status");
  }
}
