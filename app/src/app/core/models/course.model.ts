export interface Course {
  courseId: number;
  courseName: string;
  credits: number;
  professorName: string;
  maxStudents: number;
  enrolledStudents: number;
}

export interface CourseWithStudents {
  courseId: number;
  courseName: string;
  studentNames: string[];
}

export interface EnrollmentRequest {
  courseId: number;
}

export interface EnrollmentResponse {
  message: string;
}
