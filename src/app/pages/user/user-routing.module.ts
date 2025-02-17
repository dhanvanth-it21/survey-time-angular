import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableSurveysComponent } from './available-surveys/available-surveys.component';
import { RespondSurveyComponent } from './respond-survey/respond-survey.component';

const routes: Routes = [
  {path: 'available-surveys', component: AvailableSurveysComponent},
  {path: 'respond-survey', component: RespondSurveyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
