import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
// import {
//   DEFAULT_TIMEOUT,
//   InterceptorInterceptor,
// } from './services/interceptor/interceptor.interceptor';

import { ROUTES } from './app.route';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: InterceptorInterceptor,
    //   multi: true,
    // },
    // { provide: DEFAULT_TIMEOUT, useValue: 30000 },
    provideRouter(ROUTES),
    importProvidersFrom([BrowserAnimationsModule, HttpClientModule]),
  ],
};
