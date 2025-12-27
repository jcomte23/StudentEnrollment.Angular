import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EnrollmentRequest, EnrollmentResponse } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  enroll(courseId: number): Observable<EnrollmentResponse> {
    // Se pasa courseId en la query string, body vacío
    return this.http.post<EnrollmentResponse>(
      `${this.apiUrl}/enrollment/enroll?courseId=${courseId}`,
      {}
    );
  }

  unenroll(courseId: number): Observable<EnrollmentResponse> {
    return this.http.post<EnrollmentResponse>(
      `${this.apiUrl}/enrollment/unenroll?courseId=${courseId}`,
      {}
    );
  }
}
