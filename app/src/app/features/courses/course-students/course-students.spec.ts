import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStudents } from './course-students';

describe('CourseStudents', () => {
  let component: CourseStudents;
  let fixture: ComponentFixture<CourseStudents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseStudents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseStudents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
