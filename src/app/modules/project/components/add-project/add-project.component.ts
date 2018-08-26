import { Component, OnInit } from "@angular/core";
import { User } from "../../../../core/models/user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth.service";
import { MatChipInputEvent, MatSnackBar } from "@angular/material";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { ProjectService } from "../../../../core/services/project.service";
import { Project } from "../../../../core/models/project";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.scss"]
})
export class AddProjectComponent implements OnInit {
  public projectForm: FormGroup;
  public tags: string[];
  public selectable = true;
  public removable = true;
  public visible = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public user: User;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.tags = [];
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern("^[^\\s].*")]],
      description: ["", Validators.required]
    });
    this.auth.user$.subscribe(user => (this.user = user));
  }

  add(event: MatChipInputEvent): void {
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

  remove(tagName: string): void {
    console.log("here");
    const index = this.tags.indexOf(tagName);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSubmit() {
    console.log(this.projectForm.value);

    const projectData: Project = {
      name: this.name.value,
      description: this.description.value,
      tags: this.tags,
      ownerId: this.user.uid,
      members: [],
      issues: []
    };
    this.projectService.saveProject(projectData).subscribe(r => {
      console.log(r);
      this.snackBar.open("Project created", "⭐", {
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
