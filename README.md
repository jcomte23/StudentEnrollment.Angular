# Student Enrollment Web

Angular web application for managing student enrollments, course registration, and user profiles.

## Features

- 🔐 User authentication (register/login)
- 👤 User profile management
- 📚 Browse available courses
- ✅ Course enrollment and unenrollment
- 📋 View enrolled courses
- 👥 View course students (for instructors/admins)

## Prerequisites

- Node.js: v24.x (Current LTS)
- npm: v10.x or higher
- Angular CLI: npm install -g @angular/cli

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd StudentEnrollment.Angular
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint:
   - Open `src/environments/environment.ts`
   - Update `apiUrl` with your backend API URL

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5252/api/v1' // Update this
};
```

## Running the Application

Development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/`

## Building for Production

```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── core/              # Core services, guards, interceptors
│   │   ├── services/      # API services
│   │   ├── guards/        # Route guards
│   │   └── interceptors/  # HTTP interceptors
│   ├── features/          # Feature modules
│   │   ├── auth/          # Authentication pages
│   │   ├── courses/       # Course management
│   │   └── profile/       # User profile
│   ├── shared/            # Shared components, pipes, directives
│   └── app.component.*    # Root component
├── environments/          # Environment configurations
└── assets/               # Static assets
```

## API Integration

This application consumes the following endpoints:

### Account
- `POST /api/v1/account/register` - User registration
- `POST /api/v1/account/login` - User login
- `GET /api/v1/account/my-profile` - Get current user profile
- `PUT /api/v1/account/my-profile` - Update user profile
- `DELETE /api/v1/account/my-account` - Delete user account

### Courses
- `GET /api/v1/courses/available` - List available courses
- `GET /api/v1/courses/my-courses` - List user's enrolled courses
- `GET /api/v1/courses/{courseId}/students` - List students in a course

### Enrollment
- `POST /api/v1/enrollment/enroll` - Enroll in a course
- `POST /api/v1/enrollment/unenroll` - Unenroll from a course

## Technologies Used

- **Angular** 17+ - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **Angular Material** (optional) - UI components
- **HttpClient** - HTTP communication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Backend Repository

This frontend works with the StudentEnrollment backend API.  
Backend repository: [Link to backend repository]

## Contact

For questions or support, please open an issue in the repository.
