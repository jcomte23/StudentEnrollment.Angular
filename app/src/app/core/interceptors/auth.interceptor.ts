import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Rutas públicas que NO necesitan token
  const publicUrls = [
    '/account/register',
    '/account/login'
  ];

  // Verificar si la URL es pública
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));

  // Si es pública, continuar sin token
  if (isPublicUrl) {
    return next(req);
  }

  // Si es privada, agregar token si existe
  const token = localStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
