import { Routes } from '@angular/router';
import { REVIEW } from './constant/routes';

export const ROUTES: Routes = [
  { path: '', redirectTo: REVIEW.path, pathMatch: 'full' },
  {
    path: REVIEW.path,
    loadComponent: () =>
      import('./feature-module/reviews/reviews.component').then(
        (c) => c.ReviewsComponent
      ),
  },
  {
    path: '**',
    redirectTo: REVIEW.path,
  },
];
