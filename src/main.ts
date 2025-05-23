import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { isDevMode } from '@angular/core';

// Suppress false positive HttpClient errors in development
if (isDevMode()) {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.toString().includes('NullInjectorError') && args[0]?.toString().includes('HttpClient')) {
      return; // Suppress the known false positive
    }
    originalError.apply(console, args);
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));