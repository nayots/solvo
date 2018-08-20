import { Component, OnInit } from "@angular/core";
import { User } from "../../../../core/models/user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth.service";
import { MatChipInputEvent } from "@angular/material";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: "app-add-project",
  templateUrl: "./add-project.component.html",
  styleUrls: ["./add-project.component.scss"]
})
export class AddProjectComponent implements OnInit {
  private projectForm: FormGroup;
  public tags: string[];
  public selectable = true;
  public removable = true;
  public visible = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public user: User;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.tags = [];
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ["", [Validators.required]],
      description: ["", Validators.required]
    });
    this.auth.user$.subscribe(user => (this.user = user));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      const tagToAdd = value.trim().replace(/#/g, "");
      if (tagToAdd) {
        this.tags.push(tagToAdd);
      }
    }

    // Reset the input value
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
  }

  get name() {
    return this.projectForm.get("name");
  }

  get description() {
    return this.projectForm.get("description");
  }
}
