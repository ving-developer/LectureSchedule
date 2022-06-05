import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LectureDetailsComponent } from './components/lectures/lecture-details/lecture-details.component';
import { LectureListComponent } from './components/lectures/lecture-list/lecture-list.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpeakerComponent } from './components/speaker/speaker.component';

const routes: Routes = [
  {path: 'lectures', redirectTo:'lectures/list'},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'lectures', component: LecturesComponent,
    children: [
      {path: 'details/:id', component: LectureDetailsComponent},
      {path: 'details', component: LectureDetailsComponent},
      {path: 'list', component: LectureListComponent}
    ]
  },
  {path: 'contacts', component: ContactsComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'speakers', component: SpeakerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
