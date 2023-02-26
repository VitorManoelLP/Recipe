import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { LoginModule } from './authentication/login/login.module';
import { HandlerModule } from './shared/handler/handler.module';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalExceptionHandler } from './shared/handler/exception-handler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    LoginModule,
    BrowserModule,
    BrowserAnimationsModule,
    HandlerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalExceptionHandler, multi: true },
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
