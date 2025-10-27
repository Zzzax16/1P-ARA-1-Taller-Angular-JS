import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

bootstrapApplication(AppComponent, {
  providers: [
    CookieService,
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule, CommonModule)
  ]
}).catch(err => console.error(err));