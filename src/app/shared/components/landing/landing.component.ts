import { AuthService } from "./../../../core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  public user: User;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => (this.user = user));
  }
}
