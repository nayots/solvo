import { switchMap, map, take } from "rxjs/operators";
import { ProjectService } from "./project.service";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Issue } from "../models/issue";
import { from, Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { Project } from "../models/project";

@Injectable({
  providedIn: "root"
})
export class IssueService {
  constructor(
    private afs: AngularFirestore,
    private projService: ProjectService,
    private auth: AuthService
  ) {}

  public saveIssue(issue: Issue) {
    return from(
      this.afs
        .collection("issues")
        .add(issue)
        .then(r => {
          const issueRef: AngularFirestoreDocument<Issue> = this.afs.doc(
            `issues/${r.id}`
          );
          const issueData: any = {
            uid: r.id
          };
          issueRef.set(issueData, { merge: true }).then(() => {
            const projectRef: AngularFirestoreDocument<Project> = this.afs.doc<
              Project
            >(`projects/${issue.projectUid}`);
            projectRef
              .valueChanges()
              .pipe(take(1))
              .subscribe(p => {
                return projectRef.update({ issues: [...p.issues, r.id] });
              });
          });
        })
    );
  }

  public currentUserHasIssueRights(projectUid: string): Observable<boolean> {
    return this.projService.getProjectByUid(projectUid).pipe(
      switchMap(pr =>
        this.auth.user$.pipe(
          switchMap(usr => {
            return of(pr.ownerId === usr.uid || pr.members.includes(usr.email));
          })
        )
      )
    );
  }
}
