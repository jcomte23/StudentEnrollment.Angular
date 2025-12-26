import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses';
import { EnrollmentService } from '../../../core/services/enrollment';
import { Course } from '../../../core/models/course.model';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-my-courses',
  imports: [CommonModule, Navbar],
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.css',
})
export class MyCourses implements OnInit {
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
    this.loadMyCourses();
  }

  loadMyCourses(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.coursesService.getMyCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al cargar tus cursos';
        this.isLoading = false;
      }
    });
  }

  unenroll(courseId: number): void {
    if (!confirm('¿Estás seguro de que deseas desinscribirte de este curso?')) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.enrollmentService.unenroll({ courseId }).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.loadMyCourses();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al desinscribirse del curso';
      }
    });
  }

  viewStudents(courseId: number): void {
    this.router.navigate(['/courses', courseId, 'students']);
  }
}
