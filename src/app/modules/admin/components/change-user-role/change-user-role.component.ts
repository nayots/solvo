import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../../../core/models/user";
import { AdminService } from "../../../../core/services/admin.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-change-user-role",
  templateUrl: "./change-user-role.component.html",
  styleUrls: ["./change-user-role.component.scss"]
})
export class ChangeUserRoleComponent implements OnInit {
  @Input()
  user: User;
  public isProcessing = false;
  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  public changeAdminStatus(isAdmin: boolean) {
    this.isProcessing = true;
    this.adminService
      .changeAdminStatus(isAdmin, this.user.uid)
      .subscribe(() => {
        this.isProcessing = false;
        this.snackBar.open("Role updated!", "⚠️", {
          duration: 3000
        });
      });
  }
}
