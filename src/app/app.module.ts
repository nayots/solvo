import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { environment } from "../environments/environment";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProjectModule } from "./modules/project/project.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MaterialModule } from "./modules/material/material.module";
import { NavigationComponent } from "./shared/components/navigation/navigation.component";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { IssuesModule } from "./modules/issues/issues.module";
import { LandingComponent } from './shared/components/landing/landing.component';

@NgModule({
  declarations: [AppComponent, NavigationComponent, NotFoundComponent, LandingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ProjectModule,
    AuthModule,
    MaterialModule,
    IssuesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
