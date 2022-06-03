//angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//angular bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
//components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpeakerComponent } from './components/speaker/speaker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { TitleComponent } from './shared/title/title.component';
//font awesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
//services
import { LectureService } from './services/lecture.service';

@NgModule({
  declarations: [
    AppComponent,
    LecturesComponent,
    SpeakerComponent,
    ContactsComponent,
    DashboardComponent,
    ProfileComponent,
    NavComponent,
    DateTimeFormatPipe,
    TitleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule
  ],
  providers: [LectureService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary){
    library.addIconPacks(fas);
  }
}
