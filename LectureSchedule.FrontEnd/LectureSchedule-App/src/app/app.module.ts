import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LecturesComponent } from './lectures/lectures.component';
import { SpeakerComponent } from './speaker/speaker.component';

@NgModule({
  declarations: [
    AppComponent,
    LecturesComponent,
    SpeakerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
