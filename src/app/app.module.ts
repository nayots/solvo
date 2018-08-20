import { AuthGuard } from "./core/guards/auth.guard";
import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { LandingComponent } from "./shared/components/landing/landing.component";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorInterceptor } from "./core/interceptors/app.error.interceptor";
import { AnnonymousGuard } from "./core/guards/annonymous.guard";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ProjectModule,
    AuthModule,
    MaterialModule,
    IssuesModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AnnonymousGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
