import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SurveyCreateComponent } from './pages/admin/survey-create/survey-create.component';
import { SurveyPreviewComponent } from './pages/admin/survey-preview/survey-preview.component';
import { SurveyResponsesComponent } from './pages/admin/survey-responses/survey-responses.component';
import { AvailableSurveysComponent } from './pages/user/available-surveys/available-surveys.component';
import { RespondSurveyComponent } from './pages/user/respond-survey/respond-survey.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)},
  {path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)},
  
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
