import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentsComponent } from './components/students/students.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';

const routes: Routes = [
  {path: '', redirectTo:'students', pathMatch:'full'},
  {path: 'dashboard', component : DashboardComponent,canActivate:[AuthGuard]},
  {path: 'detail/:id', component : StudentDetailComponent},
  {path: 'login', component : LoginComponent},
  {path: 'students', component : StudentsComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard],
})
export class AppRoutingModule { }
