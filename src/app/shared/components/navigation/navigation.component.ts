import { Component, OnInit } from "@angular/core";
import { User } from "../../../core/models/user";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
  public user: User;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    });
  }

  public logout() {
    console.log("logout clicked");
    this.auth.signOut();
  }
}
