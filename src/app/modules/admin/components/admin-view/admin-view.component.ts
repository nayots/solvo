import { Component, OnInit } from "@angular/core";
import { AdminService } from "../../../../core/services/admin.service";
import { Observable } from "rxjs";
import { User } from "../../../../core/models/user";

@Component({
  selector: "app-admin-view",
  templateUrl: "./admin-view.component.html",
  styleUrls: ["./admin-view.component.scss"]
})
export class AdminViewComponent implements OnInit {
  public users$: Observable<User[]>;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.users$ = this.adminService.getAllUsers();
  }
}
