import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses';
import { EnrollmentService } from '../../../core/services/enrollment';
import { Course } from '../../../core/models/course.model';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, Navbar],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private coursesService: CoursesService,
    private enrollmentService: EnrollmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.coursesService.getAvailableCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al cargar los cursos';
        this.isLoading = false;
      }
    });
  }

  enroll(courseId: number): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.enrollmentService.enroll({ courseId }).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.loadCourses();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al inscribirse en el curso';
      }
    });
  }

  viewStudents(courseId: number): void {
    this.router.navigate(['/courses', courseId, 'students']);
  }
}
