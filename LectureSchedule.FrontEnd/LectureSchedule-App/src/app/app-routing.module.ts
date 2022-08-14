import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LectureDetailsComponent } from './components/lectures/lecture-details/lecture-details.component';
import { LectureListComponent } from './components/lectures/lecture-list/lecture-list.component';
import { LecturesComponent } from './components/lectures/lectures.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SpeakerComponent } from './components/speaker/speaker.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      { path: 'user', redirectTo:'user/login' },
      { path: 'user/profile', component: ProfileComponent },
      { path: 'lectures', redirectTo:'lectures/list' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'speakers', component: SpeakerComponent },
      { path: 'contacts', component: ContactsComponent },
      {
        path: 'lectures', component: LecturesComponent,
        children: [
          { path: 'details/:id', component: LectureDetailsComponent },
          { path: 'details', component: LectureDetailsComponent },
          { path: 'list', component: LectureListComponent }
        ]
      },
    ]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
  { path: 'home', component: HomeComponent },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
