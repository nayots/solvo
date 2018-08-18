import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { AppRoutingModule } from "../app-routing.module";
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { ViewIssueComponent } from './components/view-issue/view-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { DeleteIssueComponent } from './components/delete-issue/delete-issue.component';

@NgModule({
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  declarations: [AddIssueComponent, ViewIssueComponent, EditIssueComponent, DeleteIssueComponent]
})
export class IssuesModule {}
