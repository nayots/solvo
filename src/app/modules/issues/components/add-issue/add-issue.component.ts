import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../../core/models/user";
import { AuthService } from "../../../../core/services/auth.service";
import { Observable } from "rxjs";
import { IssueService } from "../../../../core/services/issue.service";
import { MatSnackBar } from "@angular/material";
import { Issue } from "../../../../core/models/issue";
import { Status } from "../../../../core/models/status.enum";
import { Project } from "../../../../core/models/project";
import { ProjectService } from "../../../../core/services/project.service";

@Component({
  selector: "app-add-issue",
  templateUrl: "./add-issue.component.html",
  styleUrls: ["./add-issue.component.scss"]
})
export class AddIssueComponent implements OnInit {
  public projectId: string;
  public issueForm: FormGroup;
  public project: Project;
  private user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private issueService: IssueService,
    private projService: ProjectService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params["projectId"];
      this.projService
        .getProjectByUid(params["projectId"])
        .subscribe(pr => (this.project = pr));
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
    });
    this.auth.user$.subscribe(user => (this.user = user));
    this.issueForm = this.fb.group({
      title: ["", [Validators.required, Validators.pattern("^[^\\s].*")]],
      description: ["", [Validators.required, Validators.pattern("^[^\\s].*")]]
    });
  }

  public onSubmit() {
    console.log(this.issueForm.value);
    const issue: Issue = {
      title: this.title.value,
      description: this.description.value,
      status: Status.New,
      dateIso: new Date(Date.now()).toISOString(),
      projectUid: this.projectId,
      creatorUid: this.user.uid
    };
    this.issueService.saveIssue(issue).subscribe(r => {
      this.snackBar.open("Issue submited", "⚠️", {
        duration: 3000
      });
      this.router.navigate([`/projects/view/${this.projectId}`]);
    });
  }

  get title() {
    return this.issueForm.get("title");
  }

  get description() {
    return this.issueForm.get("description");
  }
}
