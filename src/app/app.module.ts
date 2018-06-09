import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { LoadingBarRouterModule} from '@ngx-loading-bar/router'

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    NgbModule,
    MaterialModule,
    LoadingBarRouterModule,

  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
