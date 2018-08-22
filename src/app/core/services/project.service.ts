import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Project } from "../models/project";
import { from, of, Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  public saveProject(projectData: Project) {
    return from(
      this.afs
        .collection("projects")
        .add(projectData)
        .then(r => {
          const projectRef: AngularFirestoreDocument<any> = this.afs.doc(
            `projects/${r.id}`
          );
          const data: any = {
            uid: r.id
          };
          return projectRef.set(data, { merge: true });
        })
    );
  }

  public getOwnedProjectsForUser(userUid: string) {
    return this.afs
      .collection<Project>("projects", ref =>
        ref.where("ownerId", "==", userUid)
      )
      .valueChanges();
  }

  public getSharedProjectsForUser(userEmail: string) {
    return this.afs
      .collection<Project>("projects", ref =>
        ref.where("members", "array-contains", userEmail)
      )
      .valueChanges();
  }

  public getProjectByUid(projectUid: string) {
    return this.afs.doc<Project>(`projects/${projectUid}`).valueChanges();
  }

  public updateProject(projectUid: string, data: any) {
    const projectRef = this.afs.doc<Project>(`projects/${projectUid}`).ref;

    return projectRef.set(data, { merge: true });
  }

  public deleteProjectByUid(projectUid: string) {
    return this.afs.doc<Project>(`projects/${projectUid}`).delete();
  }
}
