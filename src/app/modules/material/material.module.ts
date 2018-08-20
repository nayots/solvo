import { MatBadgeModule } from "@angular/material/badge";
import { MatChipsModule } from "@angular/material/chips";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatBadgeModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatBadgeModule,
    MatListModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule {}
