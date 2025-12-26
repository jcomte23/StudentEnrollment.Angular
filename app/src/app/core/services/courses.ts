import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Course, CourseWithStudents } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAvailableCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/available`);
  }

  getMyCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/my-courses`);
  }

  getCourseStudents(courseId: number): Observable<CourseWithStudents> {
    return this.http.get<CourseWithStudents>(`${this.apiUrl}/courses/${courseId}/students`);
  }
}
