import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AvailableSurveysComponent } from './available-surveys/available-surveys.component';
import { RespondSurveyComponent } from './respond-survey/respond-survey.component';


@NgModule({
  declarations: [
    AvailableSurveysComponent,
    RespondSurveyComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
