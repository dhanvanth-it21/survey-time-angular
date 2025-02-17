import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SurveyCreateComponent } from './survey-create/survey-create.component';
import { SurveyPreviewComponent } from './survey-preview/survey-preview.component';
import { SurveyResponsesComponent } from './survey-responses/survey-responses.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'survey-create', component: SurveyCreateComponent},
  {path: 'survey-preview', component: SurveyPreviewComponent},
  {path: 'survey-responses', component: SurveyResponsesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
