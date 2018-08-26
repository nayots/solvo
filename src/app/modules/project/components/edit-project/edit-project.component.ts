import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../../core/services/auth.service";
import { User } from "../../../../core/models/user";
import { ProjectService } from "../../../../core/services/project.service";
import { Observable } from "rxjs";
import { Project } from "../../../../core/models/project";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { MatChipInputEvent, MatSnackBar } from "@angular/material";

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html",
  styleUrls: ["./edit-project.component.scss"]
})
export class EditProjectComponent implements OnInit {
  public projectId: string;
  public user: User;
  public project: Project;
  public projectForm: FormGroup;
  public tags: string[];
  public memberEmails: string[];
  public selectable = true;
  public removable = true;
  public visible = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.tags = [];
    this.memberEmails = [];
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern("^[^\\s].*")]],
      description: ["", Validators.required]
    });
    this.auth.user$.subscribe(user => (this.user = user));
    this.activatedRoute.params.subscribe(params => {
      this.projectId = params["id"];
      this.projectService.getProjectByUid(params["id"]).subscribe(pr => {
        if (this.user && pr.ownerId !== this.user.uid) {
          this.snackBar.open("You are not the owner of this project :(", "⚠️", {
            duration: 3000
          });
          this.router.navigate(["/projects/my"]);
          return;
        }
        this.project = pr;
        this.name.setValue(pr.name);
        this.description.setValue(pr.description);
        this.tags = pr.tags;
        this.memberEmails = pr.members;
      });
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      const tagToAdd = value.trim().replace(/#/g, "");
      if (tagToAdd) {
        if (!this.tags.includes(tagToAdd)) {
          this.tags.push(tagToAdd);
        }
      }
    }

    if (input) {
      input.value = "";
    }
  }

  removeTag(tagName: string): void {
    console.log("here");
    const index = this.tags.indexOf(tagName);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addMember(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      const memberToAdd = value.trim().replace(/#/g, "");
      if (memberToAdd) {
        if (!this.memberEmails.includes(memberToAdd)) {
          this.memberEmails.push(memberToAdd);
        }
      }
    }

    if (input) {
      input.value = "";
    }
  }

  removeMember(memberEmail: string): void {
    const index = this.memberEmails.indexOf(memberEmail);

    if (index >= 0) {
      this.memberEmails.splice(index, 1);
    }
  }

  onSubmit() {
    console.log(this.projectForm.value);
    console.log(this.tags.join(", "));
    console.log(this.memberEmails.join(", "));

    const projectUpdateData: any = {
      name: this.name.value,
      description: this.description.value,
      tags: this.tags,
      members: this.memberEmails
    };

    this.projectService
      .updateProject(this.project.uid, projectUpdateData)
      .then(r => {
        this.snackBar.open("Project updated", "⭐", {
          duration: 3000
        });
        this.router.navigate(["/projects/my"]);
      })
      .catch(err => {
        this.snackBar.open("Error updating the project :(", "⚠️", {
          duration: 3000
        });
        this.router.navigate(["/projects/my"]);
      });
  }

  get name() {
    return this.projectForm.get("name");
  }

  get description() {
    return this.projectForm.get("description");
  }
}
