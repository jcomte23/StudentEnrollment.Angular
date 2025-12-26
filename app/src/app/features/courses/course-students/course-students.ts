import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses';
import { CourseWithStudents } from '../../../core/models/course.model';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-course-students',
  imports: [CommonModule, Navbar],
  templateUrl: './course-students.html',
  styleUrl: './course-students.css',
})
export class CourseStudents implements OnInit {
  courseData: CourseWithStudents | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadStudents(Number(courseId));
    }
  }

  loadStudents(courseId: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.coursesService.getCourseStudents(courseId).subscribe({
      next: (data) => {
        this.courseData = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al cargar los estudiantes';
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/courses']);
  }
}
