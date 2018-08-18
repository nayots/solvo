import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssueComponent } from './view-issue.component';

describe('ViewIssueComponent', () => {
  let component: ViewIssueComponent;
  let fixture: ComponentFixture<ViewIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
