import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // Rutas públicas
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },

  // Rutas protegidas (requieren autenticación)
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile/profile').then(m => m.Profile),
    canActivate: [authGuard]
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/course-list/course-list').then(m => m.CourseList),
    canActivate: [authGuard]
  },
  {
    path: 'my-courses',
    loadComponent: () => import('./features/courses/my-courses/my-courses').then(m => m.MyCourses),
    canActivate: [authGuard]
  },
  {
    path: 'courses/:id/students',
    loadComponent: () => import('./features/courses/course-students/course-students').then(m => m.CourseStudents),
    canActivate: [authGuard]
  },

  // Redirecciones
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
